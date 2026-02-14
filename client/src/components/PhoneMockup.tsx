/*
 * Design: Digital Zen — Wabi-Sabi Minimalism
 * A realistic iPhone mockup showing a simulated social media feed.
 * When the user clicks "Start Scrolling", it simulates doomscrolling.
 */
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

interface PhoneMockupProps {
  isScrolling: boolean;
}

const FEED_ITEMS = [
  { type: "text", user: "NewsDaily", content: "Breaking: Another crisis unfolds as markets react to global uncertainty...", time: "2m", likes: "1.2K" },
  { type: "image", user: "TrendWatch", content: "You won't believe what happened next. Thread 🧵", time: "5m", likes: "4.5K" },
  { type: "text", user: "PoliticsNow", content: "JUST IN: New policy changes announced that could affect millions...", time: "8m", likes: "890" },
  { type: "image", user: "ViralMoments", content: "This is the most insane thing I've seen today 😱", time: "12m", likes: "12K" },
  { type: "text", user: "BreakingAlert", content: "Developing story: Experts warn of unprecedented challenges ahead...", time: "15m", likes: "2.3K" },
  { type: "text", user: "DailyDoom", content: "10 things you need to worry about right now. Number 7 will shock you.", time: "18m", likes: "6.7K" },
  { type: "image", user: "WorldWatch", content: "Satellite images reveal the extent of the damage...", time: "22m", likes: "3.1K" },
  { type: "text", user: "TechPanic", content: "AI is coming for your job and there's nothing you can do about it", time: "25m", likes: "8.9K" },
  { type: "text", user: "HealthScare", content: "New study links common habit to serious health risks...", time: "30m", likes: "5.4K" },
  { type: "image", user: "ClimateWatch", content: "These before/after photos are devastating 💔", time: "35m", likes: "15K" },
];

export default function PhoneMockup({ isScrolling }: PhoneMockupProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    if (!isScrolling) return;

    const el = scrollRef.current;
    let scrollPos = 0;
    const interval = setInterval(() => {
      scrollPos += 2;
      el.scrollTop = scrollPos;
      if (scrollPos >= el.scrollHeight - el.clientHeight) {
        scrollPos = 0;
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isScrolling]);

  useEffect(() => {
    if (!isScrolling && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [isScrolling]);

  return (
    <div className="relative mx-auto" style={{ width: 260, height: 530 }}>
      {/* Phone frame */}
      <div
        className="absolute inset-0 rounded-[36px] shadow-2xl"
        style={{
          background: "linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%)",
          padding: 8,
        }}
      >
        {/* Notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
          style={{
            width: 100,
            height: 28,
            backgroundColor: "#1a1a1a",
            borderRadius: "0 0 18px 18px",
          }}
        />

        {/* Screen */}
        <div
          className="w-full h-full rounded-[28px] overflow-hidden relative"
          style={{ backgroundColor: "#fafafa" }}
        >
          {/* Status bar */}
          <div
            className="flex justify-between items-center px-6 pt-3 pb-1 text-[9px] font-medium relative z-10"
            style={{ color: "#333", backgroundColor: "#fafafa" }}
          >
            <span>9:41</span>
            <div className="flex gap-1 items-center">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="#333">
                <rect x="0" y="4" width="2" height="4" rx="0.5" />
                <rect x="3" y="2.5" width="2" height="5.5" rx="0.5" />
                <rect x="6" y="1" width="2" height="7" rx="0.5" />
                <rect x="9" y="0" width="2" height="8" rx="0.5" />
              </svg>
              <svg width="16" height="8" viewBox="0 0 16 8" fill="#333">
                <rect x="0" y="0" width="14" height="8" rx="1.5" stroke="#333" strokeWidth="0.8" fill="none" />
                <rect x="1" y="1" width="10" height="6" rx="0.8" />
                <rect x="14.5" y="2.5" width="1.5" height="3" rx="0.5" />
              </svg>
            </div>
          </div>

          {/* App header */}
          <div
            className="px-4 py-2 border-b flex items-center justify-between"
            style={{ borderColor: "#eee", backgroundColor: "#fafafa" }}
          >
            <span className="text-xs font-bold" style={{ color: "#222" }}>Feed</span>
            <div className="flex gap-2">
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: "#eee" }} />
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: "#eee" }} />
            </div>
          </div>

          {/* Scrollable feed */}
          <div
            ref={scrollRef}
            className="overflow-hidden"
            style={{ height: "calc(100% - 68px)" }}
          >
            {FEED_ITEMS.map((item, i) => (
              <div key={i} className="px-3 py-3 border-b" style={{ borderColor: "#f0f0f0" }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    className="w-6 h-6 rounded-full flex-shrink-0"
                    style={{
                      background: `hsl(${(i * 47) % 360}, 30%, 75%)`,
                    }}
                  />
                  <span className="text-[10px] font-semibold" style={{ color: "#333" }}>
                    @{item.user}
                  </span>
                  <span className="text-[9px]" style={{ color: "#999" }}>
                    {item.time}
                  </span>
                </div>
                <p className="text-[10px] leading-relaxed mb-1.5" style={{ color: "#444" }}>
                  {item.content}
                </p>
                {item.type === "image" && (
                  <div
                    className="w-full h-24 rounded-lg mb-1.5"
                    style={{
                      background: `linear-gradient(135deg, hsl(${(i * 73) % 360}, 20%, 85%) 0%, hsl(${(i * 73 + 40) % 360}, 25%, 78%) 100%)`,
                    }}
                  />
                )}
                <div className="flex gap-4 text-[9px]" style={{ color: "#888" }}>
                  <span>♡ {item.likes}</span>
                  <span>💬 {Math.floor(Math.random() * 200)}</span>
                  <span>↗ Share</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator glow when scrolling */}
      {isScrolling && (
        <motion.div
          className="absolute -inset-3 rounded-[42px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(180, 110, 70, 0.15) 0%, transparent 70%)",
          }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </div>
  );
}
