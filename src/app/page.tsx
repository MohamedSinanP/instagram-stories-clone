import StoriesBar from '@/components/StoriesBar';
import { mockUsers } from '@/lib/storyData';

export const metadata = {
  title: 'Social - Stories',
  description: 'Share your moments with friends through Social Stories',
  icons: {
    icon: '/instagram.svg'
  },
  openGraph: {
    title: 'Social Stories',
    description: 'Share your moments with friends',
    type: 'website',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-instagram-hover">
      {/* Header */}
      <header className="bg-white border-b border-instagram-border sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-[60px] flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Social</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-instagram-hover rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
            <button className="p-2 hover:bg-instagram-hover rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        <StoriesBar users={mockUsers} />

        {/* Feed Placeholder */}
        <div className="mt-6 bg-white border border-instagram-border rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold text-instagram-primary mb-2">
            Welcome to Social Stories
          </h2>
          <p className="text-instagram-secondary">
            Click on any story above to start viewing
          </p>
        </div>
      </main>
    </div>
  );
}