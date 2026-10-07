import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Check, Award, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function VerificationScene() {
  const containerRef = useRef(null);
  const chamberRef = useRef(null);
  const [selectedModel, setSelectedModel] = useState('M1');

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

      // 1. Enter Lean 4 verification chamber
      tl.fromTo(
        chamberRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' },
        0.1
      );

      // 2. Sequential Proof Verification Checks
      tl.fromTo(
        '.proof-step',
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.35, ease: 'power2.out' },
        0.2
      );

      // 3. Purple verification lock-in pulse
      tl.to(
        '.kernel-badge',
        {
          borderColor: 'rgba(199, 125, 255, 0.9)',
          boxShadow: '0 0 35px rgba(157, 78, 221, 0.55)',
          color: '#ffffff',
          duration: 0.35,
        },
        0.6
      );

      // 4. Reveal Certified Candidates for User Selection
      tl.fromTo(
        '.user-choice-panel',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
        0.65
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="scene-verification"
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-between overflow-hidden bg-[#020204] select-none pt-14 pb-8"
    >
      {/* Background radial spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(65,20,110,0.2)_0%,rgba(4,4,7,0.95)_65%,#020204_100%)] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-20 text-center max-w-3xl px-6 pointer-events-none shrink-0 mb-2">
        <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-purple-300 uppercase mb-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
          <span>PHASE 05 · LEAN 4 FORMAL VERIFICATION</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight mb-2">
          DISCOVERY IS NOT ENOUGH.
        </h2>
        <p className="font-sans text-xs sm:text-sm text-zinc-400 font-light max-w-xl mx-auto">
          Every candidate must be verified by the Lean 4 formal proof kernel before synthesis.
        </p>
      </div>

      {/* Verification Chamber Layout */}
      <div
        ref={chamberRef}
        className="relative z-10 w-full max-w-6xl px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto"
      >
        {/* Left Column: Lean 4 Proof Engine (Col 1-7) */}
        <div className="lg:col-span-7 p-5 rounded-lg bg-[#070710]/95 border border-purple-500/30 shadow-[0_0_50px_rgba(90,24,154,0.25)] backdrop-blur-xl">
          <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-purple-500/20 font-mono text-xs">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-white font-semibold">LEAN 4 PROOF ASSISTANT</span>
            </div>
            <div className="kernel-badge text-[9px] tracking-widest text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/40">
              KERNEL: CERTIFIED
            </div>
          </div>

          {/* Lean 4 Formal Code Proof */}
          <div className="font-mono text-xs text-zinc-300 bg-black/80 p-3.5 rounded border border-white/[0.06] space-y-1 leading-relaxed overflow-x-hidden">
            <div className="text-zinc-500 text-[11px]">-- Formal verification of candidate M1</div>
            <div>
              <span className="text-purple-400">theorem</span> <span className="text-purple-200">canonical_soundness</span> (L : Lattice M₁) :
            </div>
            <div className="pl-4 text-zinc-400">
              Isomorphic (IR.extract raw_ast) (Model.eval L) :=
            </div>
            <div><span className="text-purple-400">by</span></div>
            <div className="pl-4 text-purple-300">intro h_sound</div>
            <div className="pl-4 text-purple-300">apply CommutativeDiagram.verify</div>
            <div className="pl-4 text-emerald-400 font-semibold">exact Kernel.soundness_witness</div>
            <div className="text-emerald-400 font-mono text-[10px] pt-1 border-t border-emerald-500/20 flex items-center gap-1.5">
              <Check className="w-3 h-3 text-emerald-400" />
              <span>Goals accomplished. [0 warnings, 0 metavariables]</span>
            </div>
          </div>

          {/* Verification Pipeline Checklist */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3.5">
            <div className="proof-step p-2 rounded bg-black/60 border border-white/[0.06] text-center">
              <div className="font-mono text-[8px] text-zinc-500">STAGE 01</div>
              <div className="font-mono text-[10px] text-purple-200 font-medium">TYPE CHECK</div>
              <div className="text-[8px] text-emerald-400 mt-0.5">&bull; PASSED</div>
            </div>
            <div className="proof-step p-2 rounded bg-black/60 border border-white/[0.06] text-center">
              <div className="font-mono text-[8px] text-zinc-500">STAGE 02</div>
              <div className="font-mono text-[10px] text-purple-200 font-medium">STRUCTURAL</div>
              <div className="text-[8px] text-emerald-400 mt-0.5">&bull; PASSED</div>
            </div>
            <div className="proof-step p-2 rounded bg-black/60 border border-white/[0.06] text-center">
              <div className="font-mono text-[8px] text-zinc-500">STAGE 03</div>
              <div className="font-mono text-[10px] text-purple-200 font-medium">FORMAL PROOF</div>
              <div className="text-[8px] text-emerald-400 mt-0.5">&bull; VERIFIED</div>
            </div>
            <div className="proof-step p-2 rounded bg-black/60 border border-purple-500/30 text-center bg-purple-950/20">
              <div className="font-mono text-[8px] text-purple-400">STAGE 04</div>
              <div className="font-mono text-[10px] text-white font-medium">KERNEL LOCK</div>
              <div className="text-[8px] text-purple-300 mt-0.5">&bull; CERTIFIED</div>
            </div>
          </div>
        </div>

        {/* Right Column: User Choice Stage (Col 8-12) */}
        <div className="user-choice-panel lg:col-span-5 p-5 rounded-lg bg-[#090912]/95 border border-white/[0.08] shadow-2xl backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-purple-300 uppercase tracking-widest">
              <Award className="w-3.5 h-3.5 text-purple-400" />
              <span>PROVEN CANDIDATE SPECIFICATIONS</span>
            </div>
            <h3 className="font-display font-semibold text-lg text-white mb-1.5">
              Select Structural Model
            </h3>
            <p className="font-sans text-xs text-zinc-400 mb-4">
              The system has discovered mathematically sound possibilities. You choose the architecture best suited for synthesis.
            </p>

            {/* Candidate Selector Cards */}
            <div className="space-y-2.5">
              {/* Option M1 */}
              <div
                onClick={() => setSelectedModel('M1')}
                className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                  selectedModel === 'M1'
                    ? 'bg-purple-950/40 border-purple-400/80 shadow-[0_0_20px_rgba(157,78,221,0.3)]'
                    : 'bg-black/50 border-white/[0.06] hover:border-white/[0.15]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-white text-base">MODEL M₁</span>
                    <span className="font-mono text-[9px] text-purple-300 bg-purple-900/50 px-1.5 py-0.5 rounded">RECOMMENDED</span>
                  </div>
                  <div className="font-mono text-[10px] text-zinc-400 mt-0.5">Commutative SemiLattice &bull; O(1) Memory</div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedModel === 'M1' ? 'border-purple-400 bg-purple-500 text-white' : 'border-zinc-700'}`}>
                  {selectedModel === 'M1' && <Check className="w-2.5 h-2.5" />}
                </div>
              </div>

              {/* Option M2 */}
              <div
                onClick={() => setSelectedModel('M2')}
                className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                  selectedModel === 'M2'
                    ? 'bg-purple-950/40 border-purple-400/80 shadow-[0_0_20px_rgba(157,78,221,0.3)]'
                    : 'bg-black/50 border-white/[0.06] hover:border-white/[0.15]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-white text-base">MODEL M₂</span>
                    <span className="font-mono text-[9px] text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded">ALTERNATIVE</span>
                  </div>
                  <div className="font-mono text-[10px] text-zinc-400 mt-0.5">Bifunctorial Monoid &bull; Parallel Stream</div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedModel === 'M2' ? 'border-purple-400 bg-purple-500 text-white' : 'border-zinc-700'}`}>
                  {selectedModel === 'M2' && <Check className="w-2.5 h-2.5" />}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-500">STATUS:</span>
            <span className="text-purple-300 flex items-center gap-1.5 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              READY FOR PYTHON RECONSTRUCTION
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
