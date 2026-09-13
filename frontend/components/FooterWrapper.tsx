"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Exclude homepage
    if (pathname === "/") {
      setContainer(null);
      return;
    }

    const updateContainer = () => {
      const el = document.getElementById("scroll-container");
      if (el) {
        // Create a dedicated target at the very end of the scroll container
        // to prevent React from reordering it during hydration
        let target = document.getElementById("footer-portal-target");
        if (!target) {
          target = document.createElement("div");
          target.id = "footer-portal-target";
          el.appendChild(target);
        } else if (target.parentElement !== el) {
          el.appendChild(target);
        } else if (el.lastElementChild !== target) {
          // Ensure it stays at the very bottom if React re-renders
          el.appendChild(target);
        }
        setContainer((prev) => (prev !== target ? target : prev));
      } else {
        // Fallback to null to render normally in place
        setContainer(null);
      }
    };

    updateContainer();

    // Use MutationObserver to catch client-side navigations that might replace the container
    const observer = new MutationObserver(() => {
      updateContainer();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [pathname]);

  if (pathname === "/") return null;

  // If we found a scroll-container, portal into it
  if (container) {
    return createPortal(<Footer />, container);
  }

  // Otherwise, render normally at the end of the body (where this wrapper is placed in layout.tsx)
  return <Footer />;
}
