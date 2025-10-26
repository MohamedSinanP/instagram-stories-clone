'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { StoryViewerProps } from '@/types/story';
import StoryProgress from './StoryProgress';
import StoryViewers from './StoryViewers';
import { addStoryView, getStoryViewers } from '@/lib/sessionStorage';
import { getTimeAgo } from '@/utils/metadata';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function StoryViewer({ userStories, allUsers }: StoryViewerProps) {
  const router = useRouter();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showViewers, setShowViewers] = useState(false);
  const [viewers, setViewers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentStory = userStories.stories[currentStoryIndex];
  const currentUserIndex = allUsers.findIndex(u => u.user.id === userStories.user.id);

  const goToNextStory = useCallback(() => {
    if (currentStoryIndex < userStories.stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setIsLoading(true);
    } else {
      // Go to next user's stories
      if (currentUserIndex < allUsers.length - 1) {
        const nextUser = allUsers[currentUserIndex + 1];
        router.push(`/stories/${nextUser.user.id}`);
      } else {
        router.push('/');
      }
    }
  }, [currentStoryIndex, userStories.stories.length, currentUserIndex, allUsers, router]);

  const goToPreviousStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setIsLoading(true);
    } else {
      // Go to previous user's stories
      if (currentUserIndex > 0) {
        const prevUser = allUsers[currentUserIndex - 1];
        router.push(`/stories/${prevUser.user.id}`);
      }
    }
  }, [currentStoryIndex, currentUserIndex, allUsers, router]);

  // Handle loading state
  useEffect(() => {
    if (currentStory) {
      setIsLoading(true);
      setIsPaused(true);

      // Simulate loading time (2 seconds)
      const loadingTimer = setTimeout(() => {
        setIsLoading(false);
        setIsPaused(false);
        addStoryView(currentStory.id);
        const storyViewers = getStoryViewers(currentStory.id);
        setViewers(storyViewers);
      }, 2000);

      return () => {
        clearTimeout(loadingTimer);
      };
    }
  }, [currentStoryIndex, currentStory]);

  // Handle story timer
  useEffect(() => {
    if (!isPaused && !isLoading && currentStory) {
      timerRef.current = setTimeout(() => {
        goToNextStory();
      }, currentStory.duration);

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }
  }, [currentStoryIndex, isPaused, isLoading, currentStory, goToNextStory]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isLoading) return; // Don't allow navigation while loading

    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const halfWidth = rect.width / 2;

    if (clickX < halfWidth) {
      goToPreviousStory();
    } else {
      goToNextStory();
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isLoading) return;

    if (e.key === 'ArrowRight') {
      goToNextStory();
    } else if (e.key === 'ArrowLeft') {
      goToPreviousStory();
    } else if (e.key === 'Escape') {
      router.push('/');
    }
  }, [goToNextStory, goToPreviousStory, router, isLoading]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!currentStory) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Story Container */}
      <div
        ref={containerRef}
        className="relative w-full h-full md:w-[500px] md:h-[calc(100vh-40px)] md:rounded-lg overflow-hidden cursor-pointer story-background"
        onClick={handleClick}
        onMouseDown={() => !isLoading && setIsPaused(true)}
        onMouseUp={() => !isLoading && setIsPaused(false)}
        onTouchStart={() => !isLoading && setIsPaused(true)}
        onTouchEnd={() => !isLoading && setIsPaused(false)}
      >
        {/* Progress Bars */}
        <div className="absolute top-0 left-0 right-0 pt-3 z-20">
          <StoryProgress
            segments={userStories.stories.length}
            currentSegment={currentStoryIndex}
            isPaused={isPaused || isLoading}
            duration={currentStory.duration}
          />
        </div>

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 pt-8 px-4 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={userStories.user.profileImage}
                alt={userStories.user.username}
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <span className="text-white font-semibold text-sm">
                {userStories.user.username}
              </span>
              {userStories.user.isVerified && (
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              <span className="text-white/70 text-xs">
                {getTimeAgo(currentStory.createdAt)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {!isLoading && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPaused(!isPaused);
                    }}
                    className="text-white hover:text-white/70 transition-colors p-1"
                  >
                    {isPaused ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPaused(true);
                    }}
                    className="text-white hover:text-white/70 transition-colors p-1"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </>
              )}

              <Link
                href="/"
                onClick={(e) => e.stopPropagation()}
                className="text-white hover:text-white/70 transition-colors p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Story Image */}
        <img
          src={currentStory.mediaUrl}
          alt="Story"
          className={`w-full h-full object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'
            }`}
          draggable={false}
        />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="relative">
              {/* Spinning Circle */}
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        {!isLoading && (
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Send message"
                className="flex-1 bg-transparent border border-white/50 rounded-full px-4 py-2 text-white placeholder-white/70 outline-none focus:border-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPaused(true);
                }}
                className="text-white hover:text-white/70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowViewers(true);
                  setIsPaused(true);
                }}
                className="text-white hover:text-white/70 transition-colors flex items-center gap-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {viewers.length > 0 && (
                  <span className="text-sm">{viewers.length}</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Navigation Areas Indicator (visible on hover) */}
        {!isLoading && (
          <div className="absolute inset-0 flex pointer-events-none">
            <div className="w-1/2 h-full hover:bg-white/5 pointer-events-auto" />
            <div className="w-1/2 h-full hover:bg-white/5 pointer-events-auto" />
          </div>
        )}
      </div>

      {/* Viewers Modal */}
      {showViewers && (
        <StoryViewers
          viewers={viewers}
          onClose={() => {
            setShowViewers(false);
            setIsPaused(false);
          }}
        />
      )}
    </div>
  );
}