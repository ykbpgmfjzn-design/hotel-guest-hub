import { useEffect, useCallback, useRef } from "react";

/**
 * Enables D-pad (arrow keys) + OK (Enter) navigation for Android TV remotes.
 * All focusable elements get `data-tv-focusable` attribute.
 * Focused element gets a visible gold ring and auto-scrolls into view.
 */
export function useTvNavigation() {
  const currentIndexRef = useRef(0);

  const getFocusables = useCallback((): HTMLElement[] => {
    return Array.from(document.querySelectorAll<HTMLElement>("[data-tv-focusable]"));
  }, []);

  const focusElement = useCallback((el: HTMLElement) => {
    // Remove previous focus ring
    document.querySelectorAll<HTMLElement>("[data-tv-focused]").forEach((prev) => {
      prev.removeAttribute("data-tv-focused");
      prev.style.outline = "";
      prev.style.outlineOffset = "";
      prev.style.boxShadow = "";
    });

    // Apply focus ring
    el.setAttribute("data-tv-focused", "true");
    el.style.outline = "2px solid hsl(36 45% 58%)";
    el.style.outlineOffset = "3px";
    el.style.boxShadow = "0 0 20px hsl(36 45% 58% / 0.2)";
    el.focus({ preventScroll: false });

    // Scroll into view smoothly
    el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  }, []);

  const navigate = useCallback(
    (direction: "up" | "down" | "left" | "right") => {
      const items = getFocusables();
      if (items.length === 0) return;

      const current = items[currentIndexRef.current];
      if (!current) {
        currentIndexRef.current = 0;
        focusElement(items[0]);
        return;
      }

      const currentRect = current.getBoundingClientRect();
      const cx = currentRect.left + currentRect.width / 2;
      const cy = currentRect.top + currentRect.height / 2;

      let bestIndex = -1;
      let bestDist = Infinity;

      items.forEach((el, i) => {
        if (i === currentIndexRef.current) return;
        const r = el.getBoundingClientRect();
        const ex = r.left + r.width / 2;
        const ey = r.top + r.height / 2;
        const dx = ex - cx;
        const dy = ey - cy;

        // Filter by direction
        let valid = false;
        if (direction === "right" && dx > 20) valid = true;
        if (direction === "left" && dx < -20) valid = true;
        if (direction === "down" && dy > 20) valid = true;
        if (direction === "up" && dy < -20) valid = true;

        if (valid) {
          // Distance with bias toward the primary axis
          const dist =
            direction === "left" || direction === "right"
              ? Math.abs(dx) + Math.abs(dy) * 3
              : Math.abs(dy) + Math.abs(dx) * 3;

          if (dist < bestDist) {
            bestDist = dist;
            bestIndex = i;
          }
        }
      });

      if (bestIndex >= 0) {
        currentIndexRef.current = bestIndex;
        focusElement(items[bestIndex]);
      }
    },
    [getFocusables, focusElement]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) {
        e.preventDefault();
        const dir = key.replace("Arrow", "").toLowerCase() as "up" | "down" | "left" | "right";
        navigate(dir);
      }

      if (key === "Enter" || key === " ") {
        e.preventDefault();
        const items = getFocusables();
        const current = items[currentIndexRef.current];
        if (current) current.click();
      }

      // Back button on Android TV remote (often sends Escape or Backspace)
      if (key === "Escape" || key === "Backspace") {
        // Let it bubble — ServiceDetail's back button will handle it
        const backBtn = document.querySelector<HTMLElement>("[data-tv-back]");
        if (backBtn) {
          e.preventDefault();
          backBtn.click();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Auto-focus first element after a short delay
    const timer = setTimeout(() => {
      const items = getFocusables();
      if (items.length > 0) {
        currentIndexRef.current = 0;
        focusElement(items[0]);
      }
    }, 800);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [navigate, getFocusables, focusElement]);
}
