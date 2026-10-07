import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Layers, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FinalScene({ onOpenPipeline }) {
  const containerRef = useRef(null);
  const cubeWrapperRef = useRef(null);
  const fixedCubeImgRef = useRef(null);
  const convergenceGlowRef = useRef(null);
  const ringsRef = useRef(null);
  const headerRef = useRef(null);
  const actionsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Climax Master Pin Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=220%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // 1. Shards converge inward from outer space into central focus
      tl.fromTo(
        '.converging-shard',
        {
          x: (i) => (i % 2 === 0 ? -90 : 90),
          y: (i) => (i < 2 ? -70 : 70),
          scale: 0.6,
          opacity: 0.7,
          rotation: 25,
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 0,
          rotation: 0,
          duration: 0.45,
          ease: 'power3.in',
        },
        0
      );

      // 2. Convergence flash & violet burst
      tl.fromTo(
        convergenceGlowRef.current,
        { scale: 0.4, opacity: 0 },
        {
          scale: 1.4,
          opacity: 0.85,
          boxShadow: '0 0 100px rgba(199, 125, 255, 0.8)',
          duration: 0.3,
          ease: 'power2.out',
        },
        0.35
      );

      // 3. Reconstructed Cube emerges locked into position — Calmer, stable resolution
      tl.fromTo(
        fixedCubeImgRef.current,
        {
          scale: 0.9,
          opacity: 0,
          filter: 'brightness(1.6) contrast(1.2) blur(6px)',
        },
        {
          scale: 1,
          opacity: 1,
          filter: 'brightness(1.08) contrast(1.1) blur(0px) drop-shadow(0 0 45px rgba(157, 78, 221, 0.45))',
          duration: 0.45,
          ease: 'power3.out',
        },
        0.4
      );

      // 4. Harmonic precision geometry aligns into perfect order
      tl.fromTo(
        ringsRef.current,
        { scale: 0.85, opacity: 0, rotation: -35 },
        { scale: 1.1, opacity: 0.9, rotation: 0, duration: 0.5, ease: 'power2.out' },
        0.45
      );

      // 5. Actions reveal gently beneath the stable cube
      tl.fromTo(
        actionsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
        0.6
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="scene-final"
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-between overflow-hidden bg-[#020204] select-none pt-16 pb-8"
    >
      {/* Deep graphite ambient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(50,15,85,0.2)_0%,rgba(4,4,7,0.92)_55%,#020204_100%)] pointer-events-none" />

      {/* Top Header — Calm conclusion of the narrative */}
      <div
        ref={headerRef}
        className="relative z-20 text-center max-w-3xl px-6 pointer-events-none shrink-0 mb-2"
      >
        <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-purple-300 uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>PHASE 08 · STRUCTURE</span>
        </div>

        <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-2">
          STRUCTURE
        </h2>

        <p className="font-sans text-xs sm:text-sm text-zinc-400 font-light max-w-md mx-auto">
          Verified structure becomes executable form.
        </p>
      </div>

      {/* Reconstructed Cube Showcase Assembly — Hero of the scene with harmonic geometry */}
      <div
        ref={cubeWrapperRef}
        className="relative z-10 w-[280px] sm:w-[380px] md:w-[460px] aspect-square flex items-center justify-center shrink-0 my-auto"
      >
        {/* Converging Shard Ghost Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="converging-shard absolute top-6 left-6 w-16 h-16 rounded bg-purple-500/20 border border-purple-400/40" />
          <div className="converging-shard absolute top-6 right-6 w-20 h-14 rounded bg-purple-500/20 border border-purple-400/40" />
          <div className="converging-shard absolute bottom-8 left-6 w-20 h-16 rounded bg-purple-500/20 border border-purple-400/40" />
          <div className="converging-shard absolute bottom-6 right-6 w-16 h-16 rounded bg-purple-500/20 border border-purple-400/40" />
        </div>

        {/* Convergence Core Violet Energy Bloom */}
        <div
          ref={convergenceGlowRef}
          className="absolute w-32 h-32 rounded-full bg-purple-600/30 blur-[40px] pointer-events-none"
        />

        {/* Ambient violet floor reflection glow */}
        <div className="absolute bottom-2 w-3/4 h-24 bg-purple-600/20 blur-[50px] rounded-full pointer-events-none" />

        {/* Calibrated Geometric Precision Symmetry Field (SVG) */}
        <div
          ref={ringsRef}
          className="absolute inset-0 pointer-events-none opacity-80"
        >
          <svg viewBox="0 0 600 600" className="w-full h-full">
            {/* Outer harmonic precision circle */}
            <circle
              cx="300"
              cy="300"
              r="260"
              fill="none"
              stroke="rgba(199, 125, 255, 0.22)"
              strokeWidth="1"
              strokeDasharray="6 6"
            />
            {/* Mid structural alignment circle */}
            <circle
              cx="300"
              cy="300"
              r="215"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
            />
            <circle
              cx="300"
              cy="300"
              r="215"
              fill="none"
              stroke="rgba(157, 78, 221, 0.5)"
              strokeWidth="1.8"
              strokeDasharray="50 150"
              strokeDashoffset="15"
            />

            {/* Inner crystalline boundary */}
            <circle
              cx="300"
              cy="300"
              r="170"
              fill="none"
              stroke="rgba(199, 125, 255, 0.15)"
              strokeWidth="0.8"
            />

            {/* Precision 4-Axis Orthogonal Coordinate Lines */}
            <line x1="300" y1="25" x2="300" y2="575" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.8" />
            <line x1="25" y1="300" x2="575" y2="300" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.8" />

            {/* Harmonic Lattice Nodes with subtle purple illumination */}
            <circle cx="300" cy="40" r="3.5" fill="#e0aaff" className="glow-violet-sm" />
            <circle cx="515" cy="300" r="3.5" fill="#c77dff" className="glow-violet-sm" />
            <circle cx="85" cy="300" r="3.5" fill="#c77dff" className="glow-violet-sm" />
            <circle cx="300" cy="515" r="3.5" fill="#e0aaff" className="glow-violet-sm" />

            {/* Coordinate Crosshairs */}
            <line x1="290" y1="40" x2="310" y2="40" stroke="#c77dff" strokeWidth="1" />
            <line x1="290" y1="515" x2="310" y2="515" stroke="#c77dff" strokeWidth="1" />
            <line x1="85" y1="290" x2="85" y2="310" stroke="#c77dff" strokeWidth="1" />
            <line x1="515" y1="290" x2="515" y2="310" stroke="#c77dff" strokeWidth="1" />

            {/* Subtle Mathematical Coordinate Telemetry */}
            <text x="312" y="44" fill="rgba(199,125,255,0.7)" fontSize="8" fontFamily="JetBrains Mono" letterSpacing="1.5">
              [X: 1.0, Y: 1.0, Z: 1.0]
            </text>
            <text x="400" y="495" fill="rgba(157,78,221,0.6)" fontSize="8" fontFamily="JetBrains Mono" letterSpacing="1.5">
              TOPOS · COMMUTATIVE
            </text>
          </svg>
        </div>

        {/* Reconstructed Fixed Cube Visual (Reference 2) */}
        <div className="relative w-[80%] h-[80%] flex items-center justify-center">
          <img
            ref={fixedCubeImgRef}
            src="/assets/reconstructed-cube.png"
            alt="Reconstructed Certified Cube"
            className="w-full h-full object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] select-none pointer-events-none will-change-transform"
          />
        </div>
      </div>

      {/* Action Buttons Area — Grounded beneath the cube with zero overlap */}
      <div
        id="final-cta"
        ref={actionsRef}
        className="relative z-20 flex flex-col items-center gap-4 shrink-0"
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Main CTA: Route directly to /app */}
          <button
            onClick={() => navigate('/app')}
            className="btn-primary group"
          >
            <span>OPEN AUGEAN-Z</span>
            <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
          </button>

          <button
            onClick={onOpenPipeline}
            className="btn-secondary group"
          >
            <span>VIEW FULL PIPELINE</span>
            <Layers className="w-3.5 h-3.5 group-hover:text-purple-300 transition-colors" />
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary group"
          >
            <span>VIEW ON GITHUB</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Minimal Footer */}
        <div className="w-full max-w-5xl px-6 flex flex-col sm:flex-row items-center justify-between text-zinc-600 font-mono text-[9px] tracking-wider pointer-events-none pt-2">
          <div>&copy; AUGEAN-Z RESEARCH LAB · ALL RIGHTS RESERVED</div>
          <div className="flex gap-3 mt-1.5 sm:mt-0">
            <span>SPEC: .GRN-V4.2</span>
            <span>&bull;</span>
            <span>KERNEL: LEAN 4</span>
            <span>&bull;</span>
            <span>SOLVER: JULIA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
