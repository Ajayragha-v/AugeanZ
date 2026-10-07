import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle, Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ProblemScene() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          scrub: 1,
        },
      });

      // Scatter broken code shards in 3D space with subtle, controlled movement
      tl.fromTo(
        '.code-shard',
        {
          opacity: 0,
          y: (i) => (i % 2 === 0 ? 35 : -35),
          x: (i) => (i % 3 === 0 ? -25 : 25),
          rotationZ: (i) => (i * 4 - 8),
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          rotationZ: 0,
          scale: 1,
          stagger: 0.08,
          ease: 'power2.out',
        }
      );

      // Connecting diagnostic lines pulsing
      tl.fromTo(
        '.diag-line',
        { strokeDashoffset: 300, opacity: 0 },
        { strokeDashoffset: 0, opacity: 0.7, stagger: 0.1, ease: 'power1.inOut' },
        0.2
      );

      // Floating broken diagnostic badges
      tl.fromTo(
        '.floating-diag',
        { opacity: 0, scale: 0.85, y: 20 },
        { opacity: 1, scale: 1, y: 0, stagger: 0.06, ease: 'back.out(1.4)' },
        0.1
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="scene-problem"
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 sm:py-32 px-6 md:px-16 flex flex-col justify-center items-center overflow-hidden bg-[#050508]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-950/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 text-center max-w-3xl mb-14 select-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-950/20 text-red-400 font-mono text-[10px] tracking-widest uppercase mb-4">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>PHASE 01 · COMPUTATIONAL ENTROPY</span>
        </div>

        <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-5">
          CODE IS <span className="text-zinc-500">MESSY.</span>
        </h2>

        <p className="font-sans text-base sm:text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
          Traditional debugging fixates on symptoms—isolated stack traces and surface errors.
          <br className="hidden md:inline" />
          <span className="text-white font-medium"> Augean-Z starts with underlying topological structure.</span>
        </p>
      </div>

      {/* Broken Code Shards & Diagnostic Constellation */}
      <div className="relative z-10 w-full max-w-5xl h-[460px] md:h-[500px] flex items-center justify-center">
        {/* SVG Diagnostic Connecting Grid */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 500">
          <defs>
            <linearGradient id="grad-diag" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9d4edd" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b0764" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Broken relational lines */}
          <path
            className="diag-line"
            d="M 220,130 L 460,220 L 520,380"
            fill="none"
            stroke="url(#grad-diag)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <path
            className="diag-line"
            d="M 780,140 L 580,240 L 320,390"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
            strokeDasharray="2 6"
          />
          <path
            className="diag-line"
            d="M 480,90 L 510,250 L 760,370"
            fill="none"
            stroke="rgba(157,78,221,0.4)"
            strokeWidth="1.2"
          />

          {/* Nodes on intersections */}
          <circle cx="460" cy="220" r="4" fill="#c77dff" className="glow-violet-sm" />
          <circle cx="580" cy="240" r="3.5" fill="#a855f7" />
          <circle cx="510" cy="250" r="3" fill="#ffffff" />
        </svg>

        {/* Floating Disconnected Code Fragments */}
        <div className="relative w-full h-full flex flex-wrap items-center justify-center">
          {/* Shard 1: Broken Python Function */}
          <div className="code-shard absolute top-2 left-2 md:left-8 p-3.5 rounded-md bg-[#0a0a12]/90 border border-white/[0.08] shadow-2xl backdrop-blur-md max-w-[280px] select-none">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.05]">
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider">AST_NODE · FN_DEF</span>
              <span className="text-[9px] font-mono text-red-400 bg-red-950/40 px-1.5 py-0.5 rounded">UNBOUND</span>
            </div>
            <pre className="font-mono text-xs text-zinc-300 leading-relaxed overflow-x-hidden">
              <span className="text-purple-400">def</span> <span className="text-zinc-100">transform_lattice</span>(ctx, data):{'\n'}
              {'  '}<span className="text-zinc-500"># semantic loss</span>{'\n'}
              {'  '}tensor = data.<span className="text-red-400 underline decoration-wavy">reshape</span>(-1, ??)
            </pre>
          </div>

          {/* Shard 2: Disconnected Variables & Lambda */}
          <div className="code-shard absolute bottom-4 left-4 md:left-16 p-3.5 rounded-md bg-[#09090f]/90 border border-white/[0.07] shadow-xl backdrop-blur-md max-w-[280px] select-none">
            <div className="font-mono text-[9px] text-purple-400 mb-1">TYPE_CONSTRAINT_MISMATCH</div>
            <code className="font-mono text-xs text-zinc-300 block">
              &lambda;x. f(x) : <span className="text-zinc-500">Alpha &rarr;</span> <span className="text-red-400">Bottom</span>
            </code>
            <div className="mt-2 text-[10px] font-mono text-zinc-500">
              Expected: SemiLattice | Found: CyclicGraph
            </div>
          </div>

          {/* Shard 3: Center Entropy Core */}
          <div className="code-shard relative z-20 p-5 rounded-lg bg-[#0d0d16]/95 border border-purple-500/30 shadow-[0_0_50px_rgba(90,24,154,0.25)] backdrop-blur-xl max-w-sm text-center mx-4">
            <div className="inline-block p-2 rounded-full bg-purple-950/60 border border-purple-500/40 mb-3 text-purple-300">
              <Code className="w-4 h-4" />
            </div>
            <div className="font-mono text-xs tracking-widest text-purple-300 uppercase mb-1">
              STRUCTURAL DISINTEGRATION
            </div>
            <p className="font-sans text-xs text-zinc-400 mb-4 leading-relaxed">
              Control flow tangled with implicit state. Types unconstrained. The execution graph contains 14 undefined invariants.
            </p>
            <div className="grid grid-cols-2 gap-2 text-left">
              <div className="p-2 rounded bg-black/50 border border-white/[0.05]">
                <div className="font-mono text-[9px] text-zinc-500">CONTROL FLOW</div>
                <div className="font-mono text-xs text-red-400 font-semibold">NON-DETERMINISTIC</div>
              </div>
              <div className="p-2 rounded bg-black/50 border border-white/[0.05]">
                <div className="font-mono text-[9px] text-zinc-500">TOPOLOGY</div>
                <div className="font-mono text-xs text-purple-400 font-semibold">FRAGMENTED</div>
              </div>
            </div>
          </div>

          {/* Shard 4: Floating Diagnostic Flags */}
          <div className="code-shard absolute top-4 right-2 md:right-10 flex flex-col gap-2 max-w-[240px] select-none">
            <div className="floating-diag hud-tag flex items-center justify-between gap-3 text-red-300 border-red-500/30 bg-red-950/20">
              <span>TYPE: UNKNOWN</span>
              <span className="font-mono text-[9px] text-red-400">ERR_0x1A</span>
            </div>
            <div className="floating-diag hud-tag flex items-center justify-between gap-3 text-purple-300 border-purple-500/30 bg-purple-950/20">
              <span>VARIABLE: RESULT</span>
              <span className="font-mono text-[9px] text-zinc-400">UNBOUND_SCOPE</span>
            </div>
            <div className="floating-diag hud-tag flex items-center justify-between gap-3 text-zinc-300">
              <span>LINE: 27</span>
              <span className="font-mono text-[9px] text-zinc-500">INVARIANT_VIOLATION</span>
            </div>
            <div className="floating-diag hud-tag flex items-center justify-between gap-3 text-red-300 border-red-500/40">
              <span>CONSTRAINT: FAILED</span>
              <span className="font-mono text-[9px] text-red-400">&empty; SOLUTION</span>
            </div>
          </div>

          {/* Shard 5: Isolated Syntax Fragments */}
          <div className="code-shard absolute bottom-4 right-4 md:right-20 p-3 rounded bg-[#09090f]/90 border border-white/[0.06] backdrop-blur-md font-mono text-xs text-zinc-400 select-none hidden sm:block">
            <div className="text-[9px] text-zinc-500 mb-1">AST_TOKEN_DRIFT</div>
            <div>[ {'{'} <span className="text-purple-400">...payload</span> {'}'} ] &rarr; <span className="text-red-400">null</span></div>
            <div className="text-[9px] text-zinc-600 mt-1">Ref: 0x82A1FD</div>
          </div>
        </div>
      </div>
    </section>
  );
}
