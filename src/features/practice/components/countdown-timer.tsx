import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export function CountdownTimer({
  initialSeconds,
  onTimeUp,
}: {
  initialSeconds: number;
  onTimeUp?: () => void;
}) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (seconds <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onTimeUp]);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const isWarning = seconds <= 300; // <= 5 minutes

  return (
    <Box
      className={`flex items-center gap-2 rounded-full px-4 py-1.5 font-bold ${
        isWarning
          ? "animate-pulse bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
          : "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
      }`}
    >
      <Typography variant="h6" className="font-mono font-bold tabular-nums tracking-wider">
        {formatTime(seconds)}
      </Typography>
    </Box>
  );
}
