import { notFound } from 'next/navigation';
import { mockUsers } from '@/lib/storyData';
import StoryViewerWrapper from '@/components/StoryViewerWrapper';
import { generateStoryMetadata } from '@/utils/metadata';
import { PageProps } from '@/types/story';

export async function generateMetadata({ params }: PageProps) {
  const userStories = mockUsers.find(u => u.user.id === params.userId);

  if (!userStories || userStories.stories.length === 0) {
    return {
      title: 'Story Not Found',
    };
  }

  return generateStoryMetadata(userStories.user, userStories.stories[0]);
}

export async function generateStaticParams() {
  return mockUsers.map((user) => ({
    userId: user.user.id,
  }));
}

export default function StoryPage({ params }: PageProps) {
  const userStories = mockUsers.find(u => u.user.id === params.userId);

  if (!userStories) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SocialMediaPosting",
            author: {
              "@type": "Person",
              name: userStories.user.username,
              image: userStories.user.profileImage,
            },
            datePublished: new Date(userStories.stories[0].createdAt).toISOString(),
            image: userStories.stories[0].mediaUrl,
            description: `${userStories.user.username}'s Instagram Story`,
          }),
        }}
      />
      <StoryViewerWrapper userStories={userStories} allUsers={mockUsers} />
    </>
  );
}