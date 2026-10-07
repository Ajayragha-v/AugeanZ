import React, { useRef } from 'react';
import { FileCode, Copy, Sparkles, Check } from 'lucide-react';

export default function CodeEditor({
  code,
  onChange,
  fixedCode,
  isAnalyzing,
  viewMode, // 'editor' | 'diff' | 'fixed'
  setViewMode,
  fileName,
  onApplyFix,
}) {
  const textareaRef = useRef(null);

  const lines = (code || '').split('\n');
  const fixedLines = (fixedCode || '').split('\n');

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#06060a] border border-white/[0.08] rounded-lg overflow-hidden shadow-2xl">
      {/* CODE WORKSPACE TOOLBAR */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0a0a10] border-b border-white/[0.07] select-none text-xs shrink-0">
        {/* Left: Filename & Tab Selectors */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-zinc-200 font-mono">
            <FileCode className="w-4 h-4 text-purple-400" />
            <span className="font-semibold text-white tracking-wide">{fileName}</span>
            <span className="text-[10px] text-zinc-500 uppercase">
              ({viewMode === 'fixed' ? fixedLines.length : lines.length} lines)
            </span>
          </div>

          {/* Mode Switcher: ORIGINAL | SIDE-BY-SIDE DIFF | FIXED CODE */}
          {fixedCode && (
            <div className="flex items-center bg-black/70 rounded p-0.5 border border-white/[0.08] font-mono text-[11px]">
              <button
                onClick={() => setViewMode('editor')}
                className={`px-3 py-1 rounded transition-colors ${
                  viewMode === 'editor'
                    ? 'bg-purple-950/80 text-purple-200 border border-purple-500/40 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                ORIGINAL
              </button>
              <button
                onClick={() => setViewMode('diff')}
                className={`px-3 py-1 rounded transition-colors ${
                  viewMode === 'diff'
                    ? 'bg-purple-950/80 text-purple-200 border border-purple-500/40 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                SIDE-BY-SIDE DIFF
              </button>
              <button
                onClick={() => setViewMode('fixed')}
                className={`px-3 py-1 rounded transition-colors ${
                  viewMode === 'fixed'
                    ? 'bg-purple-950/80 text-purple-200 border border-purple-500/40 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                FIXED CODE
              </button>
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {fixedCode && (
            <button
              onClick={onApplyFix}
              className="px-3.5 py-1.5 rounded bg-purple-950/60 hover:bg-purple-900/70 border border-purple-500/50 text-purple-200 hover:text-white font-mono text-xs flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(157,78,221,0.3)] hover:scale-[1.02]"
              title="Apply fixed code directly into the active editor"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span className="font-semibold tracking-wide">FIX THESE CODES</span>
            </button>
          )}

          <button
            onClick={() => handleCopy(viewMode === 'fixed' ? fixedCode : code)}
            className="p-1.5 rounded hover:bg-white/[0.07] text-zinc-400 hover:text-white transition-colors"
            title="Copy current code to clipboard"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* CODE VIEWPORT (Dominates screen, maximizes vertical space) */}
      <div className="flex-1 relative overflow-auto font-mono text-xs leading-relaxed flex bg-[#050508]">
        {/* VIEW 1: Standard Editable View */}
        {viewMode === 'editor' && (
          <div className="flex-1 flex min-h-full">
            {/* Line Numbers */}
            <div className="w-12 py-3 bg-[#050507] border-r border-white/[0.05] text-right pr-3 select-none text-zinc-600 font-mono shrink-0">
              {lines.map((_, i) => (
                <div key={i} className="h-5 leading-5 text-[11px]">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Editable Text Surface */}
            <div className="flex-1 relative bg-[#06060a]">
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => onChange(e.target.value)}
                disabled={isAnalyzing}
                spellCheck={false}
                className="w-full h-full min-h-[500px] p-3 bg-transparent text-zinc-200 font-mono text-xs leading-5 resize-none focus:outline-none focus:ring-0 selection:bg-purple-900 selection:text-white whitespace-pre tab-4"
                placeholder="Paste Python code or upload a .py file..."
                style={{ tabSize: 4 }}
              />
            </div>
          </div>
        )}

        {/* VIEW 2: Side-By-Side Comparison (BEFORE vs FIXED) */}
        {viewMode === 'diff' && (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-x divide-white/[0.07] min-h-full">
            {/* Left: Original Code */}
            <div className="flex flex-col bg-[#06060a]">
              <div className="px-3 py-1.5 bg-[#09090f] border-b border-white/[0.06] text-[10px] font-mono text-red-400 uppercase tracking-wider flex items-center justify-between shrink-0">
                <span className="flex items-center gap-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  ORIGINAL CODE (BEFORE)
                </span>
                <span className="text-zinc-500">{lines.length} lines</span>
              </div>
              <div className="flex-1 flex overflow-auto">
                <div className="w-10 py-2.5 bg-[#050507] border-r border-white/[0.04] text-right pr-2 text-zinc-600 select-none text-[10px] shrink-0">
                  {lines.map((_, i) => (
                    <div key={i} className="h-5 leading-5">
                      {i + 1}
                    </div>
                  ))}
                </div>
                <pre className="p-2.5 text-zinc-300 text-xs leading-5 overflow-auto flex-1 whitespace-pre">
                  {code}
                </pre>
              </div>
            </div>

            {/* Right: Fixed Reconstructed Code */}
            <div className="flex flex-col bg-[#070710]">
              <div className="px-3 py-1.5 bg-[#0c0c16] border-b border-purple-500/20 text-[10px] font-mono text-emerald-400 uppercase tracking-wider flex items-center justify-between shrink-0">
                <span className="flex items-center gap-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  FIXED CODE (AFTER RECONSTRUCTION)
                </span>
                <span className="text-purple-300">{fixedLines.length} lines</span>
              </div>
              <div className="flex-1 flex overflow-auto bg-emerald-950/[0.07]">
                <div className="w-10 py-2.5 bg-[#06060d] border-r border-white/[0.04] text-right pr-2 text-zinc-600 select-none text-[10px] shrink-0">
                  {fixedLines.map((_, i) => (
                    <div key={i} className="h-5 leading-5">
                      {i + 1}
                    </div>
                  ))}
                </div>
                <pre className="p-2.5 text-emerald-200/95 text-xs leading-5 overflow-auto flex-1 whitespace-pre font-mono">
                  {fixedCode}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: Fixed Code Full Width */}
        {viewMode === 'fixed' && (
          <div className="flex-1 flex min-h-full bg-[#070710]">
            <div className="w-12 py-3 bg-[#050509] border-r border-white/[0.05] text-right pr-3 select-none text-zinc-600 font-mono shrink-0">
              {fixedLines.map((_, i) => (
                <div key={i} className="h-5 leading-5 text-[11px]">
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="flex-1 p-3 overflow-auto bg-emerald-950/[0.06]">
              <pre className="text-emerald-200/95 font-mono text-xs leading-5 whitespace-pre">
                {fixedCode}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
