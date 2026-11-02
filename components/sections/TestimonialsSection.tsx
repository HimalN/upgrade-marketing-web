"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Testimonial } from "@/lib/types/database";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  title?: string;
}

export default function TestimonialsSection({
  testimonials = [],
  title = "What Our Clients Say",
}: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-20 bg-[#080808] relative overflow-hidden border-t border-[rgba(214,166,75,0.15)] scroll-mt-20 lg:scroll-mt-24">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#D6A64B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-[#D6A64B]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6A64B]" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-[#E8C477]">
              Client Testimonials
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            {title}
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            Unfiltered endorsements from founders, CEOs, and marketing directors whose brands we transformed.
          </p>
        </div>

        {/* Testimonial Showcase Box */}
        <div className="max-w-4xl mx-auto relative">
          <div className="p-6 sm:p-10 md:p-14 rounded-2xl sm:rounded-3xl bg-[#111111] border border-[#D6A64B]/35 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
            {/* Top quote icon */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8 text-[#D6A64B]/20 pointer-events-none">
              <Quote className="w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 rotate-180" />
            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-1.5 mb-5 sm:mb-6 text-[#E8C477]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    i < (current.rating || 5)
                      ? "fill-[#D6A64B] text-[#D6A64B]"
                      : "text-zinc-700"
                  }`}
                />
              ))}
              <span className="text-[11px] sm:text-xs font-bold text-zinc-400 ml-1.5 sm:ml-2">5.0 Star Verified Review</span>
            </div>

            {/* Testimonial Quote */}
            <p className="text-base sm:text-xl md:text-2xl font-light text-white leading-relaxed italic mb-8 sm:mb-10 relative z-10">
              &ldquo;{current.feedback}&rdquo;
            </p>

            {/* Author Profile */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6 pt-6 sm:pt-8 border-t border-zinc-800">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#D6A64B]/50 shrink-0">
                  <Image
                    src={current.client_image}
                    alt={current.client_name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white">{current.client_name}</h4>
                  <p className="text-[11px] sm:text-xs text-[#E8C477]">
                    {current.designation ? `${current.designation}, ` : ""}
                    <span className="text-zinc-400 font-semibold">{current.company_name}</span>
                  </p>
                  {current.project_name && (
                    <p className="text-[10px] sm:text-[11px] text-zinc-500 mt-0.5">
                      Engagement: <span className="text-zinc-400">{current.project_name}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center justify-between sm:justify-start space-x-3 pt-2 sm:pt-0">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#171717] border border-[#D6A64B]/30 flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#D6A64B] hover:bg-[#D6A64B]/10 transition-all cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-bold text-zinc-400">
                  {currentIndex + 1} / {testimonials.length}
                </span>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#171717] border border-[#D6A64B]/30 flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#D6A64B] hover:bg-[#D6A64B]/10 transition-all cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center space-x-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "w-8 bg-[#D6A64B]" : "w-2 bg-zinc-700 hover:bg-zinc-500"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

