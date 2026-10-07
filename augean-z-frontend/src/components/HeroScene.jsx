import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroScene() {
  const containerRef = useRef(null);
  const cubeWrapperRef = useRef(null);
  const cubeImgRef = useRef(null);
  const ringsRef = useRef(null);
  const textGroupRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const hudMetricsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Master Hero Pin Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=160%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // 1. Text fades & gently lifts away first, clearing space
      tl.to(
        textGroupRef.current,
        {
          opacity: 0,
          y: -70,
          scale: 0.94,
          filter: 'blur(6px)',
          ease: 'power2.inOut',
          duration: 0.4,
        },
        0
      );

      // 2. Scroll indicator dissolves quickly
      tl.to(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.2,
        },
        0
      );

      // 3. Fragmented Cube zooms closer, rotates and illuminates once typography begins clearing
      tl.to(
        cubeWrapperRef.current,
        {
          scale: 1.35,
          y: -30,
          ease: 'power2.out',
          duration: 1,
        },
        0.1
      );

      tl.to(
        cubeImgRef.current,
        {
          rotationZ: 12,
          rotationY: 15,
          filter: 'brightness(1.25) contrast(1.15) drop-shadow(0 0 50px rgba(157, 78, 221, 0.45))',
          ease: 'none',
          duration: 1,
        },
        0.1
      );

      // 4. Orbital rings expand & rotate
      tl.to(
        ringsRef.current,
        {
          scale: 1.3,
          rotation: 55,
          opacity: 0.9,
          ease: 'none',
          duration: 1,
        },
        0.1
      );

      // 5. Telemetry & diagnostic HUD fades into focus cleanly around the cube perimeter
      tl.to(
        hudMetricsRef.current,
        {
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          duration: 0.5,
        },
        0.4
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="scene-void"
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-between overflow-hidden bg-[#030305] pt-20 pb-10"
    >
      {/* Background radial gradient to give cinematic metallic depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,15,75,0.2)_0%,rgba(8,8,12,0.85)_55%,#030305_100%)] pointer-events-none" />

      {/* Hero Typography Group — Positioned in the upper region with dedicated vertical breathing room */}
      <div
        ref={textGroupRef}
        className="relative z-20 text-center max-w-4xl px-6 pointer-events-none select-none flex flex-col items-center shrink-0 mb-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="w-5 h-[1px] bg-purple-500/50" />
          <span className="font-mono text-[9px] md:text-[11px] tracking-[0.35em] text-purple-300/80 uppercase">
            STRUCTURAL CODE INTELLIGENCE
          </span>
          <span className="w-5 h-[1px] bg-purple-500/50" />
        </div>

        <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight text-white mb-4">
          AUGEAN<span className="text-purple-400 font-light">-Z</span>
        </h1>

        <p className="font-sans text-base sm:text-xl md:text-2xl text-zinc-300 font-light tracking-wide max-w-2xl leading-relaxed">
          From chaotic code to <span className="text-white font-normal underline decoration-purple-500/40 underline-offset-8">verified structure</span>.
        </p>

        <p className="font-mono text-[10px] md:text-xs text-zinc-500 mt-3 tracking-widest uppercase">
          CODE &rarr; STRUCTURE &rarr; VERIFICATION &rarr; RECONSTRUCTION
        </p>
      </div>

      {/* Central 3D Cube Assembly & Atmospheric Orbital Rings — Framed below typography */}
      <div
        ref={cubeWrapperRef}
        className="relative z-10 w-[280px] sm:w-[380px] md:w-[460px] aspect-square flex items-center justify-center transform-gpu shrink-0 my-auto"
      >
        {/* Ambient violet floor reflection glow */}
        <div className="absolute bottom-2 w-3/4 h-20 bg-purple-600/20 blur-[50px] rounded-full pointer-events-none" />

        {/* Technical Orbital Diagnostic Rings (SVG) */}
        <div
          ref={ringsRef}
          className="absolute inset-0 pointer-events-none opacity-60 transition-opacity"
        >
          <svg viewBox="0 0 600 600" className="w-full h-full">
            {/* Outer dotted orbital ring */}
            <circle
              cx="300"
              cy="300"
              r="270"
              fill="none"
              stroke="rgba(157, 78, 221, 0.22)"
              strokeWidth="1.2"
              strokeDasharray="4 8"
            />
            {/* Mid precision ring with coordinate notches */}
            <circle
              cx="300"
              cy="300"
              r="225"
              fill="none"
              stroke="rgba(255, 255, 255, 0.14)"
              strokeWidth="1"
            />
            <circle
              cx="300"
              cy="300"
              r="225"
              fill="none"
              stroke="rgba(199, 125, 255, 0.45)"
              strokeWidth="1.8"
              strokeDasharray="30 200"
              strokeDashoffset="45"
            />
            {/* Inner orbital ring */}
            <circle
              cx="300"
              cy="300"
              r="170"
              fill="none"
              stroke="rgba(157, 78, 221, 0.3)"
              strokeWidth="1"
              strokeDasharray="2 12"
            />

            {/* Orbiting diagnostic nodes */}
            <circle cx="300" cy="30" r="3.5" fill="#c77dff" className="glow-violet-sm" />
            <circle cx="525" cy="300" r="4" fill="#9d4edd" />
            <circle cx="75" cy="300" r="3" fill="#a855f7" />
            <circle cx="300" cy="525" r="4.5" fill="#e0aaff" className="glow-violet-sm" />

            {/* Technical HUD crosshairs & ticks */}
            <line x1="300" y1="20" x2="300" y2="40" stroke="rgba(199, 125, 255, 0.5)" strokeWidth="1.5" />
            <line x1="300" y1="560" x2="300" y2="580" stroke="rgba(199, 125, 255, 0.5)" strokeWidth="1.5" />
            <line x1="20" y1="300" x2="40" y2="300" stroke="rgba(199, 125, 255, 0.5)" strokeWidth="1.5" />
            <line x1="560" y1="300" x2="580" y2="300" stroke="rgba(199, 125, 255, 0.5)" strokeWidth="1.5" />

            {/* Micro HUD technical labels */}
            <text x="312" y="35" fill="rgba(199,125,255,0.7)" fontSize="8" fontFamily="JetBrains Mono" letterSpacing="2">
              ORBIT.PHI [47.2°]
            </text>
            <text x="430" y="505" fill="rgba(157,78,221,0.6)" fontSize="8" fontFamily="JetBrains Mono" letterSpacing="1.5">
              TENSOR_CORE.01
            </text>
          </svg>
        </div>

        {/* Primary Fragmented 3D Cube Image */}
        <div className="relative w-[78%] h-[78%] flex items-center justify-center">
          <img
            ref={cubeImgRef}
            src="/assets/broken-cube.png"
            alt="Augean-Z Fragmented Code Cube"
            className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] select-none pointer-events-none transition-transform will-change-transform"
          />
        </div>

        {/* Telemetry metadata overlay emerging around the cube perimeter without covering it */}
        <div
          ref={hudMetricsRef}
          className="absolute -inset-6 pointer-events-none opacity-0 flex flex-col justify-between p-2"
        >
          <div className="flex justify-between items-start">
            <div className="hud-tag">
              LATTICE · UNVERIFIED
            </div>
            <div className="hud-tag hud-tag-active">
              CHAOS INDEX: 0.884
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div className="hud-tag">
              STATE · DECOMPOSING
            </div>
            <div className="hud-tag">
              IR · RAW.AST
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Prompt — Grounded at the bottom */}
      <div
        ref={scrollIndicatorRef}
        className="relative z-20 flex flex-col items-center gap-2 pointer-events-none select-none shrink-0"
      >
        <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-zinc-500">
          SCROLL TO COMMENCE REASONING
        </span>
        <div className="w-4 h-7 rounded-full border border-zinc-700/80 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-purple-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
