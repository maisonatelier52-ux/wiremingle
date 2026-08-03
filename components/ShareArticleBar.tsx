"use client";

import { useState, useEffect } from "react";

interface ShareArticleBarProps {
  title: string;
  url?: string;
}

export default function ShareArticleBar({ title, url }: ShareArticleBarProps) {
  const [currentUrl, setCurrentUrl] = useState(url || "");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!url && typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, [url]);

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
  };

  const handleCopyLink = async () => {
    if (typeof window !== "undefined" && currentUrl) {
      try {
        await navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback for older browsers
      }
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          url: currentUrl,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="my-8 py-4 border-t border-b border-dashed border-neutral-300 flex flex-wrap items-center justify-between gap-4 select-none">
      {/* Left: Share text with icon */}
      <button
        onClick={handleNativeShare}
        className="flex items-center gap-2 text-neutral-900 font-bold text-sm md:text-base hover:text-[#E31B23] transition-colors focus:outline-none"
        title="Share article"
      >
        <svg
          className="w-4.5 h-4.5 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
        <span>Share this article</span>
        {copied && (
          <span className="ml-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Link copied!
          </span>
        )}
      </button>

      {/* Right: Social Share Buttons */}
      <div className="flex items-center gap-2 md:gap-2.5">
        {/* Facebook */}
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 flex items-center justify-center transition-colors"
          title="Share on Facebook"
          aria-label="Share on Facebook"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>

        {/* X / Twitter */}
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 flex items-center justify-center transition-colors"
          title="Share on X"
          aria-label="Share on X"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 flex items-center justify-center transition-colors"
          title="Share on LinkedIn"
          aria-label="Share on LinkedIn"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>

        {/* WhatsApp */}
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 flex items-center justify-center transition-colors"
          title="Share on WhatsApp"
          aria-label="Share on WhatsApp"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.099 4.018 4.032-1.057z" />
          </svg>
        </a>

        {/* Reddit */}
        <a
          href={shareLinks.reddit}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 flex items-center justify-center transition-colors"
          title="Share on Reddit"
          aria-label="Share on Reddit"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.363.043-.538A1.758 1.758 0 0 1 4.08 12c0-.968.786-1.754 1.754-1.754.463 0 .88.18 1.186.476 1.185-.845 2.822-1.402 4.629-1.482l.966-4.526 3.2.673c.045-.632.573-1.143 1.195-1.143z" />
          </svg>
        </a>

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className="w-9 h-9 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 flex items-center justify-center transition-colors focus:outline-none"
          title="Copy Link"
          aria-label="Copy Link"
        >
          <svg
            className="w-4 h-4 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
