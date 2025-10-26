// Types related to the data structure of the all the details about stories
export interface User {
  id: string;
  username: string;
  profileImage: string;
  isVerified?: boolean;
}

export interface StoryViewer {
  userId: string;
  username: string;
  profileImage: string;
  viewedAt: number;
}

export interface Story {
  id: string;
  userId: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  duration: number;
  createdAt: number;
  viewers: StoryViewer[];
}

export interface UserStories {
  user: User;
  stories: Story[];
  hasActiveStories: boolean;
  lastUpdated: number;
}

export interface StorySchema {
  "@context": string;
  "@type": string;
  author: {
    "@type": string;
    name: string;
    image: string;
  };
  datePublished: string;
  image: string;
  description: string;
}

// Types related to story view components
export interface StoryViewersProps {
  viewers: StoryViewer[];
  onClose: () => void;
}

export interface StoryViewerProps {
  userStories: UserStories;
  allUsers: UserStories[];
}

export interface StoryProgressProps {
  segments: number;
  currentSegment: number;
  isPaused: boolean;
  duration: number;
}

export interface StoriesBarProps {
  users: UserStories[];
}

export interface StoryViewerWrapperProps {
  userStories: UserStories;
  allUsers: UserStories[];
}

// Type related to page
export interface PageProps {
  params: {
    userId: string;
  };
}