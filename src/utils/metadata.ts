import { Story, User } from '@/types/story';

export const generateStoryMetadata = (user: User, story: Story) => {
  return {
    title: `${user.username}'s Story on Social`,
    description: `View ${user.username}'s latest story. Posted ${getTimeAgo(story.createdAt)}`,
    icons: {
      icon: '/instagram.svg'
    },
    openGraph: {
      title: `${user.username}'s Story`,
      description: `Check out ${user.username}'s latest story on Social`,
      images: [
        {
          url: story.mediaUrl,
          width: 1080,
          height: 1920,
          alt: `${user.username}'s story`,
        },
      ],
      type: 'article',
      publishedTime: new Date(story.createdAt).toISOString(),
      authors: [user.username],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${user.username}'s Story`,
      description: `Check out ${user.username}'s latest story`,
      images: [story.mediaUrl],
    },
  };
};

export const getTimeAgo = (timestamp: number): string => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};