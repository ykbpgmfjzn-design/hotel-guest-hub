import { useEffect, useRef, useCallback } from "react";

/**
 * Auto-scrolls the page smoothly down and back up
 * when no user interaction is detected for `idleTimeout` ms.
 */
export function useAutoScroll(idleTimeout = 30000, scrollSpeed = 1.2) {
  const rafRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const directionRef = useRef<1 | -1>(1); // 1 = down, -1 = up
  const activeRef = useRef(false);

  const stopScroll = useCallback(() => {
    activeRef.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const startScroll = useCallback(() => {
    activeRef.current = true;
    directionRef.current = 1;

    const step = () => {
      if (!activeRef.current) return;

      const { scrollY, innerHeight } = window;
      const maxScroll = document.documentElement.scrollHeight - innerHeight;

      // Flip direction at edges
      if (scrollY >= maxScroll - 2) directionRef.current = -1;
      if (scrollY <= 2) directionRef.current = 1;

      window.scrollBy({ top: scrollSpeed * directionRef.current });
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
  }, [scrollSpeed]);

  const resetTimer = useCallback(() => {
    stopScroll();
    // Smoothly return to top when user interacts
    if (window.scrollY > 0 && !activeRef.current) {
      // don't force scroll-to-top, let user stay where they are
    }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(startScroll, idleTimeout);
  }, [idleTimeout, startScroll, stopScroll]);

  useEffect(() => {
    const events = ["pointerdown", "pointermove", "keydown", "wheel", "touchstart", "scroll"];

    // Only reset on user-initiated scroll (not our programmatic one)
    const handleScroll = () => {
      if (activeRef.current) return; // ignore our own scrolling
      resetTimer();
    };

    const handleInteraction = () => resetTimer();

    events.forEach((e) => {
      if (e === "scroll") {
        window.addEventListener(e, handleScroll, { passive: true });
      } else {
        window.addEventListener(e, handleInteraction, { passive: true });
      }
    });

    // Start initial timer
    timerRef.current = setTimeout(startScroll, idleTimeout);

    return () => {
      events.forEach((e) => {
        window.removeEventListener(e, e === "scroll" ? handleScroll : handleInteraction);
      });
      clearTimeout(timerRef.current);
      stopScroll();
    };
  }, [resetTimer, startScroll, stopScroll, idleTimeout]);
}
