'use client';

import { useEffect, useState } from 'react';
import { StoryViewerWrapperProps, UserStories } from '@/types/story';
import { hasViewedStory } from '@/lib/sessionStorage';
import StoryViewer from './StoryViewer';


export default function StoryViewerWrapper({ userStories, allUsers }: StoryViewerWrapperProps) {
  const [sortedUsers, setSortedUsers] = useState<UserStories[]>(allUsers);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const viewed = new Set<string>();
    allUsers.forEach(userStory => {
      const allViewed = userStory.stories.every(story => hasViewedStory(story.id));
      if (allViewed) {
        viewed.add(userStory.user.id);
      }
    });

    // Sort users: unviewed first, viewed at the end
    const sorted = [...allUsers].sort((a, b) => {
      const aViewed = viewed.has(a.user.id);
      const bViewed = viewed.has(b.user.id);

      if (aViewed === bViewed) return 0;
      return aViewed ? 1 : -1;
    });

    setSortedUsers(sorted);
    setIsReady(true);
  }, [allUsers]);

  // Show the story viewer only after sorting is complete
  if (!isReady) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return <StoryViewer userStories={userStories} allUsers={sortedUsers} />;
}