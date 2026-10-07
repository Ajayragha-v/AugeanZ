import React from 'react';
import { X, ArrowDown, Cpu, ShieldCheck, Binary, Eye, Terminal, Sparkles, Code } from 'lucide-react';

const PIPELINE_STAGES = [
  {
    step: '01',
    title: 'RAW INPUT',
    icon: Code,
    desc: 'Unstructured, messy, or buggy Python code with runtime errors, type violations, or non-deterministic state.',
    tag: 'INPUT SOURCE',
  },
  {
    step: '02',
    title: 'DETECTIVE AI',
    icon: Eye,
    desc: 'Decomposes syntax into algebraic primitives: variables become objects, functions become morphisms.',
    tag: 'AST TOPOLOGY',
  },
  {
    step: '03',
    title: 'STRUCTURAL SHAPE · .GRN QUERY',
    icon: Binary,
    desc: 'Generates a pure mathematical specification (.grn query) asserting domain, codomain, and commutativity constraints.',
    tag: 'CATEGORY THEORY',
  },
  {
    step: '04',
    title: 'JULIA COMPILER · MODEL DISCOVERY',
    icon: Cpu,
    desc: 'High-speed combinatorial state-space solver searches candidate models satisfying the structural shape query.',
    tag: 'SEARCH SPACE',
  },
  {
    step: '05',
    title: 'CANDIDATE MODELS',
    icon: Binary,
    desc: 'Discovers candidate algebraic structures [M₁, M₂, ...] and prunes candidates with cyclic conflicts or unbound states.',
    tag: 'SELECTION',
  },
  {
    step: '06',
    title: 'LEAN 4 FORMAL VERIFICATION',
    icon: ShieldCheck,
    desc: 'Subject candidates to theorem-proving kernel verification. Mathematical proofs of correctness are formally certified.',
    tag: 'KERNEL PROOF',
  },
  {
    step: '07',
    title: 'CERTIFIED MODEL & USER CHOICE',
    icon: Sparkles,
    desc: 'The engineer confirms the optimal certified architecture from formally verified candidates.',
    tag: 'DECISION',
  },
  {
    step: '08',
    title: 'GENERATIVE AI & CLEAN PYTHON',
    icon: Code,
    desc: 'Synthesizes clean, idiomatic, type-annotated Python guaranteed by the Lean 4 proof witness.',
    tag: 'SYNTHESIS',
  },
  {
    step: '09',
    title: 'EXECUTION & TEST SUITE',
    icon: Terminal,
    desc: 'Executes verified bytecode in isolated environment with 100% invariant soundness satisfaction.',
    tag: 'RUNTIME VERIFIED',
  },
];

export default function PipelineModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#090912] border border-purple-500/30 rounded-xl shadow-[0_0_80px_rgba(90,24,154,0.35)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/[0.08] bg-[#0c0c18]">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-sm bg-purple-500 rotate-45" />
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                AUGEAN-Z PIPELINE ARCHITECTURE
              </h3>
              <p className="font-mono text-xs text-zinc-400">
                Formal specification &bull; Mathematical transformation pipeline
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Stage Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {PIPELINE_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <React.Fragment key={stage.step}>
                <div className="p-4 rounded-lg bg-[#0e0e1a]/80 border border-white/[0.06] hover:border-purple-500/40 transition-colors flex items-start gap-4">
                  <div className="p-2.5 rounded bg-purple-950/40 border border-purple-500/30 text-purple-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-purple-400 font-bold">
                          {stage.step}
                        </span>
                        <h4 className="font-display font-semibold text-sm text-white">
                          {stage.title}
                        </h4>
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 bg-black/60 px-2 py-0.5 rounded border border-white/[0.05]">
                        {stage.tag}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                </div>

                {idx < PIPELINE_STAGES.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <ArrowDown className="w-3.5 h-3.5 text-purple-400/50" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.08] bg-[#07070e] flex items-center justify-between font-mono text-xs text-zinc-500">
          <span>THEORETICALLY COMPLETE &bull; FORMALLY VERIFIABLE</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-purple-950/60 border border-purple-500/40 text-purple-200 hover:text-white hover:bg-purple-900/60 transition-colors"
          >
            CLOSE SPECIFICATION
          </button>
        </div>
      </div>
    </div>
  );
}
