/*
 * Design: Digital Zen — Wabi-Sabi Minimalism
 * This component renders a live, animated accelerometer/gyroscope waveform.
 * When idle: calm, slow sine wave (like a heartbeat at rest).
 * When scrolling: erratic, high-frequency spikes mimicking thumb-flick patterns.
 */
import { useEffect, useRef, useState } from "react";

interface AccelerometerWaveformProps {
  isScrolling: boolean;
  className?: string;
}

export default function AccelerometerWaveform({ isScrolling, className = "" }: AccelerometerWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const scrollIntensityRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const mid = h / 2;

      // Smooth transition between idle and scrolling
      const target = isScrolling ? 1 : 0;
      scrollIntensityRef.current += (target - scrollIntensityRef.current) * 0.03;
      const intensity = scrollIntensityRef.current;

      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.02;
      const t = timeRef.current;

      // Draw three axes: X (terracotta), Y (sage), Z (amber)
      const axes = [
        { color: "rgba(180, 110, 70, 0.8)", label: "X-axis", phase: 0 },
        { color: "rgba(120, 160, 100, 0.8)", label: "Y-axis", phase: 2 },
        { color: "rgba(190, 155, 80, 0.7)", label: "Z-axis", phase: 4 },
      ];

      axes.forEach(({ color, phase }) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;

        for (let x = 0; x < w; x++) {
          const normalizedX = x / w;
          // Calm wave
          const calm = Math.sin((normalizedX * 4 + t + phase) * Math.PI) * 15;
          // Erratic scrolling wave
          const scroll =
            Math.sin((normalizedX * 12 + t * 3 + phase) * Math.PI) * 30 +
            Math.sin((normalizedX * 25 + t * 5 + phase * 1.5) * Math.PI) * 15 +
            (Math.random() - 0.5) * 20 * intensity;

          const y = mid + calm * (1 - intensity) + scroll * intensity;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      // Draw axis labels
      ctx.font = "10px 'DM Sans', sans-serif";
      ctx.fillStyle = "rgba(180, 110, 70, 0.6)";
      ctx.fillText("Accel X", 8, 14);
      ctx.fillStyle = "rgba(120, 160, 100, 0.6)";
      ctx.fillText("Accel Y", 8, 26);
      ctx.fillStyle = "rgba(190, 155, 80, 0.6)";
      ctx.fillText("Gyro Z", 8, 38);

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isScrolling]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ imageRendering: "auto" }}
    />
  );
}
