"use client";

import { useEffect } from "react";

function closeMobileMenus(root: ParentNode) {
  root.querySelectorAll<HTMLElement>(".brxe-nav-menu.show-mobile-menu").forEach((menu) => {
    menu.classList.remove("show-mobile-menu");
  });

  root.querySelectorAll<HTMLElement>(".bricks-mobile-menu-toggle").forEach((toggle) => {
    toggle.setAttribute("aria-expanded", "false");
  });

  document.body.classList.remove("no-scroll");
}

export function MirrorSiteBehavior() {
  useEffect(() => {
    const root = document.querySelector(".mirror-site-root");

    if (!root) {
      return;
    }

    const handleClick = (event: Event) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const toggle = target.closest<HTMLElement>(".bricks-mobile-menu-toggle");
      if (toggle) {
        const menu = toggle.closest<HTMLElement>(".brxe-nav-menu");
        if (!menu) {
          return;
        }

        const isOpen = menu.classList.toggle("show-mobile-menu");
        toggle.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("no-scroll", isOpen);
        return;
      }

      const overlay = target.closest(".bricks-mobile-menu-overlay");
      if (overlay) {
        closeMobileMenus(root);
        return;
      }

      const navLink = target.closest(".bricks-mobile-menu a, .bricks-nav-menu a");
      if (navLink) {
        closeMobileMenus(root);
      }
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenus(root);
      }
    };

    root.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      root.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return null;
}
