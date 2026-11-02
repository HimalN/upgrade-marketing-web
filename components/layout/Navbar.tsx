"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X, ArrowUpRight, PhoneCall } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "#hero", id: "hero" },
  { label: "About", href: "#about", id: "about" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Portfolio", href: "#portfolio", id: "portfolio" },
  { label: "Process", href: "#process", id: "process" },
  { label: "Pricing", href: "#pricing", id: "pricing" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sectionIds = ["hero", "about", "services", "portfolio", "process", "pricing", "contact"];
      const scrollPos = window.scrollY + 140;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#080808]/90 backdrop-blur-md border-b border-[rgba(214,166,75,0.22)] py-3 shadow-2xl"
          : "bg-[#080808]/40 backdrop-blur-sm py-4"
      )}
    >
      <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-[#D6A64B]/40 shadow-[0_0_15px_rgba(214,166,75,0.2)] group-hover:border-[#D6A64B] transition-all">
              <Image
                src="/images/logo.png"
                alt="Upgrade Marketing Agency"
                fill
                sizes="40px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg tracking-wider text-white group-hover:text-[#E8C477] transition-colors leading-tight">
                UPGRADE
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#D6A64B] font-semibold">
                Marketing Agency
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links with Soft Sliding Indicator */}
          <nav className="hidden lg:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 relative",
                    isActive
                      ? "text-[#E8C477]"
                      : "text-zinc-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbarActiveIndicator"
                      className="absolute inset-0 rounded-full bg-[#D6A64B]/15 border border-[#D6A64B]/40 shadow-[0_0_15px_rgba(214,166,75,0.2)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/admin/login"
              className="text-xs uppercase tracking-wider text-zinc-400 hover:text-[#D6A64B] font-semibold px-2 py-1 transition-colors"
            >
              CMS Portal
            </Link>
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold rounded-full group bg-gradient-to-r from-[#D6A64B] via-[#F5DFA9] to-[#D6A64B] hover:shadow-[0_0_20px_rgba(214,166,75,0.4)] transition-all active:scale-95 cursor-pointer"
            >
              <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-[#080808] rounded-full group-hover:bg-opacity-0 font-bold text-white group-hover:text-[#080808] flex items-center gap-1.5">
                <span>Get a Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="#contact"
              className="px-3 py-1.5 bg-[#D6A64B] text-[#080808] text-xs font-bold rounded-full flex items-center gap-1"
            >
              <span>Quote</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#E8C477]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0c0c]/98 backdrop-blur-xl border-b border-[#D6A64B]/30 px-4 pt-3 pb-6 max-h-[calc(100dvh-75px)] overflow-y-auto animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between transition-colors",
                    isActive
                      ? "text-[#E8C477] bg-[#D6A64B]/15 border-l-2 border-[#D6A64B]"
                      : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                  )}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#D6A64B]" />}
                </a>
              );
            })}
            <div className="pt-4 border-t border-zinc-800 flex flex-col gap-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center bg-gradient-to-r from-[#F5DFA9] via-[#D6A64B] to-[#B6862D] text-[#080808] font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Request Custom Proposal</span>
              </a>
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2 text-center text-xs uppercase tracking-wider text-zinc-400 hover:text-white"
              >
                Access Admin Dashboard
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

