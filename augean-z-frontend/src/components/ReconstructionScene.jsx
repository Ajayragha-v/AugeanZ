import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefreshCw, CheckCircle, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ReconstructionScene() {
  const containerRef = useRef(null);
  const codeCardRef = useRef(null);
  const execCardRef = useRef(null);

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

      // 1. Structural graph collapses into Python synthesis
      tl.fromTo(
        codeCardRef.current,
        { y: 40, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' },
        0.1
      );

      // 2. Syntax code lines illuminate progressively
      tl.fromTo(
        '.code-line-synth',
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, stagger: 0.05, duration: 0.35, ease: 'power1.out' },
        0.2
      );

      // 3. Execution Terminal slides up and executes tests
      tl.fromTo(
        execCardRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' },
        0.4
      );

      // 4. Test success checks illuminate in green & purple
      tl.fromTo(
        '.test-badge',
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.08, duration: 0.3, ease: 'back.out(1.4)' },
        0.6
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="scene-reconstruction"
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-between overflow-hidden bg-[#030306] select-none pt-14 pb-8"
    >
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(60,20,105,0.2)_0%,rgba(5,5,8,0.95)_70%,#030306_100%)] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-20 text-center max-w-3xl px-6 pointer-events-none shrink-0 mb-2">
        <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-purple-300 uppercase mb-1.5">
          <RefreshCw className="w-3.5 h-3.5 text-purple-400" />
          <span>PHASE 06 · STRUCTURAL RECONSTRUCTION &bull; EXECUTION</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight mb-2">
          FROM VERIFIED STRUCTURE BACK TO CODE.
        </h2>
        <p className="font-sans text-xs sm:text-sm text-zinc-400 font-light max-w-xl mx-auto">
          Abstract morphisms and certified proofs synthesize into clean, idiomatic Python—mathematically guaranteed to satisfy invariants.
        </p>
      </div>

      {/* Reconstruction & Execution Twin Chamber */}
      <div className="relative z-10 w-full max-w-6xl px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto">
        {/* Left: Reconstructed Clean Python Code (Col 1-7) */}
        <div
          ref={codeCardRef}
          className="lg:col-span-7 p-5 rounded-lg bg-[#080812]/95 border border-purple-500/30 shadow-[0_0_40px_rgba(90,24,154,0.3)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-purple-500/20 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <span className="text-white font-medium">SYNTHESIZED_CANONICAL.PY</span>
            </div>
            <span className="text-[10px] text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/40">
              STRUCTURALLY SOUND
            </span>
          </div>

          {/* Clean Synthesized Code */}
          <pre className="font-mono text-xs text-zinc-300 bg-black/80 p-3.5 rounded border border-white/[0.05] leading-relaxed overflow-x-hidden">
            <div className="code-line-synth text-zinc-500 text-[11px]"># Certified under Lean 4 Theorem: canonical_soundness</div>
            <div className="code-line-synth text-purple-400">from <span className="text-zinc-200">typing</span> import <span className="text-purple-300">TypeVar, Generic</span></div>
            <div className="code-line-synth text-purple-400">from <span className="text-zinc-200">dataclasses</span> import <span className="text-purple-300">dataclass</span></div>
            <div className="code-line-synth">{'\n'}</div>
            <div className="code-line-synth"><span className="text-purple-400">@dataclass(frozen=True)</span></div>
            <div className="code-line-synth"><span className="text-purple-400">class</span> <span className="text-white font-semibold">VerifiedLattice</span>:</div>
            <div className="code-line-synth pl-4">vertices: <span className="text-purple-300">tuple[int, ...]</span></div>
            <div className="code-line-synth pl-4">morphism_map: <span className="text-purple-300">dict[str, callable]</span></div>
            <div className="code-line-synth">{'\n'}</div>
            <div className="code-line-synth pl-4"><span className="text-purple-400">def</span> <span className="text-white font-semibold">execute_morphism</span>(self, state: dict) -&gt; dict:</div>
            <div className="code-line-synth pl-8"><span className="text-zinc-500"># Guaranteed terminating execution with zero side-effects</span></div>
            <div className="code-line-synth pl-8">result = {'{'}k: self.morphism_map[k](v) <span className="text-purple-400">for</span> k, v <span className="text-purple-400">in</span> state.items(){'}'}</div>
            <div className="code-line-synth pl-8"><span className="text-purple-400">return</span> result</div>
          </pre>
        </div>

        {/* Right: Runtime Execution & Test Terminal (Col 8-12) */}
        <div
          ref={execCardRef}
          className="lg:col-span-5 p-5 rounded-lg bg-[#07070e]/95 border border-white/[0.08] shadow-2xl backdrop-blur-xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/[0.06] font-mono text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-zinc-300">EXECUTION ENVIRONMENT</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                0 ERRORS
              </span>
            </div>

            {/* Test Suite Badges */}
            <div className="space-y-2.5">
              <div className="test-badge p-2.5 rounded bg-black/60 border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-mono text-xs text-zinc-300">HOMOMORPHISM TEST</span>
                </div>
                <span className="font-mono text-xs text-emerald-400 font-semibold">PASS (0.8ms)</span>
              </div>

              <div className="test-badge p-2.5 rounded bg-black/60 border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-mono text-xs text-zinc-300">COMMUTATIVITY CHECK</span>
                </div>
                <span className="font-mono text-xs text-emerald-400 font-semibold">PASS (0.4ms)</span>
              </div>

              <div className="test-badge p-2.5 rounded bg-black/60 border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-mono text-xs text-zinc-300">INVARIANT SOUNDNESS</span>
                </div>
                <span className="font-mono text-xs text-purple-300 font-semibold">100% PROVED</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] font-mono text-xs text-zinc-400 space-y-1">
            <div className="flex justify-between">
              <span>LEAN 4 WITNESS:</span>
              <span className="text-purple-300">Kernel.Verified</span>
            </div>
            <div className="flex justify-between">
              <span>OUTPUT STATE:</span>
              <span className="text-emerald-400 font-medium">&bull; DETERMINISTIC &amp; SOUND</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry */}
      <div className="relative z-20 flex items-center gap-3 font-mono text-[10px] text-zinc-500 shrink-0">
        <span>VERIFIED STRUCTURE</span>
        <span className="text-purple-400">&rarr;</span>
        <span>SYNTHESIS</span>
        <span className="text-purple-400">&rarr;</span>
        <span>EXECUTION</span>
        <span className="text-purple-400">&rarr;</span>
        <span className="text-emerald-400 font-medium">&check; CERTIFIED PYTHON OUTPUT</span>
      </div>
    </section>
  );
}
