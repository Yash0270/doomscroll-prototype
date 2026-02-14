/*
 * Design: Digital Zen — Wabi-Sabi Minimalism
 * Color: warm stone grays, sage green, terracotta, cream, amber accent
 * Typography: Fraunces (display), DM Sans (body)
 * Layout: Vertical scroll with large breathing sections, iPhone mockup centerpiece
 */
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PhoneMockup from "@/components/PhoneMockup";
import AccelerometerWaveform from "@/components/AccelerometerWaveform";
import MLModelVisualization from "@/components/MLModelVisualization";
import SessionTracker from "@/components/SessionTracker";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import BreathingCircle from "@/components/BreathingCircle";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const HERO_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/x1WgSb0OKv5gqzDVtpp3AZ/sandbox/Pq0FrVtvkZYWSgoonq5BMH-img-1_1771096865000_na1fn_aGVyby16ZW4tYmc.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUveDFXZ1NiME9LdjVncXpEVnRwcDNBWi9zYW5kYm94L1BxMEZyVnR2a1pZV1Nnb29ucTVCTUgtaW1nLTFfMTc3MTA5Njg2NTAwMF9uYTFmbl9hR1Z5YnkxNlpXNHRZbWMuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=UI84k4kFe6wrPrPteEuiIK78DomTHGW-PWu4RpbeMU4tdiQmIvaUlOeS46BGtI~19GCxtV4FqZ3Dn-mxJ49z~NFkeMQa5xhz6tPOU0BJv1ey9IAK037zyQuXpFxjHJuf8o5xvyJM12~av5RSgER8YhMLyK5E8CIH84px7rTL8XtKt5dViBt6zOFy8slAoHez3b2HPWA5ORQvdCU25zYFqCT-WtPRcZdFMlLvKFXTBpzHw8XKbaWeG39CSsiQu67qCwiTQDBYAgH1-gx4KNPzdUDzurIln4Il5Cdyhkggm-TLzDtkDDt~HaY4Kmxi6biQEdFKem-feYmQX4dEQgSnSQ__";

const SENSOR_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/x1WgSb0OKv5gqzDVtpp3AZ/sandbox/Pq0FrVtvkZYWSgoonq5BMH-img-3_1771096871000_na1fn_c2Vuc29yLXZpc3VhbGl6YXRpb24.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUveDFXZ1NiME9LdjVncXpEVnRwcDNBWi9zYW5kYm94L1BxMEZyVnR2a1pZV1Nnb29ucTVCTUgtaW1nLTNfMTc3MTA5Njg3MTAwMF9uYTFmbl9jMlZ1YzI5eUxYWnBjM1ZoYkdsNllYUnBiMjQuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=IiTKuIulUFEqyuSu9Ik590nMQJ3KD39-l4AEI7lONK2HJ9X0WybaIVkd24H6wgPffr2gupuVIn67kOCcoGRX6knw-UPRqaibiHQ~Z5O5-Ov3j-cxaN5nrEgSpOauhwWrg3oZY6ielWduRQyDOPZ2n2h8vCBmGgdrYCdERgikH17V9Fy--nX9ME8tE-yeG9IJ8e7m0FmEJliH3lqsXjyAaXhgQAGI1GfAN1EmgXgmKGosuJkH6JqPtcW2C3xwdx9Q4QrNSz7axZ0BkXrxCGNkyM-K3KMRgadHh0o9jGpQJSo-UiqnBkHHZdwrmsqosbUUdmbvAjNmlBeK7B3ke3ARiw__";

const ML_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/x1WgSb0OKv5gqzDVtpp3AZ/sandbox/Pq0FrVtvkZYWSgoonq5BMH-img-4_1771096866000_na1fn_bWwtYnJhaW4tYWJzdHJhY3Q.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUveDFXZ1NiME9LdjVncXpEVnRwcDNBWi9zYW5kYm94L1BxMEZyVnR2a1pZV1Nnb29ucTVCTUgtaW1nLTRfMTc3MTA5Njg2NjAwMF9uYTFmbl9iV3d0WW5KaGFXNHRZV0p6ZEhKaFkzUS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=mvIegQcuwsa3TtIz-5UmjOOrJ8YWutid1mQMpFp6125jx6PVrRbm7s8nW4RSZj7wtijY2QvJZlT1usdFUp347n6YN9CvFiIDhvGoTFS9gwWwUV-WIboVH2XQo4H1GlBZrLbSOiKwGQycJjZUSG2-Ljib5tOR~u1Beb2Ce9GupgbPeLZFcoll9MMH5g92mZ-ZoTgAwNkSuEL241lt1~J2AaYus5Oyhkheg6nC6F4z1lWmZmmDFW6GuP9QwL34h3kKy1vBPdvI-0nRqWkwLSnpyYNeH6HEYOGPeFgMQgVvJ~FjZobTnQ2Rro2xYvBuONFYfh~P403xT4~QjSTwS5H3Xw__";

