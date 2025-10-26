'use client';

import { StoryProgressProps } from "@/types/story";


export default function StoryProgress({
  segments,
  currentSegment,
  isPaused,
  duration
}: StoryProgressProps) {
  return (
    <div className="flex gap-1 w-full px-2">
      {Array.from({ length: segments }).map((_, index) => (
        <div
          key={index}
          className="h-[2px] bg-white/30 rounded-full flex-1 overflow-hidden"
        >
          <div
            className={`h-full bg-white rounded-full origin-left transition-transform ${index === currentSegment && !isPaused ? 'animate-progress' : ''
              }`}
            style={{
              transform: index < currentSegment ? 'scaleX(1)' : 'scaleX(0)',
              animationDuration: index === currentSegment ? `${duration}ms` : '0ms',
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          />
        </div>
      ))}
    </div>
  );
}