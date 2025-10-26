import { UserStories } from '@/types/story';

export const CURRENT_USER_ID = 'user8';

export const mockUsers: UserStories[] = [
  {
    user: {
      id: 'user1',
      username: 'Social',
      profileImage: '/instagram.svg',
      isVerified: true,
    },
    hasActiveStories: true,
    lastUpdated: Date.now() - 3600000,
    stories: [
      {
        id: 'story1',
        userId: 'user1',
        mediaUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        mediaType: 'image',
        duration: 5000,
        createdAt: Date.now() - 3600000,
        viewers: [],
      },
      {
        id: 'story2',
        userId: 'user1',
        mediaUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
        mediaType: 'image',
        duration: 5000,
        createdAt: Date.now() - 3000000,
        viewers: [],
      },
      {
        id: 'story3',
        userId: 'user1',
        mediaUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800',
        mediaType: 'image',
        duration: 5000,
        createdAt: Date.now() - 2000000,
        viewers: [],
      },
    ],
  },
  {
    user: {
      id: 'user2',
      username: 'janedoe',
      profileImage: 'https://i.pravatar.cc/150?img=5',
    },
    hasActiveStories: true,
    lastUpdated: Date.now() - 7200000,
    stories: [
      {
        id: 'story4',
        userId: 'user2',
        mediaUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
        mediaType: 'image',
        duration: 5000,
        createdAt: Date.now() - 7200000,
        viewers: [],
      },
      {
        id: 'story5',
        userId: 'user2',
        mediaUrl: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800',
        mediaType: 'image',
        duration: 5000,
        createdAt: Date.now() - 6000000,
        viewers: [],
      },
    ],
  },
  {
    user: {
      id: 'user3',
      username: 'traveler_mike',
      profileImage: 'https://i.pravatar.cc/150?img=12',
      isVerified: true,
    },
    hasActiveStories: true,
    lastUpdated: Date.now() - 1800000,
    stories: [
      {
        id: 'story6',
        userId: 'user3',
        mediaUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
        mediaType: 'image',
        duration: 5000,
        createdAt: Date.now() - 1800000,
        viewers: [],
      },
      {
        id: 'story7',
        userId: 'user3',
        mediaUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800',
        mediaType: 'image',
        duration: 5000,
        createdAt: Date.now() - 1200000,
        viewers: [],
      },
      {
        id: 'story8',
        userId: 'user3',
        mediaUrl: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800',
        mediaType: 'image',
        duration: 5000,
        createdAt: Date.now() - 600000,
        viewers: [],
      },
    ],
  },
  {
    user: {
      id: 'user4',
      username: 'foodie_sarah',
      profileImage: 'https://i.pravatar.cc/150?img=32',
    },
    hasActiveStories: true,
    lastUpdated: Date.now() - 900000,
    stories: [
      {
        id: 'story9',
        userId: 'user4',
        mediaUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
        mediaType: 'image',
        duration: 5000,
        createdAt: Date.now() - 900000,
        viewers: [],
      },
    ],
  },
  {
    user: {
      id: 'user5',
      username: 'fitness_alex',
      profileImage: 'https://i.pravatar.cc/150?img=8',
      isVerified: true,
    },
    hasActiveStories: true,
    lastUpdated: Date.now() - 5400000,
    stories: [
      {
        id: 'story10',
        userId: 'user5',
        mediaUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
        mediaType: 'image',
        duration: 5000,
        createdAt: Date.now() - 5400000,
        viewers: [],
      },
      {
        id: 'story11',
        userId: 'user5',
        mediaUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
        mediaType: 'image',
        duration: 5000,
        createdAt: Date.now() - 4800000,
        viewers: [],
      },
    ],
  },
];

export const getCurrentUser = () => ({
  id: CURRENT_USER_ID,
  username: 'Mohamed Sinan P',
  profileImage: 'https://i.pravatar.cc/150?img=50',
});