import React, { useEffect, useRef, useState } from "react";
import "../styles/Countdown.css";

interface CountdownProps {
  expiredAt?: string;
}

function Countdown({ expiredAt }: CountdownProps) {
  const [remaining, setRemaining] = useState<string | undefined>("Loading...");
  let timeoutId = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    function countdown() {
      if (!expiredAt) return;
      const millisUntilExpired =
        new Date(expiredAt).getTime() - new Date().getTime();
      const secondsUntilExpired = Math.floor(millisUntilExpired / 1000);

      const minutesUntilExpired = Math.floor(secondsUntilExpired / 60);
      const secondsInMinute = secondsUntilExpired % 60;

      setRemaining(`${minutesUntilExpired}:${secondsInMinute}`);

      if (millisUntilExpired <= 0) {
        clearTimeout(timeoutId.current!);
      } else {
        timeoutId.current = setTimeout(countdown, 1000);
      }
    }

    timeoutId.current = setTimeout(countdown, 1000);

    return () => {
      clearTimeout(timeoutId.current!);
    };
  }, [expiredAt, timeoutId]);

  return <div className="countdown">{remaining}</div>;
}

export default Countdown;
