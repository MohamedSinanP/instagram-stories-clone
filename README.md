# Social Stories - Instagram Stories Clone

A fully functional Instagram-like Stories feature built with Next.js 14, TypeScript, and Tailwind CSS. This project replicates core Instagram story behavior with server-side rendering, SEO optimization, and smooth user interactions.

## Features

### Core Functionality

- **Instagram-like UI** - Pixel-perfect match with Instagram's web interface
- **Tap Navigation** - Tap left/right to navigate between stories
- **Keyboard Controls** - Arrow keys for navigation, Escape to exit
- **Story Progress Bars** - Animated progress indicators for each story
- **Loading States** - 2-second loading spinner for each story
- **Pause/Play** - Hold to pause, release to continue
- **Auto-advance** - Stories automatically progress after duration

### Advanced Features

- **View Tracking** - Session Storage tracks who viewed each story
- **Story Viewers List** - See who viewed your stories
- **Active/Inactive States** - Color-coded story rings (gradient for unviewed, gray for viewed)
- **Smart Sorting** - Unviewed stories appear first, viewed stories move to the end
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **Scrollable Stories Bar** - Horizontal scroll

### Technical Excellence

- **Server-Side Rendering (SSR)** - Fast initial load and SEO-friendly
- **SEO Optimized** - Open Graph tags, Twitter cards
- **Static Site Generation** - Pre-renders story pages at build time
- **Type Safety** - Full TypeScript implementation
- **Performance Optimized** - Efficient rendering and state management

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Deployment:** [Vercel](https://vercel.com/)

## Installation

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Clone and Install

```bash
# Clone the repository
git clone https://github.com/MohamedSinanP/instagram-stories-clone.git
cd instagram-stories-clone

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

## Running the Project

### Development Mode

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build the project
npm run build

# Start production server
npm run start
```

### Export Static Site

```bash
npm run build
```

The static files will be in the `out` directory.

## Project Structure

```
instagram-stories-clone/
├── public/
│   ├── instagram.svg          # App logo
│
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page (SSR)
│   │   ├── globals.css        # Global styles
│   │   └── stories/
│   │       └── [userId]/
│   │           └── page.tsx   # Story page (SSR)
│   ├── components/
│   │   ├── StoriesBar.tsx     # Stories carousel
│   │   ├── StoryViewer.tsx    # Story viewer component
│   │   ├── StoryViewerWrapper.tsx  # Client wrapper for sorting
│   │   ├── StoryProgress.tsx  # Progress bar component
│   │   └── StoryViewers.tsx   # Viewers modal
│   ├── lib/
│   │   ├── storyData.ts       # Mock story data
│   │   └── sessionStorage.ts  # Session storage utilities
│   ├── types/
│   │   └── story.ts           # TypeScript type definitions
│   └── utils/
│       └── metadata.ts        # SEO metadata helpers
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Key Components

### 1. StoriesBar Component

Displays horizontal scrollable list of user stories with:

- Gradient ring for unviewed stories
- Gray ring for viewed stories
- Auto-sorting (unviewed first)
- Scroll arrows on hover

### 2. StoryViewer Component

Main story viewing interface with:

- Full-screen story display
- Progress bars for each story
- Tap/click navigation
- Pause on hold
- Bottom action bar (message, like, viewers)

### 3. StoryProgress Component

Animated progress bars showing:

- Current story position
- Story duration countdown
- Pause/resume state

### 4. StoryViewers Component

Modal showing:

- List of users who viewed the story
- Profile pictures and usernames
- Time since viewing

## Data Schema

### User Schema

```typescript
interface User {
  id: string;
  username: string;
  profileImage: string;
  isVerified?: boolean;
}
```

### Story Schema

```typescript
interface Story {
  id: string;
  userId: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  duration: number;
  createdAt: number;
  viewers: StoryViewer[];
}
```

### Story Viewer Schema

```typescript
interface StoryViewer {
  userId: string;
  username: string;
  profileImage: string;
  viewedAt: number;
}
```

### User Stories Schema

```typescript
interface UserStories {
  user: User;
  stories: Story[];
  hasActiveStories: boolean;
  lastUpdated: number;
}
```

## Customization

### Adding Your Own Stories

Edit `src/lib/storyData.ts`:

```typescript
export const mockUsers: UserStories[] = [
  {
    user: {
      id: "user1",
      username: "your_username",
      profileImage: "https://your-image-url.com/photo.jpg",
      isVerified: true,
    },
    hasActiveStories: true,
    lastUpdated: Date.now(),
    stories: [
      {
        id: "story1",
        userId: "user1",
        mediaUrl: "https://your-story-image.com/image.jpg",
        mediaType: "image",
        duration: 5000,
        createdAt: Date.now(),
        viewers: [],
      },
    ],
  },
  // Add more users...
];
```

### Changing Current User

Edit `src/lib/storyData.ts`:

```typescript
export const CURRENT_USER_ID = "your_user_id";

export const getCurrentUser = () => ({
  id: CURRENT_USER_ID,
  username: "Your Name",
  profileImage: "https://your-profile-image.com/photo.jpg",
});
```

### Customizing Story Duration

Change the `duration` property in story objects (in milliseconds):

- 3 seconds: `3000`
- 5 seconds: `5000`
- 10 seconds: `10000`

### Customizing Loading Time

Edit `src/components/StoryViewer.tsx`:

```typescript
// Change 2000 to your desired loading time (in milliseconds)
const loadingTimer = setTimeout(() => {
  setIsLoading(false);
  setIsPaused(false);
}, 2000);
```

## 🎮 User Controls

### Navigation

- **Tap/Click Right** → Next story or next user's stories
- **Tap/Click Left** → Previous story or previous user's stories
- **Arrow Right** → Next story
- **Arrow Left** → Previous story
- **Escape** → Exit to home
- **Hold/Press** → Pause story
- **Release** → Resume story

### Actions

- **Click Profile** → View story from that user
- **Click Viewers Icon** → See who viewed the story
- **Click Close (×)** → Return to home
- **Click Pause Button** → Pause/resume playback

## License

This project is licensed under the MIT License

## Author

**Mohamed Sinan P**

- GitHub: [@Mohamed Sinan P](https://github.com/MohamedSinanP)
- Email: mohamedsinanp8@gmail.com
