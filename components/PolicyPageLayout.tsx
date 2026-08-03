import Link from "next/link";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

interface PolicyPageLayoutProps {
  title: string;
  children: ReactNode;
}

export default function PolicyPageLayout({ title, children }: PolicyPageLayoutProps) {
  return (
    <main className="w-full min-h-screen bg-white text-black font-sans flex flex-col justify-between">
      
      <div className="mx-auto w-full max-w-[94%] xl:max-w-[1360px] px-5 md:px-8 pt-8 md:pt-10">
        
        {/* Header container aligned with content */}
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb row */}
          <div className="flex items-center gap-1.5 text-[11px] font-black tracking-wider text-neutral-500 uppercase select-none">
            <span className="text-neutral-400 font-normal">›</span>
            <Link href="/" className="hover:text-black transition-colors duration-150">
              WIREMINGLE POLICIES
            </Link>
            <span className="text-neutral-400 font-normal ml-0.5">•</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl md:text-4xl lg:text-[40px] font-black tracking-tight leading-[1.1] text-black mt-4 mb-3">
            {title}
          </h1>

          {/* Red subtitle */}
          <div className="text-[12px] font-black tracking-widest text-[#E31B23] uppercase mt-4 mb-2 select-none">
            WIREMINGLE POLICIES & LEGAL TERMS
          </div>

          {/* Date */}
          <div className="text-[12.5px] font-bold text-neutral-500 tracking-tight mt-3 select-none">
            Last Updated: July 22, 2026
          </div>
        </div>

        {/* Thin divider line aligned with content */}
        <div className="max-w-3xl mx-auto mt-6 mb-8">
          <hr className="border-t border-neutral-200" />
        </div>

        {/* Designed Underline CSS */}
        <style dangerouslySetInnerHTML={{__html: `
          .policy-content h2 {
            position: relative;
            display: inline-block;
            font-weight: 900;
            font-size: 1.25rem;
            color: #000000;
            margin-top: 1.75rem;
            margin-bottom: 0.75rem;
            padding-bottom: 0.5rem;
          }
          .policy-content h2::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 3.5rem;
            height: 3px;
            background-color: #E31B23;
            border-radius: 2px;
          }
        `}} />

        {/* Main Content Area */}
        <div className="max-w-3xl mx-auto flex flex-col gap-6 text-[15.5px] leading-relaxed text-neutral-800 pb-16 policy-content">
          {children}
        </div>

      </div>

      <Footer />
    </main>
  );
}
