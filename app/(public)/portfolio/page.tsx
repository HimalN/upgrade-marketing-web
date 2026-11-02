import { getProjects, getProjectCategories } from "@/lib/data/cms-store";
import PortfolioClient from "@/components/portfolio/PortfolioClient";
import CtaBannerSection from "@/components/sections/CtaBannerSection";

export const metadata = {
  title: "Creative Portfolio & Client Case Studies | Upgrade Marketing Agency",
  description: "Browse our curated archive of luxury branding, web design, television commercials, and digital marketing triumphs.",
};

export const revalidate = 0;

export default async function PortfolioPage() {
  const [projects, categories] = await Promise.all([
    getProjects(true),
    getProjectCategories(),
  ]);

  return (
    <div className="pt-28 pb-16 bg-[#080808]">
      {/* Header */}
      <section className="py-16 sm:py-20 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D6A64B]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171717] border border-[#D6A64B]/35 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6A64B]" />
            <span className="text-xs font-bold tracking-widest text-[#F5DFA9] uppercase">
              CURATED ARCHIVE OF TRIUMPHS
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-snug">
            PROVEN WORK THAT <br />
            <span className="gold-gradient-text">REDEFINES CATEGORIES</span>
          </h1>

          <p className="text-lg text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
            Explore our featured client engagements across branding, digital flagships, TV commercials, and viral performance campaigns.
          </p>
        </div>
      </section>

      {/* Interactive Portfolio Gallery */}
      <section className="py-12 border-t border-zinc-800/80">
        <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <PortfolioClient
            initialProjects={projects}
            categories={categories.filter((c) => c.slug !== "all")}
          />
        </div>
      </section>

      {/* CTA */}
      <CtaBannerSection />
    </div>
  );
}

