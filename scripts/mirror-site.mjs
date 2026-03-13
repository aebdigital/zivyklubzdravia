import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const SITE_ORIGIN = "https://www.zivyklubzdravia.sk";
const FALLBACK_PAGE_PATHS = [
  "/",
  "/kurzy-varenia/",
  "/shiatsu/",
  "/pravidelne-ocisty/",
  "/diagnostika-zdravia/",
  "/kontakt/",
];

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const SNAPSHOT_DIR = path.join(ROOT_DIR, "_source_mirror");
const GENERATED_DATA_FILE = path.join(ROOT_DIR, "src", "generated", "site-data.json");
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36";

const assetMap = new Map();
let activePagePaths = FALLBACK_PAGE_PATHS;

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"');
}

function normalizeUrl(rawUrl, baseUrl = SITE_ORIGIN) {
  if (!rawUrl) {
    return null;
  }

  const decodedUrl = decodeHtmlEntities(rawUrl.trim())
    .replace(/^['"]|['"]$/g, "")
    .trim();

  if (
    !decodedUrl ||
    decodedUrl.startsWith("#") ||
    decodedUrl.startsWith("mailto:") ||
    decodedUrl.startsWith("tel:") ||
    decodedUrl.startsWith("javascript:") ||
    decodedUrl.startsWith("data:")
  ) {
    return null;
  }

  const absoluteUrl = decodedUrl.startsWith("//")
    ? `https:${decodedUrl}`
    : decodedUrl;

  try {
    return new URL(absoluteUrl, baseUrl).toString();
  } catch {
    return null;
  }
}

function isTextResponse(contentType, url) {
  return (
    contentType.includes("text/") ||
    contentType.includes("json") ||
    contentType.includes("javascript") ||
    contentType.includes("xml") ||
    /\.(css|js|svg|json|txt|xml)$/i.test(new URL(url).pathname)
  );
}

function getLocalAssetPath(absoluteUrl) {
  const url = new URL(absoluteUrl);

  if (url.hostname === "fonts.googleapis.com") {
    const hash = crypto.createHash("sha1").update(absoluteUrl).digest("hex");
    return `/mirror/external/fonts-google/${hash}.css`;
  }

  const basePrefix =
    url.hostname === "www.zivyklubzdravia.sk"
      ? "/mirror/site"
      : `/mirror/external/${url.hostname}`;

  let pathname = url.pathname;

  if (!path.posix.extname(pathname)) {
    pathname = `${pathname.replace(/\/$/, "") || "/file"}.bin`;
  }

  return path.posix.join(basePrefix, pathname);
}

async function writeTextFile(filePath, contents) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, contents, "utf8");
}

async function writeBinaryFile(filePath, buffer) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, buffer);
}

async function replaceAsync(value, pattern, replacer) {
  const matches = [...value.matchAll(pattern)];
  if (!matches.length) {
    return value;
  }

  const replacements = await Promise.all(matches.map((match) => replacer(...match)));
  let result = value;

  for (let index = matches.length - 1; index >= 0; index -= 1) {
    const match = matches[index];
    const replacement = replacements[index];
    result =
      result.slice(0, match.index) +
      replacement +
      result.slice(match.index + match[0].length);
  }

  return result;
}

