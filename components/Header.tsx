"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className="w-full bg-white select-none">
      {/* Top Dark Navy/Slate Strip */}
      <div className="h-[7px] w-full bg-[#374151]" />

      {/* Main Header Container */}
      <div className="border-b-2 border-black bg-white">
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

          {/* Desktop Category Navigation & Search Icon */}
          <div className="hidden lg:flex items-center ml-8 shrink-0">
            <nav className="flex items-center gap-6 xl:gap-7">
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

            {/* Search Icon immediately next to INVESTIGATION */}
            <button
              onClick={toggleSearch}
              className="ml-3.5 flex items-center justify-center text-black hover:opacity-80 transition-colors focus:outline-none p-1"
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
          </div>

          {/* Mobile Search Button (Right aligned on mobile) */}
          <div className="ml-auto lg:hidden">
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
          </div>

        </div>

        {/* Expandable Search Input Area */}
        {isSearchOpen && (
          <div className="w-full bg-white border-t border-b border-black py-3 px-4 shadow-md">
            <div className="mx-auto max-w-3xl flex items-center gap-2">
              <input
                type="text"
                placeholder="Search news, topics, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-b border-black py-1.5 focus:border-[#E31B23] text-sm focus:outline-none text-black bg-transparent font-medium"
                autoFocus
              />
              <button
                className="bg-[#E31B23] text-white px-4 py-1.5 text-xs font-bold hover:bg-red-700 transition-colors"
                onClick={() => {
                  console.log("Search trigger for:", searchQuery);
                  setIsSearchOpen(false);
                }}
              >
                SEARCH
              </button>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-neutral-500 hover:text-black p-1 text-xs font-bold transition-colors"
              >
                CANCEL
              </button>
            </div>
          </div>
        )}
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
