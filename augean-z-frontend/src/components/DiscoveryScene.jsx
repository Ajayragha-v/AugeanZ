import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, CheckCircle2, XCircle, Filter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function DiscoveryScene() {
  const containerRef = useRef(null);
  const compilerCardRef = useRef(null);
  const candidatesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // 1. Enter Candidate Space
      tl.fromTo(
        compilerCardRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
        0.1
      );

      // 2. Candidate models populate (M1, M2, M3, M4)
      tl.fromTo(
        '.candidate-card',
        { scale: 0.88, opacity: 0, y: 25 },
        { scale: 1, opacity: 1, stagger: 0.1, duration: 0.4, ease: 'back.out(1.5)' },
        0.2
      );

      // 3. Mathematical filter pass: Non-viable candidates fail & fade out
      tl.to(
        '.candidate-failed',
        {
          opacity: 0.25,
          filter: 'grayscale(1) blur(1px)',
          borderColor: 'rgba(239, 68, 68, 0.2)',
          duration: 0.4,
          ease: 'power2.inOut',
        },
        0.5
      );

      // 4. Viable Candidate Models illuminate in violet
      tl.to(
        '.candidate-survivor',
        {
          borderColor: 'rgba(199, 125, 255, 0.8)',
          boxShadow: '0 0 35px rgba(157, 78, 221, 0.4)',
          scale: 1.03,
          duration: 0.4,
          ease: 'power2.out',
        },
        0.55
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="scene-discovery"
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-between overflow-hidden bg-[#030306] select-none pt-14 pb-8"
    >
      {/* Background radial gradient & mathematical space grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(40,15,70,0.22)_0%,rgba(5,5,8,0.95)_70%,#030306_100%)] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-20 text-center max-w-3xl px-6 pointer-events-none shrink-0 mb-2">
        <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-purple-300 uppercase mb-1.5">
          <Cpu className="w-3.5 h-3.5 text-purple-400" />
          <span>PHASE 04 · JULIA COMPILER &bull; MODEL DISCOVERY</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight mb-2">
          SEARCH THE SPACE OF POSSIBLE MODELS.
        </h2>
        <p className="font-sans text-xs sm:text-sm text-zinc-400 font-light max-w-xl mx-auto">
          The Julia compiler analyzes the combinatorial state space of algebraic topologies to discover valid candidate structures.
        </p>
      </div>

      {/* Main Content Arena: Candidate Models Matrix */}
      <div className="relative z-10 w-full max-w-6xl px-6 md:px-12 my-auto">
        {/* Compiler Search Telemetry Banner */}
        <div
          ref={compilerCardRef}
          className="mb-5 p-3 rounded-lg bg-[#080811]/90 border border-white/[0.08] backdrop-blur-md flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-zinc-400"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
            <span className="text-white font-medium">JULIA SOLVER KERNEL: ACTIVE</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-500">SEARCH_SPACE: 16,384 CONFIGS</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <Filter className="w-3 h-3 text-purple-400" /> TOPOLOGICAL FILTER: STRICT
            </span>
            <span className="text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
              MATCHES FOUND: 2
            </span>
          </div>
        </div>

        {/* 4 Candidate Models Grid */}
        <div
          ref={candidatesRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Candidate M1 (Survivor) */}
          <div className="candidate-card candidate-survivor p-4 rounded-lg bg-[#090912]/95 border border-purple-500/30 transition-all duration-300 relative group flex flex-col justify-between h-[270px]">
            <div className="absolute top-3 right-3 flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
              <CheckCircle2 className="w-3 h-3" />
              <span>VIABLE</span>
            </div>

            <div>
              <div className="font-display font-bold text-2xl text-white mb-0.5">M₁</div>
              <div className="font-mono text-[9px] text-purple-300 uppercase tracking-wider mb-3">
                COMMUTATIVE SEMILATTICE
              </div>

              {/* Geometric mini-diagram */}
              <div className="w-full h-20 bg-black/60 rounded border border-white/[0.05] p-2 flex items-center justify-center">
                <svg viewBox="0 0 100 70" className="w-20 h-14">
                  <polygon points="50,10 90,40 50,65 10,40" fill="none" stroke="#c77dff" strokeWidth="1.5" />
                  <circle cx="50" cy="10" r="3" fill="#ffffff" />
                  <circle cx="90" cy="40" r="3" fill="#c77dff" />
                  <circle cx="50" cy="65" r="3" fill="#ffffff" />
                  <circle cx="10" cy="40" r="3" fill="#c77dff" />
                  <line x1="50" y1="10" x2="50" y2="65" stroke="rgba(199,125,255,0.4)" strokeDasharray="2 2" />
                </svg>
              </div>
            </div>

            <div className="font-mono text-[9px] text-zinc-400 space-y-0.5 border-t border-white/[0.05] pt-2">
              <div className="flex justify-between">
                <span>HOMOMORPHISM:</span>
                <span className="text-white">PRESERVED</span>
              </div>
              <div className="flex justify-between">
                <span>CARDINALITY:</span>
                <span className="text-purple-300">|S| = 4</span>
              </div>
            </div>
          </div>

          {/* Candidate M2 (Survivor) */}
          <div className="candidate-card candidate-survivor p-4 rounded-lg bg-[#090912]/95 border border-purple-500/30 transition-all duration-300 relative group flex flex-col justify-between h-[270px]">
            <div className="absolute top-3 right-3 flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
              <CheckCircle2 className="w-3 h-3" />
              <span>VIABLE</span>
            </div>

            <div>
              <div className="font-display font-bold text-2xl text-white mb-0.5">M₂</div>
              <div className="font-mono text-[9px] text-purple-300 uppercase tracking-wider mb-3">
                BIFUNCTORIAL MONOID
              </div>

              {/* Geometric mini-diagram */}
              <div className="w-full h-20 bg-black/60 rounded border border-white/[0.05] p-2 flex items-center justify-center">
                <svg viewBox="0 0 100 70" className="w-20 h-14">
                  <circle cx="30" cy="35" r="16" fill="none" stroke="#9d4edd" strokeWidth="1.5" />
                  <circle cx="70" cy="35" r="16" fill="none" stroke="#9d4edd" strokeWidth="1.5" />
                  <circle cx="30" cy="35" r="3" fill="#c77dff" />
                  <circle cx="70" cy="35" r="3" fill="#c77dff" />
                  <path d="M 35,22 Q 50,15 65,22" fill="none" stroke="#e0aaff" strokeWidth="1.2" />
                  <path d="M 35,48 Q 50,55 65,48" fill="none" stroke="#e0aaff" strokeWidth="1.2" />
                </svg>
              </div>
            </div>

            <div className="font-mono text-[9px] text-zinc-400 space-y-0.5 border-t border-white/[0.05] pt-2">
              <div className="flex justify-between">
                <span>ASSOCIATIVITY:</span>
                <span className="text-white">SATISFIED</span>
              </div>
              <div className="flex justify-between">
                <span>CARDINALITY:</span>
                <span className="text-purple-300">|S| = 6</span>
              </div>
            </div>
          </div>

          {/* Candidate M3 (Failed) */}
          <div className="candidate-card candidate-failed p-4 rounded-lg bg-[#07070d]/90 border border-white/[0.06] transition-all duration-300 relative flex flex-col justify-between h-[270px]">
            <div className="absolute top-3 right-3 flex items-center gap-1 text-[9px] font-mono text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-500/20">
              <XCircle className="w-3 h-3" />
              <span>CYCLIC CONFLICT</span>
            </div>

            <div>
              <div className="font-display font-bold text-2xl text-zinc-400 mb-0.5">M₃</div>
              <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider mb-3">
                CYCLIC DIRECTED GRAPH
              </div>

              <div className="w-full h-20 bg-black/40 rounded border border-white/[0.03] p-2 flex items-center justify-center">
                <svg viewBox="0 0 100 70" className="w-20 h-14 opacity-40">
                  <circle cx="50" cy="35" r="20" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="30" y1="35" x2="70" y2="35" stroke="#ef4444" strokeWidth="1" />
                </svg>
              </div>
            </div>

            <div className="font-mono text-[9px] text-zinc-600 space-y-0.5 border-t border-white/[0.03] pt-2">
              <div className="flex justify-between">
                <span>DEADLOCK RISK:</span>
                <span className="text-red-400">DETECTED</span>
              </div>
              <div className="flex justify-between">
                <span>STATUS:</span>
                <span className="text-zinc-500">PRUNED</span>
              </div>
            </div>
          </div>

          {/* Candidate M4 (Failed) */}
          <div className="candidate-card candidate-failed p-4 rounded-lg bg-[#07070d]/90 border border-white/[0.06] transition-all duration-300 relative flex flex-col justify-between h-[270px]">
            <div className="absolute top-3 right-3 flex items-center gap-1 text-[9px] font-mono text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-500/20">
              <XCircle className="w-3 h-3" />
              <span>TYPE OVERFLOW</span>
            </div>

            <div>
              <div className="font-display font-bold text-2xl text-zinc-400 mb-0.5">M₄</div>
              <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider mb-3">
                INFINITE ADJUNCTION
              </div>

              <div className="w-full h-20 bg-black/40 rounded border border-white/[0.03] p-2 flex items-center justify-center">
                <svg viewBox="0 0 100 70" className="w-20 h-14 opacity-40">
                  <path d="M 20,35 Q 50,10 80,35 Q 50,60 20,35" fill="none" stroke="#ef4444" strokeWidth="1" />
                </svg>
              </div>
            </div>

            <div className="font-mono text-[9px] text-zinc-600 space-y-0.5 border-t border-white/[0.03] pt-2">
              <div className="flex justify-between">
                <span>TERMINATION:</span>
                <span className="text-red-400">UNBOUNDED</span>
              </div>
              <div className="flex justify-between">
                <span>STATUS:</span>
                <span className="text-zinc-500">PRUNED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Pipeline Progress Line */}
      <div className="relative z-20 flex items-center gap-3 font-mono text-[10px] text-zinc-500 shrink-0">
        <span>QUERY</span>
        <span className="text-purple-400">&rarr;</span>
        <span className="text-zinc-400">CANDIDATE SPACE</span>
        <span className="text-purple-400">&rarr;</span>
        <span className="text-purple-400 font-semibold">FILTER</span>
        <span className="text-purple-400">&rarr;</span>
        <span className="text-purple-200">CANDIDATE MODELS [M₁, M₂]</span>
      </div>
    </section>
  );
}