async function rewriteCssUrls(css, baseUrl) {
  const importPattern = /@import\s+(?:url\()?(["']?)([^"')]+)\1\)?/g;
  const urlPattern = /url\((["']?)([^"')]+)\1\)/g;

  let nextCss = await replaceAsync(css, importPattern, async (match, quote, rawUrl) => {
    const absoluteUrl = normalizeUrl(rawUrl, baseUrl);
    if (!absoluteUrl) {
      return match;
    }

    const localPath = await downloadAsset(absoluteUrl);
    return `@import url("${localPath}")`;
  });

  nextCss = await replaceAsync(nextCss, urlPattern, async (match, quote, rawUrl) => {
    const absoluteUrl = normalizeUrl(rawUrl, baseUrl);
    if (!absoluteUrl) {
      return match;
    }

    const localPath = await downloadAsset(absoluteUrl);
    return `url("${localPath}")`;
  });

  return nextCss;
}

async function downloadAsset(absoluteUrl) {
  if (assetMap.has(absoluteUrl)) {
    return assetMap.get(absoluteUrl);
  }

  const localPath = getLocalAssetPath(absoluteUrl);
  assetMap.set(absoluteUrl, localPath);

  const response = await fetch(absoluteUrl, {
    headers: {
      "user-agent": USER_AGENT,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to download ${absoluteUrl}: ${response.status}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  const filePath = path.join(PUBLIC_DIR, localPath.replace(/^\//, ""));

  if (contentType.includes("text/css") || /\.css$/i.test(new URL(absoluteUrl).pathname)) {
    const css = await response.text();
    const rewrittenCss = await rewriteCssUrls(css, absoluteUrl);
    await writeTextFile(filePath, rewrittenCss);
    return localPath;
  }

  if (isTextResponse(contentType, absoluteUrl)) {
    const text = await response.text();
    await writeTextFile(filePath, text);
    return localPath;
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await writeBinaryFile(filePath, buffer);
  return localPath;
}

function extractAllMatches(value, regex, groupIndex = 1) {
  const globalRegex = regex.global
    ? regex
    : new RegExp(regex.source, `${regex.flags}g`);

  return [...value.matchAll(globalRegex)].map((match) => match[groupIndex]).filter(Boolean);
}

function getSlugFromPathname(pathname) {
  return pathname === "/" ? "" : pathname.replace(/^\/|\/$/g, "");
}

function getCanonicalPath(absoluteUrl) {
  const url = new URL(absoluteUrl);
  return url.pathname === "/" ? "/" : `${url.pathname.replace(/\/$/, "")}/`;
}

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>\s*(?:<!\[CDATA\[(.*?)\]\]>|([^<]*))\s*<\/loc>/g)]
    .map((match) => match[1] ?? match[2] ?? "")
    .map((value) => value.trim())
    .filter(Boolean);
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": USER_AGENT,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.text();
}

async function getPagePaths() {
  try {
    const sitemapXml = await fetchText(`${SITE_ORIGIN}/sitemap.xml`);
    const sitemapUrls = extractLocs(sitemapXml).filter((url) =>
      url.includes("page-sitemap")
    );

    const pagePaths = new Set();

    for (const sitemapUrl of sitemapUrls) {
      const pageSitemapXml = await fetchText(sitemapUrl);
      const pageUrls = extractLocs(pageSitemapXml);

      for (const pageUrl of pageUrls) {
        const url = new URL(pageUrl);

        if (url.origin !== SITE_ORIGIN) {
          continue;
        }

        const pathname = url.pathname === "/" ? "/" : `${url.pathname.replace(/\/$/, "")}/`;
        pagePaths.add(pathname);
      }
    }

    if (pagePaths.size) {
      return [...pagePaths].sort((left, right) => {
        if (left === "/") {
          return -1;
        }

        if (right === "/") {
          return 1;
        }

        return left.localeCompare(right);
      });
    }
  } catch (error) {
    console.warn("Falling back to the default page list:", error);
  }

  return FALLBACK_PAGE_PATHS;
}

function localizePageLinks(html) {
  const replacements = new Map();

  for (const pagePath of activePagePaths) {
    const absoluteUrl = new URL(pagePath, SITE_ORIGIN).toString();
    replacements.set(absoluteUrl, pagePath);

    if (pagePath === "/") {
      replacements.set(SITE_ORIGIN, "/");
      continue;
    }

    replacements.set(`${SITE_ORIGIN}${pagePath.replace(/\/$/, "")}`, pagePath);
  }

  let nextHtml = html;

  for (const [absoluteUrl, localPath] of [...replacements.entries()].sort(
    (left, right) => right[0].length - left[0].length
  )) {
    nextHtml = nextHtml.split(absoluteUrl).join(localPath);
  }

  return nextHtml;
}

function localizeKnownAssets(value) {
  let nextValue = value;

  const replaceBoundaryScoped = (input, target, replacement) => {
    const pattern = new RegExp(
      `(^|[("'=\\s,])${escapeRegExp(target)}(?=([)"'\\s,]|$))`,
      "g"
    );

    return input.replace(pattern, (match, prefix) => `${prefix}${replacement}`);
  };

  for (const [absoluteUrl, localPath] of [...assetMap.entries()].sort(
    (left, right) => right[0].length - left[0].length
  )) {
    const parsedUrl = new URL(absoluteUrl);
    const siteRelativeUrl = `${parsedUrl.pathname}${parsedUrl.search}`;
    const decodedAbsoluteUrl = (() => {
      try {
        return decodeURI(absoluteUrl);
      } catch {
        return absoluteUrl;
      }
    })();
    const decodedSiteRelativeUrl = (() => {
      try {
        return decodeURI(siteRelativeUrl);
      } catch {
        return siteRelativeUrl;
      }
    })();
    const decodedPathname = (() => {
      try {
        return decodeURI(parsedUrl.pathname);
      } catch {
        return parsedUrl.pathname;
      }
    })();
    const exactReplacements = [
      absoluteUrl,
      decodedAbsoluteUrl,
      absoluteUrl.replace(/&/g, "&amp;"),
      absoluteUrl.replace(/&/g, "&#038;"),
      absoluteUrl.replace(/\//g, "\\/"),
    ];

    for (const replacementTarget of exactReplacements) {
      nextValue = nextValue.split(replacementTarget).join(localPath);
    }

    if (parsedUrl.origin !== SITE_ORIGIN) {
      continue;
    }

    nextValue = replaceBoundaryScoped(nextValue, siteRelativeUrl, localPath);
    nextValue = replaceBoundaryScoped(nextValue, decodedSiteRelativeUrl, localPath);
    nextValue = replaceBoundaryScoped(
      nextValue,
      siteRelativeUrl.replace(/&/g, "&amp;"),
      localPath
    );
    nextValue = replaceBoundaryScoped(
      nextValue,
      siteRelativeUrl.replace(/&/g, "&#038;"),
      localPath
    );
    nextValue = replaceBoundaryScoped(nextValue, parsedUrl.pathname, localPath);
    nextValue = replaceBoundaryScoped(nextValue, decodedPathname, localPath);
  }

  return nextValue;
}

function hydrateLazyAssets(html) {
  let nextHtml = html.replace(/\bbricks-lazy-hidden\b/g, "");

  nextHtml = nextHtml.replace(
    /(<(?:img|source)[^>]*?)\s+src=(['"])(data:image[^'"]*?)\2([^>]*?\sdata-src=(['"])(.*?)\5)/g,
    "$1$4"
  );
  nextHtml = nextHtml.replace(/\sdata-src=(['"])(.*?)\1/g, ' src="$2"');
  nextHtml = nextHtml.replace(/\sdata-srcset=(['"])(.*?)\1/g, ' srcset="$2"');
  nextHtml = nextHtml.replace(/\s{2,}/g, " ");

  return nextHtml;
}

async function collectStylesheetAssets(html, pageUrl, sharedStylesheets) {
  const stylesheetHrefs = extractAllMatches(
    html,
    /<link[^>]+rel=['"]stylesheet['"][^>]+href=['"]([^'"]+)['"]/gi
  );

  for (const href of stylesheetHrefs) {
    const absoluteUrl = normalizeUrl(href, pageUrl);
    if (!absoluteUrl) {
      continue;
    }

    const localPath = await downloadAsset(absoluteUrl);
    sharedStylesheets.add(localPath);
  }
}

async function collectInlineStyleAssets(styles, pageUrl) {
  const rewrittenStyles = [];

  for (const style of styles) {
    rewrittenStyles.push(await rewriteCssUrls(style, pageUrl));
  }

  return rewrittenStyles;
}

async function collectHtmlAssetUrls(html, pageUrl) {
  const directUrls = [
    ...extractAllMatches(html, /\s(?:src|href|poster)=['"]([^'"]+)['"]/gi),
    ...extractAllMatches(html, /\sdata-src=['"]([^'"]+)['"]/gi),
  ];
  const srcsetUrls = [
    ...extractAllMatches(html, /\ssrcset=['"]([^'"]+)['"]/gi),
    ...extractAllMatches(html, /\sdata-srcset=['"]([^'"]+)['"]/gi),
  ];

  for (const entry of directUrls) {
    const absoluteUrl = normalizeUrl(entry, pageUrl);
    if (!absoluteUrl) {
      continue;
    }

    const parsedUrl = new URL(absoluteUrl);
    const hasFileExtension = Boolean(path.posix.extname(parsedUrl.pathname));
    const looksLikeStylesheetEndpoint =
      parsedUrl.hostname === "fonts.googleapis.com" && parsedUrl.pathname.startsWith("/css");
    const isExternalAssetCandidate =
      parsedUrl.origin !== SITE_ORIGIN && (hasFileExtension || looksLikeStylesheetEndpoint);

    if (
      hasFileExtension ||
      looksLikeStylesheetEndpoint ||
      isExternalAssetCandidate
    ) {
      await downloadAsset(absoluteUrl);
    }
  }

  for (const entry of srcsetUrls) {
    const pieces = entry.split(",").map((piece) => piece.trim().split(/\s+/)[0]);
    for (const piece of pieces) {
      const absoluteUrl = normalizeUrl(piece, pageUrl);
      if (!absoluteUrl) {
        continue;
      }

      const parsedUrl = new URL(absoluteUrl);
      const hasFileExtension = Boolean(path.posix.extname(parsedUrl.pathname));
      if (hasFileExtension || parsedUrl.origin !== SITE_ORIGIN) {
        await downloadAsset(absoluteUrl);
      }
    }
  }
}

async function mirrorPage(pagePath, sharedStylesheets) {
  const pageUrl = new URL(pagePath, SITE_ORIGIN).toString();
  const response = await fetch(pageUrl, {
    headers: {
      "user-agent": USER_AGENT,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch page ${pageUrl}: ${response.status}`);
  }

  const html = await response.text();
  const fileName = pagePath === "/" ? "home.html" : `${getSlugFromPathname(pagePath)}.html`;

  await writeTextFile(path.join(SNAPSHOT_DIR, fileName), html);

  await collectStylesheetAssets(html, pageUrl, sharedStylesheets);

  const styleBlocks = extractAllMatches(html, /<style\b[^>]*>([\s\S]*?)<\/style>/gi);
  const inlineStyles = await collectInlineStyleAssets(styleBlocks, pageUrl);

  await collectHtmlAssetUrls(html, pageUrl);

  const title = extractAllMatches(html, /<title>([\s\S]*?)<\/title>/i)[0] ?? "Živý Klub Zdravia";
  const description =
    extractAllMatches(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)[0] ?? "";
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const rawBodyHtml = bodyMatch?.[1] ?? "";

  let bodyHtml = rawBodyHtml.replace(/<script\b[\s\S]*?<\/script>/gi, "");
  bodyHtml = localizePageLinks(bodyHtml);
  bodyHtml = hydrateLazyAssets(bodyHtml);
  bodyHtml = localizeKnownAssets(bodyHtml);

  return {
    slug: getSlugFromPathname(pagePath),
    title: title.trim(),
    description: description.trim(),
    canonicalPath: getCanonicalPath(pageUrl),
    inlineStyles: inlineStyles.map((style) => localizeKnownAssets(style)),
    bodyHtml,
  };
}

async function main() {
  await fs.mkdir(SNAPSHOT_DIR, { recursive: true });
  await fs.mkdir(path.dirname(GENERATED_DATA_FILE), { recursive: true });

  const sharedStylesheets = new Set();
  const pages = {};
  const pagePaths = await getPagePaths();
  activePagePaths = pagePaths;

  for (const pagePath of pagePaths) {
    const page = await mirrorPage(pagePath, sharedStylesheets);
    pages[page.slug] = page;
    console.log(`Mirrored ${page.canonicalPath}`);
  }

  const payload = {
    sharedStylesheets: [...sharedStylesheets],
    pages,
  };

  await writeTextFile(GENERATED_DATA_FILE, JSON.stringify(payload, null, 2));

  console.log(`Saved mirror data to ${GENERATED_DATA_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
