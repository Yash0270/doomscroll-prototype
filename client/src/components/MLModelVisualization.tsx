/*
 * Design: Digital Zen — Wabi-Sabi Minimalism
 * Visualizes the on-device ML model's activity classification in real-time.
 * Shows confidence bars for each activity class.
 */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface MLModelVisualizationProps {
  isScrolling: boolean;
}

interface ActivityPrediction {
  label: string;
  confidence: number;
  color: string;
}

export default function MLModelVisualization({ isScrolling }: MLModelVisualizationProps) {
  const [predictions, setPredictions] = useState<ActivityPrediction[]>([
    { label: "Scrolling", confidence: 0.05, color: "rgba(180, 110, 70, 0.8)" },
    { label: "Stationary", confidence: 0.85, color: "rgba(120, 160, 100, 0.8)" },
    { label: "Typing", confidence: 0.05, color: "rgba(190, 155, 80, 0.8)" },
    { label: "Walking", confidence: 0.03, color: "rgba(160, 130, 100, 0.6)" },
    { label: "Reading", confidence: 0.02, color: "rgba(140, 140, 140, 0.6)" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isScrolling) {
        const scrollConf = 0.82 + Math.random() * 0.15;
        const remaining = 1 - scrollConf;
        setPredictions([
          { label: "Scrolling", confidence: scrollConf, color: "rgba(180, 110, 70, 0.8)" },
          { label: "Stationary", confidence: remaining * 0.3 + Math.random() * 0.02, color: "rgba(120, 160, 100, 0.8)" },
          { label: "Typing", confidence: remaining * 0.3 + Math.random() * 0.02, color: "rgba(190, 155, 80, 0.8)" },
          { label: "Walking", confidence: remaining * 0.2 + Math.random() * 0.01, color: "rgba(160, 130, 100, 0.6)" },
          { label: "Reading", confidence: remaining * 0.2 + Math.random() * 0.01, color: "rgba(140, 140, 140, 0.6)" },
        ]);
      } else {
        const stationaryConf = 0.75 + Math.random() * 0.15;
        const remaining = 1 - stationaryConf;
        setPredictions([
          { label: "Scrolling", confidence: remaining * 0.15 + Math.random() * 0.02, color: "rgba(180, 110, 70, 0.8)" },
          { label: "Stationary", confidence: stationaryConf, color: "rgba(120, 160, 100, 0.8)" },
          { label: "Typing", confidence: remaining * 0.3 + Math.random() * 0.02, color: "rgba(190, 155, 80, 0.8)" },
          { label: "Walking", confidence: remaining * 0.25 + Math.random() * 0.02, color: "rgba(160, 130, 100, 0.6)" },
          { label: "Reading", confidence: remaining * 0.3 + Math.random() * 0.02, color: "rgba(140, 140, 140, 0.6)" },
        ]);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [isScrolling]);

  const sorted = [...predictions].sort((a, b) => b.confidence - a.confidence);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h4
          className="text-xs tracking-widest uppercase"
          style={{ color: "rgba(100, 80, 60, 0.5)", fontFamily: "'DM Sans', sans-serif" }}
        >
          ML Activity Classifier
        </h4>
        <div className="flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: isScrolling ? "rgba(180, 110, 70, 0.8)" : "rgba(120, 160, 100, 0.8)",
            }}
          />
          <span className="text-[10px]" style={{ color: "rgba(100, 80, 60, 0.4)" }}>
            {isScrolling ? "Alert" : "Calm"}
          </span>
        </div>
      </div>

      {sorted.map((pred) => (
        <div key={pred.label} className="space-y-1">
          <div className="flex justify-between items-center">
            <span
              className="text-xs font-medium"
              style={{
                color: pred.confidence > 0.5 ? pred.color : "rgba(100, 80, 60, 0.5)",
              }}
            >
              {pred.label}
            </span>
            <span
              className="text-[10px] font-mono tabular-nums"
              style={{ color: "rgba(100, 80, 60, 0.4)" }}
            >
              {(pred.confidence * 100).toFixed(1)}%
            </span>
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ backgroundColor: "rgba(100, 80, 60, 0.06)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: pred.color }}
              animate={{ width: `${pred.confidence * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
