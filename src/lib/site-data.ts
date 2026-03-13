import rawSiteData from "@/generated/site-data.json";

export type MirrorScript = {
  id: string;
  content: string;
};

export type MirrorPage = {
  slug: string;
  title: string;
  description: string;
  canonicalPath: string;
  inlineStyles: string[];
  bodyHtml: string;
};

type MirrorSiteData = {
  sharedStylesheets: string[];
  pages: Record<string, MirrorPage>;
};

export const siteData = rawSiteData as MirrorSiteData;

export function getPageFromSlug(segments?: string[]) {
  const slug = (segments ?? []).join("/");
  return siteData.pages[slug];
}

export function getAllSlugs() {
  return Object.keys(siteData.pages);
}
