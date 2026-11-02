import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Crown,
  Palette,
  Share2,
  TrendingUp,
  Globe,
  Video,
  Camera,
  Sparkles,
  ShieldCheck,
  PhoneCall,
} from "@/components/ui/Icons";
import { getServiceBySlug, getProjects } from "@/lib/data/cms-store";
import CtaBannerSection from "@/components/sections/CtaBannerSection";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0;

const ICON_MAP: Record<string, React.ElementType> = {
  Crown,
  Palette,
  Share2,
  TrendingUp,
  Globe,
  Video,
  Camera,
  Sparkles,
};

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} | Upgrade Marketing Agency`,
    description: service.short_description,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const allProjects = await getProjects(true);
  const relatedProjects = allProjects.slice(0, 3);
  const Icon = ICON_MAP[service.icon_name] || Sparkles;

  return (
    <div className="pt-28 pb-16 bg-[#080808]">
      {/* Breadcrumb & Navigation */}
      <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-400 hover:text-[#E8C477] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Services</span>
        </Link>
      </div>

      {/* Hero Header */}
      <section className="py-12 sm:py-16 relative overflow-hidden">
        <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-[#171717] border border-[#D6A64B]/40 flex items-center justify-center text-[#E8C477] shadow-xl">
                  <Icon className="w-7 h-7" />
                </div>
                {service.starting_price && (
                  <span className="px-3.5 py-1 rounded-full bg-[#171717] border border-[#D6A64B]/30 text-xs font-bold text-[#E8C477]">
                    Starting from {service.starting_price}
                  </span>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed">
                {service.short_description}
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#D6A64B] via-[#E8C477] to-[#D6A64B] text-[#080808] font-bold text-sm shadow-[0_0_25px_rgba(214,166,75,0.3)] hover:shadow-[0_0_40px_rgba(214,166,75,0.5)] transition-all flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Book Consultation for this Service</span>
                </Link>
              </div>
            </div>

            {/* Main Cover Image */}
            <div className="lg:col-span-5 relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#D6A64B]/40 shadow-2xl">
              <Image
                src={service.cover_image}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Breakdown */}
      <section className="py-20 border-t border-zinc-800/80 bg-[#0c0c0c]">
        <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Full Description & Deliverables (Span 8) */}
            <div className="lg:col-span-8 space-y-10">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Strategic Scope & Methodology
                </h2>
                <p className="text-zinc-300 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                  {service.full_description}
                </p>
              </div>

              {/* Core Features / Deliverables */}
              {service.features && service.features.length > 0 && (
                <div className="p-8 rounded-3xl bg-[#141414] border border-[rgba(214,166,75,0.22)] space-y-6">
                  <h3 className="text-xl font-bold text-white border-l-2 border-[#D6A64B] pl-3">
                    What We Deliver
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                        <Check className="w-5 h-5 text-[#D6A64B] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="p-8 rounded-3xl bg-[#141414] border border-zinc-800 space-y-4">
                  <h3 className="text-xl font-bold text-white border-l-2 border-[#D6A64B] pl-3">
                    Measurable Commercial Impact
                  </h3>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-zinc-400">
                        <ShieldCheck className="w-4 h-4 text-[#E8C477] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column: Sticky Quote Card (Span 4) */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 p-8 rounded-3xl bg-[#111111] border border-[#D6A64B]/40 shadow-2xl space-y-6">
                <h3 className="text-xl font-bold text-white">Start Your Project</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Have questions about timelines, team allocation, or custom pricing? Contact our
                  partners for a private consultation.
                </p>
                <div className="pt-2 border-t border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-zinc-300">
                    <span>Average Turnaround:</span>
                    <span className="font-semibold text-white">2 - 4 Weeks</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-300">
                    <span>Executive Care:</span>
                    <span className="font-semibold text-[#D6A64B]">Direct Partner Access</span>
                  </div>
                </div>

                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#F5DFA9] via-[#D6A64B] to-[#99732B] text-[#080808] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(214,166,75,0.4)] transition-all"
                >
                  <span>Request Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-20 border-t border-zinc-800/80">
          <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-12">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#D6A64B]">
                  EVIDENCE OF EXCELLENCE
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  Selected Works in this Category
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="text-xs font-bold text-[#E8C477] hover:text-white uppercase tracking-wider flex items-center gap-1"
              >
                <span>View Full Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((proj) => (
                <Link
                  key={proj.id}
                  href={`/portfolio/${proj.slug}`}
                  className="group rounded-2xl overflow-hidden bg-[#111111] border border-zinc-800 hover:border-[#D6A64B]/60 transition-all flex flex-col"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={proj.cover_image}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D6A64B]">
                      {proj.client_name}
                    </span>
                    <h4 className="text-base font-bold text-white group-hover:text-[#E8C477] transition-colors">
                      {proj.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CtaBannerSection />
    </div>
  );
}

