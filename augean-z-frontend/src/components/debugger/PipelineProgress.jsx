import React from 'react';
import { Check, AlertCircle, Loader2 } from 'lucide-react';
import { PIPELINE_STAGES } from '../../services/analysisService';

export default function PipelineProgress({
  currentStageIndex,
  stageStatus, // 'idle' | 'processing' | 'completed' | 'failed'
  failedStage,
  statusMessage,
}) {
  return (
    <div className="w-full bg-[#08080e] border border-white/[0.06] rounded-lg p-3 select-none">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
          <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
            AUTHORITATIVE PIPELINE PROGRESS
          </span>
        </div>
        <span className="font-mono text-[10px] text-zinc-500">
          {stageStatus === 'idle'
            ? 'STANDBY'
            : stageStatus === 'processing'
            ? `STAGE ${currentStageIndex + 1}/${PIPELINE_STAGES.length}`
            : stageStatus === 'completed'
            ? '10/10 CERTIFIED'
            : 'PIPELINE HALTED'}
        </span>
      </div>

      {/* Pipeline Track (Horizontal Scroll on Mobile / Flex Grid on Desktop) */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 scrollbar-none">
        {PIPELINE_STAGES.map((stage, idx) => {
          const isCurrent = currentStageIndex === idx && stageStatus === 'processing';
          const isCompleted = currentStageIndex > idx || (currentStageIndex === idx && stageStatus === 'completed');
          const isFailed = failedStage === stage.id && stageStatus === 'failed';
          const isPending = !isCurrent && !isCompleted && !isFailed;

          return (
            <div
              key={stage.id}
              className="flex-1 min-w-[95px] flex flex-col items-center text-center relative group"
            >
              {/* Connecting line between stages */}
              {idx > 0 && (
                <div
                  className={`absolute top-3 right-1/2 left-[-50%] h-[1px] -z-0 transition-colors duration-300 ${
                    isCompleted
                      ? 'bg-purple-500/60'
                      : isFailed
                      ? 'bg-red-500/60'
                      : 'bg-white/[0.04]'
                  }`}
                />
              )}

              {/* Stage Node Icon / Dot */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[9px] z-10 transition-all duration-300 ${
                  isCurrent
                    ? 'bg-purple-900 border-2 border-purple-400 text-white shadow-[0_0_15px_#9d4edd] scale-110'
                    : isCompleted
                    ? 'bg-purple-950/60 border border-purple-500/50 text-purple-200'
                    : isFailed
                    ? 'bg-red-950 border-2 border-red-500 text-red-200 shadow-[0_0_15px_#ef4444]'
                    : 'bg-[#0f0f18] border border-white/[0.08] text-zinc-600'
                }`}
              >
                {isCurrent ? (
                  <Loader2 className="w-3 h-3 animate-spin text-purple-300" />
                ) : isCompleted ? (
                  <Check className="w-3 h-3 text-purple-300" />
                ) : isFailed ? (
                  <AlertCircle className="w-3 h-3 text-red-400" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>

              {/* Stage Title */}
              <span
                className={`font-mono text-[9px] mt-1.5 uppercase tracking-wider transition-colors truncate max-w-[90px] ${
                  isCurrent
                    ? 'text-purple-300 font-bold'
                    : isCompleted
                    ? 'text-zinc-300'
                    : isFailed
                    ? 'text-red-400 font-bold'
                    : 'text-zinc-600'
                }`}
                title={stage.label}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Active Stage Live Telemetry Banner */}
      <div className="mt-2.5 pt-2 border-t border-white/[0.05] flex items-center justify-between font-mono text-[10px]">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">ACTIVE LOG:</span>
          <span
            className={
              stageStatus === 'failed'
                ? 'text-red-400 font-medium'
                : stageStatus === 'processing'
                ? 'text-purple-300'
                : stageStatus === 'completed'
                ? 'text-emerald-400'
                : 'text-zinc-500'
            }
          >
            {statusMessage || 'Ready to analyze.'}
          </span>
        </div>

        {stageStatus === 'completed' && (
          <span className="text-emerald-400 flex items-center gap-1 font-semibold">
            <Check className="w-3 h-3" /> INVARIANTS GUARANTEED
          </span>
        )}
      </div>
    </div>
  );
}
