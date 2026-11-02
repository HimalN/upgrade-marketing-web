import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Calendar,
  ExternalLink,
  Target,
  Compass,
  Trophy,
  PhoneCall,
} from "@/components/ui/Icons";
import { getProjectBySlug, getProjects } from "@/lib/data/cms-store";
import CtaBannerSection from "@/components/sections/CtaBannerSection";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0;

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Upgrade Marketing Agency Portfolio`,
    description: project.short_description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getProjects(true);
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  return (
    <div className="pt-28 pb-16 bg-[#080808]">
      {/* Back button */}
      <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-400 hover:text-[#E8C477] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio Archive</span>
        </Link>
      </div>

      {/* Hero Header */}
      <section className="py-10">
        <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-8">
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171717] border border-[#D6A64B]/35">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6A64B]" />
              <span className="text-[11px] font-bold tracking-widest text-[#E8C477] uppercase">
                {project.category_name || "Case Study"}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              {project.title}
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed">
              {project.short_description}
            </p>
          </div>

          {/* Project Meta Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-2xl bg-[#111111] border border-[rgba(214,166,75,0.22)]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                Client
              </span>
              <span className="text-sm font-semibold text-white mt-1 block">
                {project.client_name}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                Discipline
              </span>
              <span className="text-sm font-semibold text-[#E8C477] mt-1 block">
                {project.category_name || "Branding & Web"}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                Completion
              </span>
              <span className="text-sm font-semibold text-white mt-1 block">
                {project.completion_date || "2026"}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                Live Experience
              </span>
              {project.live_url ? (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-[#D6A64B] hover:underline mt-1 inline-flex items-center gap-1"
                >
                  <span>Visit Platform</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-sm text-zinc-400 mt-1 block">Private / Proprietary</span>
              )}
            </div>
          </div>

          {/* Main Cover Image */}
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-[#D6A64B]/30 shadow-2xl">
            <Image
              src={project.cover_image}
              alt={project.title}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Case Study In-Depth Section: Objectives, Approach, Results */}
      <section className="py-20 border-t border-zinc-800/80 bg-[#0c0c0c]">
        <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Story & Background (Span 7) */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-black text-white">The Narrative & Scope</h2>
                <p className="text-zinc-300 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                  {project.full_description}
                </p>
              </div>

              {/* Objectives */}
              {project.objectives && (
                <div className="p-8 rounded-3xl bg-[#141414] border border-zinc-800 space-y-4">
                  <div className="flex items-center gap-3 text-[#E8C477]">
                    <Target className="w-6 h-6" />
                    <h3 className="text-xl font-bold text-white">Strategic Objectives</h3>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">{project.objectives}</p>
                </div>
              )}

              {/* Creative Approach */}
              {project.approach && (
                <div className="p-8 rounded-3xl bg-[#141414] border border-zinc-800 space-y-4">
                  <div className="flex items-center gap-3 text-[#E8C477]">
                    <Compass className="w-6 h-6" />
                    <h3 className="text-xl font-bold text-white">Creative & Technical Approach</h3>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">{project.approach}</p>
                </div>
              )}

              {/* Final Results */}
              {project.results && (
                <div className="p-8 rounded-3xl bg-[#171510] border border-[#D6A64B]/50 shadow-[0_0_30px_rgba(214,166,75,0.15)] space-y-4">
                  <div className="flex items-center gap-3 text-[#D6A64B]">
                    <Trophy className="w-6 h-6" />
                    <h3 className="text-xl font-bold text-white">Commercial Results & Impact</h3>
                  </div>
                  <p className="text-sm text-zinc-200 leading-relaxed font-medium">
                    {project.results}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar Sticky CTA (Span 5) */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 p-8 rounded-3xl bg-[#111111] border border-[#D6A64B]/40 shadow-2xl space-y-6">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#D6A64B]">
                  INSPIRED BY THIS WORK?
                </span>
                <h3 className="text-2xl font-black text-white">Start a Similar Project</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Our team can engineer a comparable or bespoke visual and digital transformation
                  for your brand. Inquire directly with our partners.
                </p>

                <div className="pt-2 space-y-3 border-t border-zinc-800 text-xs text-zinc-300">
                  <div className="flex items-center justify-between">
                    <span>Discipline:</span>
                    <span className="font-semibold text-white">{project.category_name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Availability:</span>
                    <span className="font-semibold text-[#D6A64B]">Q2 / Q3 Intake Open</span>
                  </div>
                </div>

                <Link
                  href={`/contact?service=${encodeURIComponent(
                    project.category_name || "Branding"
                  )}&project_reference=${encodeURIComponent(project.title)}`}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#F5DFA9] via-[#D6A64B] to-[#99732B] text-[#080808] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(214,166,75,0.4)] transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Start a Similar Project</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Images Grid */}
      {project.gallery_images && project.gallery_images.length > 0 && (
        <section className="py-20 border-t border-zinc-800/80">
          <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D6A64B]">
                PRODUCTION ARTIFACTS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Visual Gallery & Details
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.gallery_images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-zinc-800 shadow-xl group"
                >
                  <Image
                    src={img}
                    alt={`${project.title} Gallery Asset ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-20 border-t border-zinc-800/80">
          <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#D6A64B]">
                  MORE DISTINCTION
                </span>
                <h3 className="text-2xl font-black text-white mt-1">Related Client Engagements</h3>
              </div>
              <Link
                href="/portfolio"
                className="text-xs font-bold text-[#E8C477] hover:text-white uppercase tracking-wider flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/portfolio/${rel.slug}`}
                  className="group rounded-2xl overflow-hidden bg-[#111111] border border-zinc-800 hover:border-[#D6A64B]/60 transition-all flex flex-col"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={rel.cover_image}
                      alt={rel.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-1">
                    <span className="text-[10px] font-bold text-[#D6A64B] uppercase tracking-wider">
                      {rel.client_name}
                    </span>
                    <h4 className="text-base font-bold text-white group-hover:text-[#E8C477] transition-colors">
                      {rel.title}
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

