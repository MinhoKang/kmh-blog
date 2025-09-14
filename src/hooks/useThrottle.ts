import { useMemo, useRef } from "react";

// 커스텀 throttle 함수
export const useThrottle = <T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
): T => {
  const lastRan = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useMemo(() => {
    return ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const now = Date.now();
      if (now - lastRan.current >= delay) {
        callback(...args);
        lastRan.current = now;
      } else {
        timeoutRef.current = setTimeout(
          () => {
            callback(...args);
            lastRan.current = Date.now();
          },
          delay - (now - lastRan.current)
        );
      }
    }) as T;
  }, [callback, delay]);
};
