import { StoryViewer } from '@/types/story';
import { CURRENT_USER_ID, getCurrentUser } from './storyData';

const STORAGE_KEY = 'instagram_story_views';

interface ViewData {
  [storyId: string]: StoryViewer[];
}

export const getStoryViews = (): ViewData => {
  if (typeof window === 'undefined') return {};

  try {
    const data = sessionStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

export const addStoryView = (storyId: string): void => {
  if (typeof window === 'undefined') return;

  const views = getStoryViews();
  const currentUser = getCurrentUser();

  if (!views[storyId]) {
    views[storyId] = [];
  }

  const alreadyViewed = views[storyId].some(v => v.userId === CURRENT_USER_ID);

  if (!alreadyViewed) {
    views[storyId].push({
      userId: CURRENT_USER_ID,
      username: currentUser.username,
      profileImage: currentUser.profileImage,
      viewedAt: Date.now(),
    });

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(views));
  }
};

export const getStoryViewers = (storyId: string): StoryViewer[] => {
  const views = getStoryViews();
  return views[storyId] || [];
};

export const hasViewedStory = (storyId: string): boolean => {
  const viewers = getStoryViewers(storyId);
  return viewers.some(v => v.userId === CURRENT_USER_ID);
};

export const clearAllViews = (): void => {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(STORAGE_KEY);
};