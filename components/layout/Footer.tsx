"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Send,
  ShieldCheck,
  CheckCircle2,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/ui/Icons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Thank you for subscribing!");
        setEmail("");
      } else {
        toast.error(data.message || "Subscription failed");
      }
    } catch {
      toast.error("Network error, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#080808] border-t border-[rgba(214,166,75,0.22)] relative overflow-hidden text-zinc-400">
      {/* Ambient background gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1820px] h-48 bg-gradient-to-b from-[#D6A64B]/5 to-transparent pointer-events-none" />

      {/* Main Footer Content */}
      <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 xl:gap-16 pb-12 border-b border-zinc-800/80">
          {/* Column 1: Brand & Bio (Span 2 on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#D6A64B]/50 shadow-[0_0_20px_rgba(214,166,75,0.25)]">
                <Image
                  src="/images/logo.png"
                  alt="Upgrade Marketing Agency"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-wider text-white">UPGRADE</span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D6A64B] font-bold">
                  Marketing Agency
                </span>
              </div>
            </Link>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              We don&apos;t just market brands. We make them unforgettable. A full-service creative
              and performance marketing agency dedicated to category dominance and aesthetic
              prestige.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#E8C477] hover:border-[#D6A64B]/50 hover:shadow-[0_0_15px_rgba(214,166,75,0.3)] transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#E8C477] hover:border-[#D6A64B]/50 hover:shadow-[0_0_15px_rgba(214,166,75,0.3)] transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#E8C477] hover:border-[#D6A64B]/50 hover:shadow-[0_0_15px_rgba(214,166,75,0.3)] transition-all"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#E8C477] hover:border-[#D6A64B]/50 hover:shadow-[0_0_15px_rgba(214,166,75,0.3)] transition-all"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white text-xs uppercase tracking-widest font-bold border-l-2 border-[#D6A64B] pl-2.5">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#hero" className="hover:text-[#E8C477] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#E8C477] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E8C477] transition-colors">
                  Capabilities & Services
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-[#E8C477] transition-colors">
                  Selected Works
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-[#E8C477] transition-colors">
                  Executive Team
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#E8C477] transition-colors">
                  Investment & Pricing
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#E8C477] transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#E8C477] transition-colors">
                  Contact Agency
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Capabilities */}
          <div className="space-y-4">
            <h4 className="text-white text-xs uppercase tracking-widest font-bold border-l-2 border-[#D6A64B] pl-2.5">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services/branding-and-visual-identity" className="hover:text-[#E8C477] transition-colors">
                  Branding & Identity
                </Link>
              </li>
              <li>
                <Link href="/services/graphic-design-and-packaging" className="hover:text-[#E8C477] transition-colors">
                  Packaging & Editorial
                </Link>
              </li>
              <li>
                <Link href="/services/social-media-management" className="hover:text-[#E8C477] transition-colors">
                  Social Media Strategy
                </Link>
              </li>
              <li>
                <Link href="/services/performance-digital-marketing" className="hover:text-[#E8C477] transition-colors">
                  Performance Marketing
                </Link>
              </li>
              <li>
                <Link href="/services/website-design-and-development" className="hover:text-[#E8C477] transition-colors">
                  Next.js Web Applications
                </Link>
              </li>
              <li>
                <Link href="/services/cinematic-video-production" className="hover:text-[#E8C477] transition-colors">
                  Cinematic Commercials
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Contact */}
          <div className="space-y-4">
            <h4 className="text-white text-xs uppercase tracking-widest font-bold border-l-2 border-[#D6A64B] pl-2.5">
              VIP Insights
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Join 5,000+ founders receiving our exclusive quarterly memo on market positioning and
              conversion engineering.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter corporate email..."
                  className="w-full bg-[#111111] border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D6A64B] transition-colors pr-10"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-[#D6A64B] text-[#080808] rounded-md hover:bg-[#E8C477] transition-colors disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
            <div className="pt-2 text-xs space-y-1 text-zinc-500">
              <p className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D6A64B]" />
                <span>Zero spam. Absolute confidentiality.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} Upgrade Marketing Agency. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-[#E8C477] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#E8C477] transition-colors">
              Terms of Engagement
            </Link>
            <Link href="/admin/login" className="hover:text-[#D6A64B] font-semibold transition-colors">
              Administrative CMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
