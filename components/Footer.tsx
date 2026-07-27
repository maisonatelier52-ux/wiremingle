"use client";

import Link from "next/link";

export default function Footer() {
  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "BUSINESS", href: "/business" },
    { label: "WORLD", href: "/world" },
    { label: "FINANCE", href: "/finance" },
    { label: "TECHNOLOGY", href: "/technology" },
    { label: "POLITICS", href: "/politics" },
    { label: "LIFESTYLE", href: "/lifestyle" },
    { label: "OPINION", href: "/opinion" },
    { label: "INVESTIGATION", href: "/investigation" },
    { label: "OUR TEAM", href: "/our-team" },
  ];

  const secondaryLinks = [
    { label: "About Us", href: "/about-us" },
    { label: "Our Team", href: "/our-team" },
    { label: "Contact", href: "/contact" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Legal", href: "/legal" },
    { label: "Ownership & Funding", href: "/ownership-funding" },
    { label: "Right of Reply Policy", href: "/right-of-reply" },
    { label: "Editorial Policy", href: "/editorial-policy" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Source Methodology", href: "/source-methodology" },
    { label: "Advertising & Sponsored Policy", href: "/advertising-sponsored" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <footer className="bg-black text-neutral-400 py-10 font-sans border-t border-neutral-900 w-full select-none">
      <div className="mx-auto max-w-[96%] xl:max-w-[1400px] px-4 md:px-6">
        
        {/* Top Navigation Row */}
        <nav className="flex flex-wrap items-center justify-start gap-x-6 md:gap-x-8 gap-y-3">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="text-[12px] md:text-[13px] font-black tracking-widest text-white hover:text-[#E31B23] transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Divider Line */}
        <hr className="border-t border-neutral-900 my-7" />

        {/* Desktop View Layout (md and above) */}
        <div className="hidden md:flex flex-row items-end justify-between gap-6 text-[12px] font-medium">
          
          {/* Left Side: Copyright */}
          <div className="text-neutral-500">
            Copyright ©2026 wiremingle
          </div>

          {/* Center Side: Secondary Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-neutral-400 max-w-[750px] text-center">
            {secondaryLinks.map((link, idx) => (
              <Link key={idx} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side: Follow Social Icons */}
          <div className="flex items-center gap-4 text-neutral-400">
            <span className="text-neutral-400 font-bold text-[13.5px]">
              Follow
            </span>
            
            <div className="flex items-center gap-3">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Facebook">
                <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </Link>

              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
                <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>

              <Link href="https://reddit.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Reddit">
                <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.64-6.29-1.72l1.37-4.31 3.96.84c.03.88.75 1.58 1.63 1.58 1.1 0 2-.9 2-2s-.9-2-2-2c-.79 0-1.47.47-1.79 1.15l-4.41-.93c-.15-.03-.31.05-.36.2l-1.61 5.08c-2.52.04-4.81.69-6.49 1.72C3.86 9.98 2.96 9.5 2 9.5c-1.65 0-3 1.35-3 3 0 1.24.76 2.3 1.84 2.74-.09.41-.14.83-.14 1.26 0 3.59 4.04 6.5 9 6.5s9-2.91 9-6.5c0-.43-.05-.85-.14-1.26 1.08-.44 1.84-1.5 1.84-2.74zM6.5 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                </svg>
              </Link>

              <Link href="https://substack.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Substack">
                <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.539 0H1.46v2.836h21.08V0z" />
                </svg>
              </Link>

              <Link href="https://medium.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="Medium">
                <div className="h-5.5 w-5.5 rounded bg-neutral-400 flex items-center justify-center font-sans font-black text-[9px] text-black tracking-tighter leading-none select-none">
                  Me
                </div>
              </Link>

              <Link href="mailto:contact@wiremingle.com" className="hover:text-white transition-colors" aria-label="Email">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
            </div>
          </div>

        </div>

        {/* Mobile View Layout (strictly below md) */}
        <div className="flex md:hidden flex-col gap-6 text-[12.5px] font-medium pt-2">
          
          {/* 2-Column Grid for Secondary Links */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-neutral-400">
            {secondaryLinks.map((link, idx) => (
              <Link key={idx} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Follow Us and Social Icons */}
          <div className="flex items-center justify-center gap-4 text-neutral-400 pt-4 border-t border-neutral-900">
            <span className="text-white font-bold text-[13.5px]">
              Follow
            </span>

            <div className="flex items-center gap-3.5">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Facebook">
                <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </Link>

              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
                <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>

              <Link href="https://reddit.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Reddit">
                <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.64-6.29-1.72l1.37-4.31 3.96.84c.03.88.75 1.58 1.63 1.58 1.1 0 2-.9 2-2s-.9-2-2-2c-.79 0-1.47.47-1.79 1.15l-4.41-.93c-.15-.03-.31.05-.36.2l-1.61 5.08c-2.52.04-4.81.69-6.49 1.72C3.86 9.98 2.96 9.5 2 9.5c-1.65 0-3 1.35-3 3 0 1.24.76 2.3 1.84 2.74-.09.41-.14.83-.14 1.26 0 3.59 4.04 6.5 9 6.5s9-2.91 9-6.5c0-.43-.05-.85-.14-1.26 1.08-.44 1.84-1.5 1.84-2.74zM6.5 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                </svg>
              </Link>

              <Link href="https://substack.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6719] transition-colors" aria-label="Substack">
                <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.539 0H1.46v2.836h21.08V0z" />
                </svg>
              </Link>

              <Link href="https://medium.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="Medium">
                <div className="h-5.5 w-5.5 rounded bg-neutral-400 flex items-center justify-center font-sans font-black text-[9px] text-black tracking-tighter leading-none select-none">
                  Me
                </div>
              </Link>

              <Link href="mailto:contact@wiremingle.com" className="hover:text-white transition-colors" aria-label="Email">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Copyright Sentence at the very bottom */}
          <div className="text-neutral-500 text-[12px] text-center pt-2">
            Copyright ©2026 wiremingle
          </div>

        </div>

      </div>
    </footer>
  );
}
