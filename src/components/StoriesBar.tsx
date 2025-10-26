'use client';

import { StoriesBarProps, UserStories } from '@/types/story';
import Link from 'next/link';
import { hasViewedStory } from '@/lib/sessionStorage';
import { useEffect, useState } from 'react';

export default function StoriesBar({ users }: StoriesBarProps) {
  const [viewedStories, setViewedStories] = useState<Set<string>>(new Set());
  const [sortedUsers, setSortedUsers] = useState<UserStories[]>([]);

  useEffect(() => {
    const viewed = new Set<string>();
    users.forEach(userStory => {
      const allViewed = userStory.stories.every(story => hasViewedStory(story.id));
      if (allViewed) {
        viewed.add(userStory.user.id);
      }
    });
    setViewedStories(viewed);

    // Sort users: unviewed first, viewed at the end
    const sorted = [...users].sort((a, b) => {
      const aViewed = viewed.has(a.user.id);
      const bViewed = viewed.has(b.user.id);

      if (aViewed === bViewed) return 0;
      return aViewed ? 1 : -1;
    });

    setSortedUsers(sorted);
  }, [users]);

  return (
    <div className="bg-white border border-instagram-border rounded-lg p-4">
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
        {sortedUsers.map((userStory) => {
          const isViewed = viewedStories.has(userStory.user.id);

          return (
            <Link
              key={userStory.user.id}
              href={`/stories/${userStory.user.id}`}
              className="flex-shrink-0 flex flex-col items-center gap-1 group"
            >
              <div className={`p-[2px] rounded-full bg-gradient-to-tr ${isViewed
                ? 'from-gray-300 to-gray-400'
                : 'from-yellow-400 via-pink-500 to-purple-600'
                }`}
              >
                <div className="bg-white p-[3px] rounded-full">
                  <img
                    src={userStory.user.profileImage}
                    alt={userStory.user.username}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                </div>
              </div>
              <span className={`text-xs max-w-[64px] truncate ${isViewed ? 'text-instagram-secondary' : 'text-instagram-primary'}`}>
                {userStory.user.username}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
