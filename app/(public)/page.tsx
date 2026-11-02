import HeroSection from "@/components/sections/HeroSection";
import AboutIntroSection from "@/components/sections/AboutIntroSection";
import ServicesOverviewSection from "@/components/sections/ServicesOverviewSection";
import FeaturedProjectsSection from "@/components/sections/FeaturedProjectsSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import TeamSection from "@/components/sections/TeamSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PricingSection from "@/components/sections/PricingSection";
import CtaBannerSection from "@/components/sections/CtaBannerSection";
import ContactSection from "@/components/sections/ContactSection";
import {
  getSiteSettings,
  getHomepageSections,
  getStatistics,
  getServices,
  getProjects,
  getProjectCategories,
  getTeamMembers,
  getTestimonials,
  getPricingPackages,
} from "@/lib/data/cms-store";

export const revalidate = 0; // Ensures dynamic CMS updates reflect immediately

export default async function HomePage() {
  const [
    settings,
    sections,
    statistics,
    services,
    projects,
    categories,
    team,
    testimonials,
    packages,
  ] = await Promise.all([
    getSiteSettings(),
    getHomepageSections(),
    getStatistics(),
    getServices(true),
    getProjects(true),
    getProjectCategories(),
    getTeamMembers(true),
    getTestimonials(true),
    getPricingPackages(true),
  ]);

  const heroSec = sections["hero"];
  const aboutSec = sections["about"];
  const servicesSec = sections["services"];
  const projectsSec = sections["projects"];
  const ctaSec = sections["cta"];

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection
        badge={heroSec?.badge}
        title={heroSec?.title}
        subtitle={heroSec?.subtitle}
        description={heroSec?.description}
        ctaText={heroSec?.cta_text}
        ctaLink={heroSec?.cta_link}
      />

      {/* 2. About Us Introduction & Statistics */}
      <AboutIntroSection
        sectionData={aboutSec}
        statistics={statistics}
      />

      {/* 3. Services Overview */}
      <ServicesOverviewSection
        services={services}
        title={servicesSec?.title}
        subtitle={servicesSec?.subtitle}
      />

      {/* 4. Featured Projects Showcase */}
      <FeaturedProjectsSection
        projects={projects.filter((p) => p.is_featured)}
        categories={categories}
        title={projectsSec?.title}
        subtitle={projectsSec?.subtitle}
      />

      {/* 5. Why Choose Upgrade */}
      <WhyChooseUsSection />

      {/* 6. Our 4-Step Process */}
      <ProcessSection />

      {/* 7. Executive Team */}
      <TeamSection team={team} />

      {/* 8. Client Testimonials Carousel */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 9. Pricing & Packages */}
      <PricingSection packages={packages} />

      {/* 10. Call to Action Banner */}
      <CtaBannerSection
        headline={ctaSec?.title}
        supportingText={ctaSec?.subtitle}
      />

      {/* 11. Contact Section */}
      <ContactSection settings={settings} />
    </div>
  );
}