export default function Home() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDuration, setScrollDuration] = useState(0);
  const [threshold, setThreshold] = useState(30); // seconds for demo
  const [showIntervention, setShowIntervention] = useState(false);
  const [interventionCount, setInterventionCount] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const demoRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  // Timer for scroll duration
  useEffect(() => {
    if (!isScrolling) {
      setScrollDuration(0);
      setActiveStage(0);
      return;
    }

    const interval = setInterval(() => {
      setScrollDuration((d) => {
        const newD = d + 1;
        // Update active architecture stage
        const progress = newD / threshold;
        if (progress < 0.25) setActiveStage(0);
        else if (progress < 0.5) setActiveStage(1);
        else if (progress < 0.85) setActiveStage(2);
        else setActiveStage(3);

        if (newD >= threshold) {
          setShowIntervention(true);
          setInterventionCount((c) => c + 1);
        }
        return newD;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isScrolling, threshold]);

  const handleDismiss = useCallback((action: "continue" | "done") => {
    setShowIntervention(false);
    if (action === "done") {
      setIsScrolling(false);
      setScrollDuration(0);
    } else {
      setScrollDuration(0);
    }
  }, []);

  const toggleScrolling = () => {
    if (isScrolling) {
      setIsScrolling(false);
      setScrollDuration(0);
    } else {
      setIsScrolling(true);
    }
  };

  const scrollToDemo = () => {
    demoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      {/* Breathing Circle Intervention Overlay */}
      <BreathingCircle
        isVisible={showIntervention}
        onDismiss={handleDismiss}
        scrollDuration={scrollDuration}
      />

      {/* ===== NAVIGATION ===== */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md" style={{ backgroundColor: "rgba(245, 240, 232, 0.85)" }}>
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(120, 160, 100, 0.15)" }}
            >
              <span className="text-sm">🍃</span>
            </div>
            <span
              className="text-base font-semibold tracking-tight"
              style={{ fontFamily: "'Fraunces', serif", color: "rgba(80, 60, 40, 0.9)" }}
            >
              Stillscroll
            </span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={scrollToDemo}
              className="text-xs tracking-wide transition-colors duration-300 hover:opacity-70"
              style={{ color: "rgba(100, 80, 60, 0.5)" }}
            >
              Live Demo
            </button>
            <a
              href="#how-it-works"
              className="text-xs tracking-wide transition-colors duration-300 hover:opacity-70"
              style={{ color: "rgba(100, 80, 60, 0.5)" }}
            >
              How It Works
            </a>
            <a
              href="#tech"
              className="text-xs tracking-wide transition-colors duration-300 hover:opacity-70"
              style={{ color: "rgba(100, 80, 60, 0.5)" }}
            >
              Technology
            </a>
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.3 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(245, 240, 232, 0.4) 0%, rgba(245, 240, 232, 0.95) 80%)",
            }}
          />
        </div>

        <div className="container relative z-10 pt-24">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span
                className="text-xs tracking-[0.3em] uppercase mb-6 block"
                style={{ color: "rgba(120, 160, 100, 0.7)" }}
              >
                iOS App Concept
              </span>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6"
                style={{
                  fontFamily: "'Fraunces', serif",
                  color: "rgba(60, 45, 30, 0.95)",
                  fontWeight: 400,
                }}
              >
                Reclaim your
                <br />
                <span style={{ fontStyle: "italic", fontWeight: 300 }}>attention</span>
              </h1>
              <p
                className="text-lg leading-relaxed mb-10 max-w-lg"
                style={{ color: "rgba(100, 80, 60, 0.6)" }}
              >
                An iOS app that uses your phone's motion sensors and on-device machine learning
                to detect doomscrolling — and gently guides you back to the present moment.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex gap-4 items-center"
            >
              <Button
                onClick={scrollToDemo}
                className="rounded-full px-8 py-6 text-sm font-medium transition-all duration-500"
                style={{
                  backgroundColor: "rgba(120, 160, 100, 0.15)",
                  color: "rgba(80, 110, 65, 0.9)",
                  border: "1px solid rgba(120, 160, 100, 0.3)",
                }}
              >
                Try the Live Demo
              </Button>
              <a
                href="#how-it-works"
                className="text-sm transition-colors duration-300"
                style={{ color: "rgba(100, 80, 60, 0.4)" }}
              >
                Learn more →
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-5 h-8 rounded-full border" style={{ borderColor: "rgba(100, 80, 60, 0.2)" }}>
            <motion.div
              className="w-1 h-2 rounded-full mx-auto mt-1.5"
              style={{ backgroundColor: "rgba(100, 80, 60, 0.3)" }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* ===== THE PROBLEM ===== */}
      <section className="py-24 md:py-32" id="how-it-works">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="text-xs tracking-[0.3em] uppercase mb-4 block"
                style={{ color: "rgba(180, 110, 70, 0.6)" }}
              >
                The Problem
              </span>
              <h2
                className="text-3xl md:text-4xl mb-6"
                style={{
                  fontFamily: "'Fraunces', serif",
                  color: "rgba(60, 45, 30, 0.9)",
                  fontWeight: 400,
                }}
              >
                We scroll without thinking
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: "rgba(100, 80, 60, 0.6)" }}
              >
                The average person spends over 2 hours daily on social media, much of it in an
                unconscious, compulsive scrolling state. This "doomscrolling" is linked to increased
                anxiety, depression, and a diminished sense of well-being. The problem isn't the phone —
                it's the lack of awareness.
              </p>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { number: "2h 24m", label: "Average daily social media time", source: "DataReportal 2024" },
              { number: "88%", label: "Of users report mindless scrolling", source: "Pew Research" },
              { number: "52%", label: "Feel worse after doomscrolling", source: "Harvard Health" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center p-6 rounded-2xl"
                style={{ backgroundColor: "rgba(100, 80, 60, 0.02)" }}
              >
                <div
                  className="text-3xl mb-2"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    color: "rgba(180, 110, 70, 0.8)",
                    fontWeight: 300,
                  }}
                >
                  {stat.number}
                </div>
                <p className="text-sm mb-1" style={{ color: "rgba(80, 60, 40, 0.7)" }}>
                  {stat.label}
                </p>
                <p className="text-[10px]" style={{ color: "rgba(100, 80, 60, 0.35)" }}>
                  {stat.source}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-24 md:py-32 relative overflow-hidden" id="tech">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url(${SENSOR_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="text-xs tracking-[0.3em] uppercase mb-4 block"
                style={{ color: "rgba(120, 160, 100, 0.7)" }}
              >
                The Solution
              </span>
              <h2
                className="text-3xl md:text-4xl mb-6"
                style={{
                  fontFamily: "'Fraunces', serif",
                  color: "rgba(60, 45, 30, 0.9)",
                  fontWeight: 400,
                }}
              >
                Your phone already knows
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: "rgba(100, 80, 60, 0.6)" }}
              >
                Every iPhone contains an accelerometer and gyroscope that can detect the repetitive
                thumb-flicking motion of scrolling. Combined with an on-device machine learning model,
                we can identify doomscrolling in real-time — without ever seeing your screen.
              </p>
            </motion.div>
          </div>

          {/* Two-column: Motion Detection + ML */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Motion Detection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl p-6 overflow-hidden"
              style={{
                backgroundColor: "rgba(100, 80, 60, 0.03)",
                border: "1px solid rgba(100, 80, 60, 0.06)",
              }}
            >
              <h3
                className="text-lg mb-2"
                style={{ fontFamily: "'Fraunces', serif", color: "rgba(60, 45, 30, 0.85)" }}
              >
                Device Motion Sensors
              </h3>
              <p className="text-xs mb-4 leading-relaxed" style={{ color: "rgba(100, 80, 60, 0.5)" }}>
                CoreMotion collects 50Hz accelerometer and gyroscope data. During doomscrolling,
                the sensors detect a characteristic pattern: rapid Y-axis flicks interspersed
                with brief pauses — the unmistakable rhythm of a thumb swiping through a feed.
              </p>
              <div
                className="rounded-xl overflow-hidden"
                style={{ height: 160, backgroundColor: "rgba(245, 240, 232, 0.8)" }}
              >
                <AccelerometerWaveform isScrolling={isScrolling} />
              </div>
              <p className="text-[10px] mt-2 text-center" style={{ color: "rgba(100, 80, 60, 0.3)" }}>
                Live sensor simulation — {isScrolling ? "scrolling detected" : "idle state"}
              </p>
            </motion.div>

            {/* ML Model */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "rgba(100, 80, 60, 0.03)",
                border: "1px solid rgba(100, 80, 60, 0.06)",
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-1">
                  <h3
                    className="text-lg mb-2"
                    style={{ fontFamily: "'Fraunces', serif", color: "rgba(60, 45, 30, 0.85)" }}
                  >
                    On-Device ML Model
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(100, 80, 60, 0.5)" }}>
                    A CoreML activity classifier trained with Apple's Create ML analyzes 2-second
                    windows of sensor data. It runs entirely on-device — your motion data never
                    leaves your phone.
                  </p>
                </div>
                <img
                  src={ML_IMG}
                  alt="ML Brain"
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  style={{ opacity: 0.6 }}
                />
              </div>
              <MLModelVisualization isScrolling={isScrolling} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== INTERACTIVE DEMO ===== */}
      <section ref={demoRef} className="py-24 md:py-32" id="demo">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="text-xs tracking-[0.3em] uppercase mb-4 block"
                style={{ color: "rgba(180, 110, 70, 0.6)" }}
              >
                Interactive Demo
              </span>
              <h2
                className="text-3xl md:text-4xl mb-4"
                style={{
                  fontFamily: "'Fraunces', serif",
                  color: "rgba(60, 45, 30, 0.9)",
                  fontWeight: 400,
                }}
              >
                See it in action
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(100, 80, 60, 0.5)" }}
              >
                Click "Start Scrolling" to simulate doomscrolling. Watch the sensors react,
                the ML model classify the activity, and the intervention trigger when the threshold is reached.
              </p>
            </motion.div>
          </div>

          {/* Demo layout: Architecture | Phone | Data panels */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
            {/* Left: Architecture + Controls */}
            <div className="lg:col-span-3 space-y-6">
              <div
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: "rgba(100, 80, 60, 0.03)",
                  border: "1px solid rgba(100, 80, 60, 0.06)",
                }}
              >
                <h4
                  className="text-xs tracking-widest uppercase mb-4"
                  style={{ color: "rgba(100, 80, 60, 0.5)" }}
                >
                  Data Pipeline
                </h4>
                <ArchitectureDiagram isScrolling={isScrolling} activeStage={activeStage} />
              </div>

              {/* Threshold control */}
              <div
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: "rgba(100, 80, 60, 0.03)",
                  border: "1px solid rgba(100, 80, 60, 0.06)",
                }}
              >
                <h4
                  className="text-xs tracking-widest uppercase mb-3"
                  style={{ color: "rgba(100, 80, 60, 0.5)" }}
                >
                  Intervention Threshold
                </h4>
                <div className="space-y-3">
                  <Slider
                    value={[threshold]}
                    onValueChange={(v) => setThreshold(v[0])}
                    min={10}
                    max={120}
                    step={5}
                    className="w-full"
                    disabled={isScrolling}
                  />
                  <div className="flex justify-between">
                    <span className="text-[10px]" style={{ color: "rgba(100, 80, 60, 0.4)" }}>
                      {Math.floor(threshold / 60)}m {threshold % 60}s
                    </span>
                    <span className="text-[10px]" style={{ color: "rgba(100, 80, 60, 0.3)" }}>
                      {interventionCount} intervention{interventionCount !== 1 ? "s" : ""} triggered
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center: Phone Mockup */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <PhoneMockup isScrolling={isScrolling} />

              {/* Start/Stop button */}
              <motion.div className="mt-8" whileTap={{ scale: 0.97 }}>
                <Button
                  onClick={toggleScrolling}
                  className="rounded-full px-10 py-6 text-sm font-medium transition-all duration-500"
                  style={{
                    backgroundColor: isScrolling
                      ? "rgba(180, 110, 70, 0.12)"
                      : "rgba(120, 160, 100, 0.12)",
                    color: isScrolling
                      ? "rgba(180, 110, 70, 0.9)"
                      : "rgba(80, 110, 65, 0.9)",
                    border: `1px solid ${
                      isScrolling
                        ? "rgba(180, 110, 70, 0.3)"
                        : "rgba(120, 160, 100, 0.3)"
                    }`,
                  }}
                >
                  {isScrolling ? "Stop Scrolling" : "Start Scrolling"}
                </Button>
              </motion.div>
            </div>

            {/* Right: Session Tracker + ML + Waveform */}
            <div className="lg:col-span-4 space-y-6">
              {/* Session Tracker */}
              <div
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: "rgba(100, 80, 60, 0.03)",
                  border: "1px solid rgba(100, 80, 60, 0.06)",
                }}
              >
                <h4
                  className="text-xs tracking-widest uppercase mb-4 text-center"
                  style={{ color: "rgba(100, 80, 60, 0.5)" }}
                >
                  Session Monitor
                </h4>
                <SessionTracker
                  isScrolling={isScrolling}
                  scrollDuration={scrollDuration}
                  threshold={threshold}
                />
              </div>

              {/* ML Model */}
              <div
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: "rgba(100, 80, 60, 0.03)",
                  border: "1px solid rgba(100, 80, 60, 0.06)",
                }}
              >
                <MLModelVisualization isScrolling={isScrolling} />
              </div>

              {/* Live Waveform */}
              <div
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: "rgba(100, 80, 60, 0.03)",
                  border: "1px solid rgba(100, 80, 60, 0.06)",
                }}
              >
                <h4
                  className="text-xs tracking-widest uppercase mb-3"
                  style={{ color: "rgba(100, 80, 60, 0.5)" }}
                >
                  Sensor Waveform
                </h4>
                <div style={{ height: 80 }}>
                  <AccelerometerWaveform isScrolling={isScrolling} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TECHNICAL DETAILS ===== */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "rgba(100, 80, 60, 0.02)" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="text-xs tracking-[0.3em] uppercase mb-4 block"
                style={{ color: "rgba(120, 160, 100, 0.7)" }}
              >
                Under the Hood
              </span>
              <h2
                className="text-3xl md:text-4xl mb-6"
                style={{
                  fontFamily: "'Fraunces', serif",
                  color: "rgba(60, 45, 30, 0.9)",
                  fontWeight: 400,
                }}
              >
                Built with Apple's best
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: "📱",
                title: "CoreMotion Framework",
                description:
                  "Accesses the device's accelerometer and gyroscope at up to 100Hz. The CMMotionManager provides both raw and processed sensor data, filtering out gravitational bias for accurate gesture detection.",
                tag: "iOS 4.0+",
              },
              {
                icon: "🧠",
                title: "CoreML + Create ML",
                description:
                  "Apple's MLActivityClassifier is purpose-built for motion-based activity recognition. Trained with Create ML on labeled accelerometer/gyroscope data, the model classifies 2-second windows into activity types.",
                tag: "On-device",
              },
              {
                icon: "⏱",
                title: "DeviceActivity Framework",
                description:
                  "Optionally integrates with the Screen Time API to monitor which apps are in use. The DeviceActivityMonitor runs as a background extension, enabling the app to know when social media apps are active.",
                tag: "iOS 15+",
              },
              {
                icon: "🔒",
                title: "Privacy by Design",
                description:
                  "All processing happens on-device. No screen content is captured. No app usage data is transmitted. The ML model runs locally, and sensor data is discarded after classification.",
                tag: "Zero data collection",
              },
              {
                icon: "🌿",
                title: "Mindful Interventions",
                description:
                  "When doomscrolling is detected, the app presents a full-screen breathing exercise. Research shows that even a 60-second breathing pause can reduce cortisol levels and break compulsive behavior loops.",
                tag: "Evidence-based",
              },
              {
                icon: "⚡",
                title: "Energy Efficient",
                description:
                  "CoreMotion's batched delivery mode and CoreML's Neural Engine optimization ensure minimal battery impact. The app targets less than 2% additional battery drain per day.",
                tag: "< 2% battery",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  border: "1px solid rgba(100, 80, 60, 0.06)",
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span
                    className="text-[9px] tracking-wide px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "rgba(120, 160, 100, 0.08)",
                      color: "rgba(80, 110, 65, 0.7)",
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: "rgba(60, 45, 30, 0.85)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "rgba(100, 80, 60, 0.5)" }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-16" style={{ borderTop: "1px solid rgba(100, 80, 60, 0.06)" }}>
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">🍃</span>
              <span
                className="text-sm"
                style={{ fontFamily: "'Fraunces', serif", color: "rgba(80, 60, 40, 0.6)" }}
              >
                Stillscroll
              </span>
            </div>
            <p className="text-xs" style={{ color: "rgba(100, 80, 60, 0.3)" }}>
              A concept prototype exploring mindful technology. Not yet available on the App Store.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
