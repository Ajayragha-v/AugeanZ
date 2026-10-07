import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, ArrowRight, Binary } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function DetectiveScene() {
  const containerRef = useRef(null);
  const codePanelRef = useRef(null);
  const graphSvgRef = useRef(null);
  const grnQueryPanelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      // 1. Raw code enters, highlights variables turning into nodes
      tl.to(
        codePanelRef.current,
        {
          x: -30,
          opacity: 0.35,
          scale: 0.94,
          filter: 'blur(2px)',
          duration: 0.35,
          ease: 'power2.inOut',
        },
        0.1
      );

      // 2. Structural graph draws itself (nodes expand, edges draw)
      tl.fromTo(
        '.graph-edge',
        { strokeDashoffset: 400, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, stagger: 0.08, duration: 0.45, ease: 'power1.inOut' },
        0.15
      );

      tl.fromTo(
        '.graph-node',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.06, duration: 0.35, ease: 'back.out(2)' },
        0.2
      );

      tl.fromTo(
        '.morphism-label',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.3, ease: 'power2.out' },
        0.3
      );

      // 3. Mathematical Query Panel (.grn Shape Query) slides in and illuminates
      tl.fromTo(
        grnQueryPanelRef.current,
        {
          x: 40,
          opacity: 0,
          scale: 0.94,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
        0.4
      );

      // 4. Pure structural illumination of category theory entities
      tl.to(
        '.category-tag',
        {
          borderColor: 'rgba(199, 125, 255, 0.6)',
          backgroundColor: 'rgba(90, 24, 154, 0.25)',
          color: '#ffffff',
          boxShadow: '0 0 20px rgba(157, 78, 221, 0.35)',
          stagger: 0.08,
          duration: 0.3,
        },
        0.6
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="scene-detective"
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-between overflow-hidden bg-[#040407] select-none pt-16 pb-10"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_45%,rgba(55,15,90,0.2)_0%,rgba(6,6,10,0.95)_65%,#040407_100%)] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-20 text-center max-w-3xl px-6 pointer-events-none shrink-0 mb-4">
        <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-purple-300 uppercase mb-2">
          <Eye className="w-3.5 h-3.5 text-purple-400" />
          <span>PHASE 03 · DETECTIVE AI &bull; .GRN SHAPE QUERY</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight mb-2">
          EXTRACT THE SHAPE.
        </h2>
        <p className="font-sans text-xs sm:text-sm text-zinc-400 font-light max-w-xl mx-auto">
          Don’t describe every accidental instruction. <span className="text-white font-normal">Describe the mathematical shape.</span>
        </p>
      </div>

      {/* Interactive Main Transformation Stage: Code &rarr; Graph &rarr; .grn Query */}
      <div className="relative z-10 w-full max-w-6xl px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto">
        {/* Left Column: Raw Code Decomposing (Col 1-4) */}
        <div
          ref={codePanelRef}
          className="lg:col-span-4 p-4 rounded-lg bg-[#090910]/90 border border-white/[0.08] shadow-2xl backdrop-blur-md font-mono text-xs text-zinc-300 transition-all duration-300"
        >
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-[10px] tracking-widest text-zinc-400 uppercase">RAW INPUT · DECOMPOSING</span>
            </div>
            <span className="text-[9px] text-zinc-600">ast.py</span>
          </div>

          <div className="space-y-1.5 text-[11px] text-zinc-400">
            <div className="text-zinc-600">01 | import numpy as np</div>
            <div className="text-zinc-300">02 | def solve(graph_state, constraint):</div>
            <div className="text-purple-300 pl-4">03 |   # Target: morphisms & types</div>
            <div className="text-zinc-300 pl-4">
              04 |   X = extract_topology(graph_state)
            </div>
            <div className="text-zinc-300 pl-4">
              05 |   f = map_transform(X, constraint)
            </div>
            <div className="text-zinc-400 pl-4">
              06 |   assert verify_homomorphism(f, X)
            </div>
            <div className="text-zinc-300 pl-4">07 |   return f(X)</div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-zinc-500">
            <span>ENTROPY: REDUCING</span>
            <span className="text-purple-400">&Delta; &rarr; GRAPH</span>
          </div>
        </div>

        {/* Center: Morphic Graph & Topological Projection (Col 5-8) */}
        <div className="lg:col-span-4 h-[280px] md:h-[320px] relative flex items-center justify-center">
          <svg
            ref={graphSvgRef}
            viewBox="0 0 400 400"
            className="w-full h-full overflow-visible pointer-events-none"
          >
            <defs>
              <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9d4edd" />
                <stop offset="100%" stopColor="#c77dff" />
              </linearGradient>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#c77dff" />
              </marker>
            </defs>

            {/* Directional Category Edges / Morphisms */}
            <line
              className="graph-edge"
              x1="200"
              y1="60"
              x2="100"
              y2="180"
              stroke="url(#edgeGrad)"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              strokeDasharray="400"
            />
            <line
              className="graph-edge"
              x1="200"
              y1="60"
              x2="300"
              y2="180"
              stroke="url(#edgeGrad)"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              strokeDasharray="400"
            />
            <line
              className="graph-edge"
              x1="100"
              y1="180"
              x2="200"
              y2="320"
              stroke="url(#edgeGrad)"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              strokeDasharray="400"
            />
            <line
              className="graph-edge"
              x1="300"
              y1="180"
              x2="200"
              y2="320"
              stroke="url(#edgeGrad)"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              strokeDasharray="400"
            />
            <line
              className="graph-edge"
              x1="100"
              y1="180"
              x2="300"
              y2="180"
              stroke="rgba(199, 125, 255, 0.4)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />

            {/* Nodes (Objects) */}
            {/* Top Root Node A */}
            <g className="graph-node" transform="translate(200, 60)">
              <circle r="14" fill="#0d0d17" stroke="#c77dff" strokeWidth="2.5" className="glow-violet-sm" />
              <circle r="4" fill="#ffffff" />
            </g>
            {/* Left Node B */}
            <g className="graph-node" transform="translate(100, 180)">
              <circle r="12" fill="#0d0d17" stroke="#9d4edd" strokeWidth="2" />
              <circle r="3.5" fill="#c77dff" />
            </g>
            {/* Right Node C */}
            <g className="graph-node" transform="translate(300, 180)">
              <circle r="12" fill="#0d0d17" stroke="#9d4edd" strokeWidth="2" />
              <circle r="3.5" fill="#c77dff" />
            </g>
            {/* Target Node D */}
            <g className="graph-node" transform="translate(200, 320)">
              <circle r="15" fill="#0d0d17" stroke="#e0aaff" strokeWidth="2.5" className="glow-violet-lg" />
              <circle r="5" fill="#a855f7" />
            </g>

            {/* Morphism Mathematical Labels */}
            <text x="135" y="110" className="morphism-label" fill="#c77dff" fontSize="11" fontFamily="JetBrains Mono">
              f : A &rarr; B
            </text>
            <text x="255" y="110" className="morphism-label" fill="#c77dff" fontSize="11" fontFamily="JetBrains Mono">
              g : A &rarr; C
            </text>
            <text x="130" y="270" className="morphism-label" fill="#a855f7" fontSize="11" fontFamily="JetBrains Mono">
              &phi;
            </text>
            <text x="260" y="270" className="morphism-label" fill="#a855f7" fontSize="11" fontFamily="JetBrains Mono">
              &psi;
            </text>
            <text x="185" y="170" className="morphism-label" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="JetBrains Mono">
              h
            </text>
          </svg>
        </div>

        {/* Right Column: Abstract .grn Shape Specification (Col 9-12) */}
        <div
          ref={grnQueryPanelRef}
          className="lg:col-span-4 p-4 rounded-lg bg-[#0b0b14]/95 border border-purple-500/30 shadow-[0_0_40px_rgba(90,24,154,0.3)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-purple-500/20">
            <div className="flex items-center gap-2">
              <Binary className="w-4 h-4 text-purple-400" />
              <span className="font-mono text-xs tracking-wider text-purple-200 font-semibold uppercase">
                .GRN SHAPE QUERY
              </span>
            </div>
            <span className="font-mono text-[9px] text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/40">
              SPECIFIED
            </span>
          </div>

          {/* Morphism & Category Theory Entities */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="category-tag p-1.5 rounded bg-black/60 border border-white/[0.08] text-center font-mono text-[10px] text-zinc-400">
              <span className="block text-[8px] text-zinc-500">PRIMITIVE</span>
              OBJECT
            </div>
            <div className="category-tag p-1.5 rounded bg-black/60 border border-white/[0.08] text-center font-mono text-[10px] text-zinc-400">
              <span className="block text-[8px] text-zinc-500">MAPPING</span>
              MORPHISM
            </div>
            <div className="category-tag p-1.5 rounded bg-black/60 border border-white/[0.08] text-center font-mono text-[10px] text-zinc-400">
              <span className="block text-[8px] text-zinc-500">SOURCE</span>
              DOMAIN
            </div>
            <div className="category-tag p-1.5 rounded bg-black/60 border border-white/[0.08] text-center font-mono text-[10px] text-zinc-400">
              <span className="block text-[8px] text-zinc-500">TARGET</span>
              CODOMAIN
            </div>
          </div>

          <div className="font-mono text-xs text-zinc-300 bg-black/70 p-2.5 rounded border border-white/[0.05] space-y-1">
            <div className="text-purple-400 text-[10px]"># STRUCTURAL MANIFEST</div>
            <div className="text-zinc-400 text-[11px]">shape <span className="text-white">IsomorphicLattice</span> {'{'}</div>
            <div className="pl-3 text-zinc-300 text-[11px]">vertices: 4</div>
            <div className="pl-3 text-zinc-300 text-[11px]">morphisms: [f, g, h, &phi;, &psi;]</div>
            <div className="pl-3 text-purple-300 text-[11px]">commutativity: &phi; &comp; f == &psi; &comp; g</div>
            <div className="text-zinc-400 text-[11px]">{'}'}</div>
          </div>
        </div>
      </div>

      {/* Bottom Pipeline Progress Bar */}
      <div className="relative z-20 flex items-center gap-3 font-mono text-[10px] text-zinc-500 shrink-0">
        <span>RAW CODE</span>
        <ArrowRight className="w-3 h-3 text-purple-400" />
        <span className="text-purple-300 font-semibold">STRUCTURAL ANALYSIS</span>
        <ArrowRight className="w-3 h-3 text-purple-400" />
        <span className="text-purple-200">.GRN SHAPE QUERY</span>
      </div>
    </section>
  );
}
