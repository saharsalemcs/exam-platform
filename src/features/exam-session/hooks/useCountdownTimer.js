import { useState, useEffect, useRef, useCallback } from "react";

export function useCountdownTimer(initialSeconds, onExpire) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);
  const hasExpiredRef = useRef(false);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  const tick = useCallback(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRunning(false);
        if (!hasExpiredRef.current) {
          hasExpiredRef.current = true;
          setTimeout(() => onExpireRef.current?.(), 0);
        }
        return 0;
      }
      return prev - 1;
    });
  }, []);

  const start = useCallback(
    (fromSeconds) => {
      hasExpiredRef.current = false;
      if (intervalRef.current) return;
      // لو بعتيلنا fromSeconds (حالة الـ resume)، ابدأ من اللحظة دي
      if (fromSeconds !== undefined) setTimeLeft(Math.max(0, fromSeconds));
      setIsRunning(true);
      intervalRef.current = setInterval(tick, 1000);
    },
    [tick],
  );

  const pause = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    if (intervalRef.current || timeLeft <= 0) return;
    setIsRunning(true);
    intervalRef.current = setInterval(tick, 1000);
  }, [tick, timeLeft]);

  // Cleanup
  useEffect(() => () => clearInterval(intervalRef.current), []);

  return { timeLeft, isRunning, start, pause, resume };
}
