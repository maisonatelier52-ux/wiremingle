"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface SearchResultItem {
  category: string;
  title: string;
  slug: string;
  image: string;
  date: string;
  shortdescription: string;
  authorName?: string;
}

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "BUSINESS", href: "/business" },
    { name: "WORLD", href: "/world" },
    { name: "FINANCE", href: "/finance" },
    { name: "TECHNOLOGY", href: "/technology" },
    { name: "POLITICS", href: "/politics" },
    { name: "LIFESTYLE", href: "/lifestyle" },
    { name: "OPINION", href: "/opinion" },
    { name: "INVESTIGATION", href: "/investigation" },
  ];

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  // Live debounced search effect
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }, 150);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside and ESC key handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const isDesktopOutside =
        !desktopSearchRef.current || !desktopSearchRef.current.contains(event.target as Node);
      const isMobileOutside =
        !mobileSearchRef.current || !mobileSearchRef.current.contains(event.target as Node);

      if (isDesktopOutside && isMobileOutside) {
        setIsSearchOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
    }

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen]);

  return (
    <header className="w-full bg-white select-none">
      {/* Top Dark Navy/Slate Strip */}
      <div className="h-[7px] w-full bg-[#374151]" />

      {/* Main Header Container */}
      <div className="border-b-2 border-black bg-white relative">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center px-4 md:px-6">
          
          {/* Left: Hamburger Icon & WM Logo */}
          <div className="flex items-center gap-5 shrink-0">
            {/* Hamburger Icon */}
            <button
              onClick={toggleDrawer}
              className="flex items-center justify-center text-black hover:opacity-80 transition-opacity focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg
                className="h-7 w-7 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.5h18M3 12h18M3 18.5h18" />
              </svg>
            </button>

            {/* Red WM Monogram WebP Logo */}
            <Link href="/" className="flex items-center" aria-label="WM Home">
              <Image
                src="/images/wiremingle-logo.webp"
                alt="WireMingle Logo"
                width={80}
                height={26}
                className="h-6.5 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Category Navigation & Search Container */}
          <div className="hidden lg:flex items-center ml-8 shrink-0 relative">
            <nav className="flex items-center gap-5 xl:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[14.5px] font-bold tracking-wider text-black hover:underline transition-colors whitespace-nowrap leading-none"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Inline Desktop Search Box directly next to INVESTIGATION */}
            <div className="relative ml-3 flex items-center" ref={desktopSearchRef}>
              {!isSearchOpen ? (
                <button
                  onClick={toggleSearch}
                  className="flex items-center justify-center text-black hover:opacity-80 transition-colors focus:outline-none p-1.5 rounded hover:bg-neutral-100"
                  aria-label="Search"
                >
                  <svg
                    className="h-4.5 w-4.5 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.4}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              ) : (
                <div className="relative flex items-center">
                  {/* Inline Search Input Square Box next to INVESTIGATION */}
                  <div className="flex items-center gap-2 bg-white rounded-md px-2.5 py-1 border-2 border-neutral-400 focus-within:border-[#2563EB] shadow-xs w-60 xl:w-72 transition-all">
                    <svg
                      className="h-4 w-4 text-neutral-600 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>

                    <input
                      type="text"
                      placeholder="Search news..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-xs md:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none font-medium"
                      autoFocus
                    />

                    {searchQuery ? (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="text-neutral-400 hover:text-neutral-600 p-0.5 text-xs font-bold"
                        aria-label="Clear text"
                      >
                        ✕
                      </button>
                    ) : null}

                    <button
                      onClick={() => setIsSearchOpen(false)}
                      className="text-neutral-400 hover:text-neutral-700 text-xs font-bold p-0.5"
                      title="Close search"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Search Results Dropdown Box attached directly underneath this search input */}
                  {(searchQuery.trim().length > 0 || isLoading) && (
                    <div className="absolute top-full right-0 mt-2 w-80 md:w-[400px] z-50 bg-[#2563EB] text-white rounded-2xl shadow-2xl border border-blue-400/30 overflow-hidden">
                      {/* Header inside popup with close button at top-right */}
                      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1D4ED8] border-b border-blue-400/30">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-100">
                          {isLoading ? "Searching news..." : `Found ${searchResults.length} articles`}
                        </span>

                        {/* Circular close button (x) as in screenshot */}
                        <button
                          onClick={() => setIsSearchOpen(false)}
                          className="w-6 h-6 rounded-full bg-blue-900/70 hover:bg-blue-950 flex items-center justify-center text-white text-xs font-bold transition-all shadow-xs"
                          title="Close search"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Results list */}
                      <div className="max-h-[360px] overflow-y-auto divide-y divide-blue-400/30 custom-scrollbar">
                        {isLoading ? (
                          <div className="p-5 text-center text-blue-100 text-sm font-medium animate-pulse">
                            Searching matching news stories...
                          </div>
                        ) : searchResults.length > 0 ? (
                          searchResults.map((item, idx) => (
                            <Link
                              key={idx}
                              href={`/${item.category.toLowerCase()}/${item.slug}`}
                              onClick={() => {
                                setIsSearchOpen(false);
                                setSearchQuery("");
                              }}
                              className="flex items-start gap-3.5 p-3 hover:bg-[#1D4ED8] transition-colors group cursor-pointer"
                            >
                              {/* Thumbnail image on left */}
                              <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-blue-900/50">
                                <Image
                                  src={item.image || "/images/placeholder.webp"}
                                  alt={item.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                                  sizes="56px"
                                />
                              </div>

                              {/* Article details on right */}
                              <div className="flex-1 min-w-0">
                                <span className="inline-block text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-900/70 text-blue-100 mb-1 tracking-wider">
                                  {item.category}
                                </span>
                                <h4 className="text-xs md:text-sm font-bold text-white leading-snug line-clamp-2 group-hover:text-blue-100 transition-colors">
                                  {item.title}
                                </h4>
                                {item.date && (
                                  <p className="text-[11px] text-blue-200/80 mt-0.5 font-medium">
                                    {item.date}
                                  </p>
                                )}
                              </div>
                            </Link>
                          ))
                        ) : (
                          <div className="p-5 text-center text-blue-100 text-sm font-medium">
                            No matching news stories found for &quot;{searchQuery}&quot;
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search Container (Right aligned on mobile) */}
          <div className="ml-auto lg:hidden relative" ref={mobileSearchRef}>
            {!isSearchOpen ? (
              <button
                onClick={toggleSearch}
                className="flex items-center justify-center p-1 text-black focus:outline-none"
                aria-label="Search"
              >
                <svg
                  className="h-5 w-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.4}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            ) : (
              <div className="relative flex items-center">
                <div className="flex items-center gap-1.5 bg-white rounded-md px-2 py-1 border-2 border-neutral-400 focus-within:border-[#2563EB] w-48 sm:w-60 shadow-xs">
                  <svg
                    className="h-4 w-4 text-neutral-600 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>

                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none font-medium"
                    autoFocus
                  />

                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="text-neutral-500 hover:text-black p-0.5 text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>

                {/* Mobile Search Dropdown Box attached directly underneath */}
                {(searchQuery.trim().length > 0 || isLoading) && (
                  <div className="absolute top-full right-0 mt-2 w-[85vw] max-w-[340px] z-50 bg-[#2563EB] text-white rounded-2xl shadow-2xl border border-blue-400/30 overflow-hidden">
                    <div className="flex items-center justify-between px-3.5 py-2 bg-[#1D4ED8] border-b border-blue-400/30">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-100">
                        {isLoading ? "Searching..." : `Results (${searchResults.length})`}
                      </span>
                      <button
                        onClick={() => setIsSearchOpen(false)}
                        className="w-5 h-5 rounded-full bg-blue-900/70 hover:bg-blue-950 flex items-center justify-center text-white text-[10px] font-bold"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="max-h-[320px] overflow-y-auto divide-y divide-blue-400/30 custom-scrollbar">
                      {isLoading ? (
                        <div className="p-4 text-center text-blue-100 text-xs font-medium animate-pulse">
                          Searching...
                        </div>
                      ) : searchResults.length > 0 ? (
                        searchResults.map((item, idx) => (
                          <Link
                            key={idx}
                            href={`/${item.category.toLowerCase()}/${item.slug}`}
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery("");
                            }}
                            className="flex items-start gap-3 p-3 hover:bg-[#1D4ED8] transition-colors group cursor-pointer"
                          >
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-blue-900/50">
                              <Image
                                src={item.image || "/images/placeholder.webp"}
                                alt={item.title}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <span className="inline-block text-[9px] font-extrabold uppercase px-1 py-0.5 rounded bg-blue-900/70 text-blue-100 mb-0.5">
                                {item.category}
                              </span>
                              <h4 className="text-xs font-bold text-white leading-snug line-clamp-2">
                                {item.title}
                              </h4>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="p-4 text-center text-blue-100 text-xs font-medium">
                          No matching news found for &quot;{searchQuery}&quot;
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Slide-over Left Drawer Menu */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop overlay */}
        <div
          onClick={toggleDrawer}
          className="absolute inset-0 bg-black/50 backdrop-blur-xs"
        />

        {/* Drawer content pane */}
        <aside
          className={`absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white text-black p-6 flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200">
            <Link href="/" onClick={toggleDrawer} className="flex items-center gap-2" aria-label="WM Home">
              <Image
                src="/images/wiremingle-logo.webp"
                alt="WireMingle Logo"
                width={65}
                height={22}
                className="h-5 w-auto object-contain"
                priority
              />
            </Link>
            <button
              onClick={toggleDrawer}
              className="text-neutral-500 hover:text-black p-1 transition-colors"
              aria-label="Close menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <nav className="flex flex-col space-y-4">
            <Link
              href="/our-team"
              onClick={toggleDrawer}
              className="text-sm font-extrabold tracking-tight text-[#E31B23] hover:underline transition-colors py-1 border-b border-neutral-100 flex items-center justify-between"
            >
              <span>OUR TEAM</span>
              <span className="text-xs bg-red-100 text-[#E31B23] px-2 py-0.5 rounded font-bold">EDITORIAL</span>
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={toggleDrawer}
                className="text-sm font-extrabold tracking-tight text-black hover:underline transition-colors py-1 border-b border-neutral-100"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </aside>
      </div>

    </header>
  );
}
