import { MetadataRoute } from "next";
import { getServices, getProjects } from "@/lib/data/cms-store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://upgrademarketing.agency";

  const [services, projects] = await Promise.all([
    getServices(true),
    getProjects(true),
  ]);

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/team",
    "/pricing",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(s.updated_at || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${baseUrl}/portfolio/${p.slug}`,
    lastModified: new Date(p.updated_at || new Date()),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}

