'use client';

import { StoryViewersProps } from '@/types/story';
import { getTimeAgo } from '@/utils/metadata';

export default function StoryViewers({ viewers, onClose }: StoryViewersProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
      <div className="bg-white w-full md:w-[400px] md:rounded-t-xl rounded-t-xl max-h-[70vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-instagram-border">
          <h3 className="font-semibold text-instagram-primary">
            Viewers
          </h3>
          <button
            onClick={onClose}
            className="text-instagram-secondary hover:text-instagram-primary transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Viewers List */}
        <div className="flex-1 overflow-y-auto">
          {viewers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-instagram-secondary">
              <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <p>No views yet</p>
            </div>
          ) : (
            <div className="divide-y divide-instagram-border">
              {viewers.map((viewer) => (
                <div key={viewer.userId} className="flex items-center justify-between p-4 hover:bg-instagram-hover transition-colors">
                  <div className="flex items-center gap-3">
                    <img
                      src={viewer.profileImage}
                      alt={viewer.username}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm text-instagram-primary">
                        {viewer.username}
                      </p>
                      <p className="text-xs text-instagram-secondary">
                        {getTimeAgo(viewer.viewedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}