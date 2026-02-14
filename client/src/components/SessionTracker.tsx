/*
 * Design: Digital Zen — Wabi-Sabi Minimalism
 * Displays the current scrolling session duration and threshold progress.
 * Uses a circular progress indicator that fills as the user approaches the limit.
 */
import { motion } from "framer-motion";

interface SessionTrackerProps {
  isScrolling: boolean;
  scrollDuration: number;
  threshold: number;
}

export default function SessionTracker({ isScrolling, scrollDuration, threshold }: SessionTrackerProps) {
  const progress = Math.min(scrollDuration / threshold, 1);
  const minutes = Math.floor(scrollDuration / 60);
  const seconds = scrollDuration % 60;
  const thresholdMin = Math.floor(threshold / 60);

  // SVG circle parameters
  const size = 120;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  const getStatusColor = () => {
    if (progress < 0.5) return "rgba(120, 160, 100, 0.8)";
    if (progress < 0.8) return "rgba(190, 155, 80, 0.8)";
    return "rgba(180, 110, 70, 0.8)";
  };

  const getStatusText = () => {
    if (!isScrolling) return "Idle";
    if (progress < 0.5) return "Monitoring";
    if (progress < 0.8) return "Caution";
    return "Intervening soon";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg width={size} height={size} className="absolute inset-0 -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(100, 80, 60, 0.06)"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={getStatusColor()}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-lg font-mono tabular-nums"
            style={{ color: "rgba(80, 60, 40, 0.8)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
          >
            {minutes}:{seconds.toString().padStart(2, "0")}
          </span>
          <span className="text-[9px]" style={{ color: "rgba(100, 80, 60, 0.4)" }}>
            / {thresholdMin}:{(threshold % 60).toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Status */}
      <div className="mt-3 flex items-center gap-1.5">
        <motion.div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: isScrolling ? getStatusColor() : "rgba(100, 80, 60, 0.2)" }}
          animate={isScrolling ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-[10px] tracking-wide" style={{ color: "rgba(100, 80, 60, 0.5)" }}>
          {getStatusText()}
        </span>
      </div>
    </div>
  );
}
