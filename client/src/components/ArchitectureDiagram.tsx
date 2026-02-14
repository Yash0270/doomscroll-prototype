/*
 * Design: Digital Zen — Wabi-Sabi Minimalism
 * A visual representation of the app's architecture, showing the flow
 * from sensor data → ML model → session tracker → intervention.
 */
import { motion } from "framer-motion";

interface ArchitectureDiagramProps {
  isScrolling: boolean;
  activeStage: number; // 0-3 representing which stage is currently active
}

const stages = [
  {
    icon: "📱",
    title: "CoreMotion",
    subtitle: "Accelerometer + Gyroscope",
    description: "Collects 50Hz motion data from device sensors",
  },
  {
    icon: "🧠",
    title: "ML Classifier",
    subtitle: "On-device CoreML",
    description: "Classifies 2-second windows into activity types",
  },
  {
    icon: "⏱",
    title: "Session Tracker",
    subtitle: "Scroll duration monitor",
    description: "Tracks continuous scrolling and compares to threshold",
  },
  {
    icon: "🌿",
    title: "Intervention",
    subtitle: "Breathing exercise",
    description: "Full-screen mindful pause when threshold is exceeded",
  },
];

export default function ArchitectureDiagram({ isScrolling, activeStage }: ArchitectureDiagramProps) {
  return (
    <div className="flex flex-col gap-3">
      {stages.map((stage, i) => (
        <div key={i} className="flex items-start gap-3">
          {/* Connector line */}
          <div className="flex flex-col items-center flex-shrink-0" style={{ width: 32 }}>
            <motion.div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
              style={{
                backgroundColor:
                  i <= activeStage && isScrolling
                    ? "rgba(180, 110, 70, 0.12)"
                    : "rgba(100, 80, 60, 0.04)",
                border: `1px solid ${
                  i <= activeStage && isScrolling
                    ? "rgba(180, 110, 70, 0.3)"
                    : "rgba(100, 80, 60, 0.1)"
                }`,
              }}
              animate={
                i === activeStage && isScrolling
                  ? { scale: [1, 1.08, 1] }
                  : {}
              }
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {stage.icon}
            </motion.div>
            {i < stages.length - 1 && (
              <div className="flex flex-col items-center py-0.5">
                {[0, 1, 2].map((dot) => (
                  <motion.div
                    key={dot}
                    className="w-0.5 h-1.5 rounded-full my-0.5"
                    style={{
                      backgroundColor:
                        i < activeStage && isScrolling
                          ? "rgba(180, 110, 70, 0.3)"
                          : "rgba(100, 80, 60, 0.1)",
                    }}
                    animate={
                      i < activeStage && isScrolling
                        ? { opacity: [0.3, 1, 0.3] }
                        : {}
                    }
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: dot * 0.2,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="pt-1">
            <h5
              className="text-xs font-semibold"
              style={{
                color:
                  i <= activeStage && isScrolling
                    ? "rgba(80, 60, 40, 0.9)"
                    : "rgba(100, 80, 60, 0.5)",
              }}
            >
              {stage.title}
            </h5>
            <p
              className="text-[10px] mt-0.5"
              style={{ color: "rgba(100, 80, 60, 0.4)" }}
            >
              {stage.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
