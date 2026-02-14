/*
 * Design: Digital Zen — Wabi-Sabi Minimalism
 * The breathing circle is the core intervention visualization.
 * It expands and contracts with a 4-second cycle, guiding the user to breathe.
 * Warm amber center radiating outward to sage green.
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface BreathingCircleProps {
  isVisible: boolean;
  onDismiss: (action: "continue" | "done") => void;
  scrollDuration: number;
}

export default function BreathingCircle({ isVisible, onDismiss, scrollDuration }: BreathingCircleProps) {
  const [phase, setPhase] = useState<"inhale" | "exhale">("inhale");
  const [breathCount, setBreathCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setPhase((p) => {
        if (p === "inhale") return "exhale";
        setBreathCount((c) => c + 1);
        return "inhale";
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) {
      setBreathCount(0);
      setPhase("inhale");
    }
  }, [isVisible]);

  const minutes = Math.floor(scrollDuration / 60);
  const seconds = scrollDuration % 60;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ backgroundColor: "rgba(245, 240, 232, 0.97)" }}
        >
          {/* Breathing circle */}
          <div className="relative flex items-center justify-center mb-12">
            {/* Outer pulse ring */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 220,
                height: 220,
                border: "1px solid rgba(180, 110, 70, 0.15)",
              }}
              animate={{
                scale: phase === "inhale" ? [1, 1.6] : [1.6, 1],
                opacity: phase === "inhale" ? [0.4, 0] : [0, 0.4],
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
            />

            {/* Middle ring */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 180,
                height: 180,
                background: "radial-gradient(circle, rgba(120, 160, 100, 0.08) 0%, transparent 70%)",
                border: "1px solid rgba(120, 160, 100, 0.2)",
              }}
              animate={{
                scale: phase === "inhale" ? [0.9, 1.25] : [1.25, 0.9],
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
            />

            {/* Core circle */}
            <motion.div
              className="rounded-full flex items-center justify-center"
              style={{
                width: 140,
                height: 140,
                background: "radial-gradient(circle, rgba(190, 155, 80, 0.3) 0%, rgba(180, 110, 70, 0.15) 60%, transparent 100%)",
              }}
              animate={{
                scale: phase === "inhale" ? [0.85, 1.2] : [1.2, 0.85],
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
            >
              <span
                className="text-sm tracking-widest uppercase"
                style={{ color: "rgba(100, 75, 50, 0.7)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {phase === "inhale" ? "Breathe in" : "Breathe out"}
              </span>
            </motion.div>
          </div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center max-w-md px-6"
          >
            <h2
              className="text-2xl mb-3"
              style={{ fontFamily: "'Fraunces', serif", color: "rgba(80, 60, 40, 0.9)" }}
            >
              A gentle pause
            </h2>
            <p
              className="text-base mb-2 leading-relaxed"
              style={{ color: "rgba(100, 80, 60, 0.7)" }}
            >
              You've been scrolling for{" "}
              <span className="font-semibold" style={{ color: "rgba(180, 110, 70, 0.9)" }}>
                {minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`}
              </span>
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(100, 80, 60, 0.5)" }}
            >
              Take a moment to notice how you feel. There's no rush.
            </p>
          </motion.div>

          {/* Breath counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-8 mb-10"
          >
            <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(100, 80, 60, 0.4)" }}>
              {breathCount} breath{breathCount !== 1 ? "s" : ""} taken
            </span>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex gap-4"
          >
            <button
              onClick={() => onDismiss("done")}
              className="px-8 py-3 rounded-full text-sm font-medium transition-all duration-500 hover:shadow-lg"
              style={{
                backgroundColor: "rgba(120, 160, 100, 0.15)",
                color: "rgba(80, 110, 65, 0.9)",
                border: "1px solid rgba(120, 160, 100, 0.3)",
              }}
            >
              I'm done scrolling
            </button>
            <button
              onClick={() => onDismiss("continue")}
              className="px-8 py-3 rounded-full text-sm transition-all duration-500 hover:opacity-70"
              style={{ color: "rgba(100, 80, 60, 0.4)" }}
            >
              Continue
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
