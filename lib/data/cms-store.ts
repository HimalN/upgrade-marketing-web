import fs from "fs";
import path from "path";
import {
  SiteSettings,
  HomepageSection,
  Statistic,
  Service,
  ProjectCategory,
  Project,
  TeamMember,
  Testimonial,
  PricingPackage,
  Faq,
  ContactInquiry,
  InquiryStatus,
  SocialLink,
  NavigationItem,
} from "@/lib/types/database";
import {
  initialSiteSettings,
  initialHomepageSections,
  initialStatistics,
  initialServices,
  initialProjectCategories,
  initialProjects,
  initialTeamMembers,
  initialTestimonials,
  initialPricingPackages,
  initialFaqs,
  initialContactInquiries,
  initialSocialLinks,
  initialNavigationItems,
} from "./initial-data";

interface CMSData {
  siteSettings: SiteSettings;
  homepageSections: Record<string, HomepageSection>;
  statistics: Statistic[];
  services: Service[];
  projectCategories: ProjectCategory[];
  projects: Project[];
  teamMembers: TeamMember[];
  testimonials: Testimonial[];
  pricingPackages: PricingPackage[];
  faqs: Faq[];
  contactInquiries: ContactInquiry[];
  socialLinks: SocialLink[];
  navigationItems: NavigationItem[];
}

const DATA_FILE_DIR = path.join(process.cwd(), ".data");
const DATA_FILE_PATH = path.join(DATA_FILE_DIR, "cms-data.json");

// In-memory fallback
let memoryData: CMSData = {
  siteSettings: { ...initialSiteSettings },
  homepageSections: { ...initialHomepageSections },
  statistics: [...initialStatistics],
  services: [...initialServices],
  projectCategories: [...initialProjectCategories],
  projects: [...initialProjects],
  teamMembers: [...initialTeamMembers],
  testimonials: [...initialTestimonials],
  pricingPackages: [...initialPricingPackages],
  faqs: [...initialFaqs],
  contactInquiries: [...initialContactInquiries],
  socialLinks: [...initialSocialLinks],
  navigationItems: [...initialNavigationItems],
};

function readData(): CMSData {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const raw = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      return {
        ...memoryData,
        ...parsed,
      };
    }
  } catch (err) {
    console.warn("Could not read local CMS JSON file, falling back to memory:", err);
  }
  return memoryData;
}

function writeData(data: CMSData): void {
  memoryData = data;
  try {
    if (!fs.existsSync(DATA_FILE_DIR)) {
      fs.mkdirSync(DATA_FILE_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not persist CMS data to disk:", err);
  }
}

// 1. Site Settings
export async function getSiteSettings(): Promise<SiteSettings> {
  const data = readData();
  return data.siteSettings || initialSiteSettings;
}

export async function updateSiteSettings(patch: Partial<SiteSettings>): Promise<SiteSettings> {
  const data = readData();
  data.siteSettings = {
    ...data.siteSettings,
    ...patch,
    updated_at: new Date().toISOString(),
  };
  writeData(data);
  return data.siteSettings;
}

// 2. Homepage Sections
export async function getHomepageSections(): Promise<Record<string, HomepageSection>> {
  const data = readData();
  return data.homepageSections || initialHomepageSections;
}

export async function updateHomepageSection(
  key: string,
  patch: Partial<HomepageSection>
): Promise<HomepageSection> {
  const data = readData();
  const current = data.homepageSections[key] || {
    id: `sec-${key}`,
    section_key: key,
    badge: "",
    title: "",
    subtitle: "",
    description: "",
    is_visible: true,
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  const updated = {
    ...current,
    ...patch,
    updated_at: new Date().toISOString(),
  };
  data.homepageSections[key] = updated;
  writeData(data);
  return updated;
}

// 3. Statistics
export async function getStatistics(): Promise<Statistic[]> {
  const data = readData();
  return (data.statistics || []).sort((a, b) => a.display_order - b.display_order);
}

export async function saveStatistic(stat: Partial<Statistic> & { label: string; value: string }): Promise<Statistic> {
  const data = readData();
  if (stat.id) {
    const idx = data.statistics.findIndex((s) => s.id === stat.id);
    if (idx !== -1) {
      data.statistics[idx] = {
        ...data.statistics[idx],
        ...stat,
        updated_at: new Date().toISOString(),
      };
      writeData(data);
      return data.statistics[idx];
    }
  }
  const newStat: Statistic = {
    id: stat.id || `stat-${Date.now()}`,
    label: stat.label,
    value: stat.value,
    numeric_value: stat.numeric_value ?? 0,
    suffix: stat.suffix ?? "+",
    description: stat.description,
    display_order: stat.display_order ?? data.statistics.length + 1,
    is_visible: stat.is_visible ?? true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  data.statistics.push(newStat);
  writeData(data);
  return newStat;
}

// 4. Services
export async function getServices(onlyPublished = false): Promise<Service[]> {
  const data = readData();
  let list = data.services || [];
  if (onlyPublished) {
    list = list.filter((s) => s.is_published);
  }
  return list.sort((a, b) => a.display_order - b.display_order);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const data = readData();
  return data.services.find((s) => s.slug === slug) || null;
}

export async function saveService(service: Partial<Service> & { title: string; slug: string }): Promise<Service> {
  const data = readData();
  if (service.id) {
    const idx = data.services.findIndex((s) => s.id === service.id);
    if (idx !== -1) {
      data.services[idx] = {
        ...data.services[idx],
        ...service,
        updated_at: new Date().toISOString(),
      };
      writeData(data);
      return data.services[idx];
    }
  }
  const newService: Service = {
    id: service.id || `srv-${Date.now()}`,
    title: service.title,
    slug: service.slug,
    short_description: service.short_description || "",
    full_description: service.full_description || "",
    icon_name: service.icon_name || "Sparkles",
    cover_image: service.cover_image || "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80",
    features: service.features || [],
    benefits: service.benefits || [],
    starting_price: service.starting_price,
    is_featured: service.is_featured ?? false,
    is_published: service.is_published ?? true,
    display_order: service.display_order ?? data.services.length + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  data.services.push(newService);
  writeData(data);
  return newService;
}

export async function deleteService(id: string): Promise<boolean> {
  const data = readData();
  const initialLen = data.services.length;
  data.services = data.services.filter((s) => s.id !== id);
  writeData(data);
  return data.services.length < initialLen;
}

// 5. Project Categories
export async function getProjectCategories(): Promise<ProjectCategory[]> {
  const data = readData();
  return (data.projectCategories || []).sort((a, b) => a.display_order - b.display_order);
}

export async function saveProjectCategory(cat: Partial<ProjectCategory> & { name: string; slug: string }): Promise<ProjectCategory> {
  const data = readData();
  if (cat.id) {
    const idx = data.projectCategories.findIndex((c) => c.id === cat.id);
    if (idx !== -1) {
      data.projectCategories[idx] = {
        ...data.projectCategories[idx],
        ...cat,
        updated_at: new Date().toISOString(),
      };
      writeData(data);
      return data.projectCategories[idx];
    }
  }
  const newCat: ProjectCategory = {
    id: cat.id || `cat-${Date.now()}`,
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    image_url: cat.image_url,
    display_order: cat.display_order ?? data.projectCategories.length + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  data.projectCategories.push(newCat);
  writeData(data);
  return newCat;
}

export async function deleteProjectCategory(id: string): Promise<boolean> {
  const data = readData();
  data.projectCategories = data.projectCategories.filter((c) => c.id !== id);
  writeData(data);
  return true;
}

// 6. Projects
export async function getProjects(onlyPublished = false): Promise<Project[]> {
  const data = readData();
  let list = data.projects || [];
  if (onlyPublished) {
    list = list.filter((p) => p.is_published);
  }
  return list.sort((a, b) => a.display_order - b.display_order);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const data = readData();
  return data.projects.find((p) => p.slug === slug) || null;
}

export async function saveProject(project: Partial<Project> & { title: string; slug: string; category_id: string }): Promise<Project> {
  const data = readData();
  const category = data.projectCategories.find((c) => c.id === project.category_id);
  const category_name = category ? category.name : project.category_name || "General";

  if (project.id) {
    const idx = data.projects.findIndex((p) => p.id === project.id);
    if (idx !== -1) {
      data.projects[idx] = {
        ...data.projects[idx],
        ...project,
        category_name,
        updated_at: new Date().toISOString(),
      };
      writeData(data);
      return data.projects[idx];
    }
  }
  const newProj: Project = {
    id: project.id || `prj-${Date.now()}`,
    category_id: project.category_id,
    category_name,
    title: project.title,
    slug: project.slug,
    client_name: project.client_name || "Confidential Client",
    short_description: project.short_description || "",
    full_description: project.full_description || "",
    objectives: project.objectives,
    approach: project.approach,
    results: project.results,
    cover_image: project.cover_image || "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
    gallery_images: project.gallery_images || [],
    completion_date: project.completion_date || new Date().toISOString().split("T")[0],
    live_url: project.live_url,
    is_featured: project.is_featured ?? false,
    is_published: project.is_published ?? true,
    display_order: project.display_order ?? data.projects.length + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  data.projects.push(newProj);
  writeData(data);
  return newProj;
}

export async function deleteProject(id: string): Promise<boolean> {
  const data = readData();
  data.projects = data.projects.filter((p) => p.id !== id);
  writeData(data);
  return true;
}

// 7. Team Members
export async function getTeamMembers(onlyActive = false): Promise<TeamMember[]> {
  const data = readData();
  let list = data.teamMembers || [];
  if (onlyActive) {
    list = list.filter((m) => m.is_active);
  }
  return list.sort((a, b) => a.display_order - b.display_order);
}

export async function saveTeamMember(member: Partial<TeamMember> & { name: string; designation: string }): Promise<TeamMember> {
  const data = readData();
  if (member.id) {
    const idx = data.teamMembers.findIndex((m) => m.id === member.id);
    if (idx !== -1) {
      data.teamMembers[idx] = {
        ...data.teamMembers[idx],
        ...member,
        updated_at: new Date().toISOString(),
      };
      writeData(data);
      return data.teamMembers[idx];
    }
  }
  const newMember: TeamMember = {
    id: member.id || `tm-${Date.now()}`,
    name: member.name,
    designation: member.designation,
    bio: member.bio || "",
    profile_photo: member.profile_photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    skills: member.skills || [],
    linkedin_url: member.linkedin_url,
    twitter_url: member.twitter_url,
    instagram_url: member.instagram_url,
    github_url: member.github_url,
    display_order: member.display_order ?? data.teamMembers.length + 1,
    is_active: member.is_active ?? true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  data.teamMembers.push(newMember);
  writeData(data);
  return newMember;
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  const data = readData();
  data.teamMembers = data.teamMembers.filter((m) => m.id !== id);
  writeData(data);
  return true;
}

// 8. Testimonials
export async function getTestimonials(onlyApproved = false): Promise<Testimonial[]> {
  const data = readData();
  let list = data.testimonials || [];
  if (onlyApproved) {
    list = list.filter((t) => t.is_approved);
  }
  return list.sort((a, b) => a.display_order - b.display_order);
}

export async function saveTestimonial(testimonial: Partial<Testimonial> & { client_name: string; feedback: string }): Promise<Testimonial> {
  const data = readData();
  if (testimonial.id) {
    const idx = data.testimonials.findIndex((t) => t.id === testimonial.id);
    if (idx !== -1) {
      data.testimonials[idx] = {
        ...data.testimonials[idx],
        ...testimonial,
        updated_at: new Date().toISOString(),
      };
      writeData(data);
      return data.testimonials[idx];
    }
  }
  const newTst: Testimonial = {
    id: testimonial.id || `tst-${Date.now()}`,
    client_name: testimonial.client_name,
    designation: testimonial.designation,
    company_name: testimonial.company_name || "",
    client_image: testimonial.client_image || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    rating: testimonial.rating || 5,
    feedback: testimonial.feedback,
    project_id: testimonial.project_id,
    project_name: testimonial.project_name,
    is_approved: testimonial.is_approved ?? true,
    display_order: testimonial.display_order ?? data.testimonials.length + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  data.testimonials.push(newTst);
  writeData(data);
  return newTst;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const data = readData();
  data.testimonials = data.testimonials.filter((t) => t.id !== id);
  writeData(data);
  return true;
}

// 9. Pricing Packages
export async function getPricingPackages(onlyPublished = false): Promise<PricingPackage[]> {
  const data = readData();
  let list = data.pricingPackages || [];
  if (onlyPublished) {
    list = list.filter((p) => p.is_published);
  }
  return list.sort((a, b) => a.display_order - b.display_order);
}

export async function savePricingPackage(pkg: Partial<PricingPackage> & { name: string; price: string }): Promise<PricingPackage> {
  const data = readData();
  if (pkg.id) {
    const idx = data.pricingPackages.findIndex((p) => p.id === pkg.id);
    if (idx !== -1) {
      data.pricingPackages[idx] = {
        ...data.pricingPackages[idx],
        ...pkg,
        updated_at: new Date().toISOString(),
      };
      writeData(data);
      return data.pricingPackages[idx];
    }
  }
  const newPkg: PricingPackage = {
    id: pkg.id || `pkg-${Date.now()}`,
    name: pkg.name,
    service_id: pkg.service_id,
    service_name: pkg.service_name || "General",
    price: pkg.price,
    numeric_price: pkg.numeric_price ?? 0,
    currency: pkg.currency || "USD",
    billing_type: pkg.billing_type || "one-time",
    description: pkg.description || "",
    features: pkg.features || [],
    is_popular: pkg.is_popular ?? false,
    is_published: pkg.is_published ?? true,
    display_order: pkg.display_order ?? data.pricingPackages.length + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  data.pricingPackages.push(newPkg);
  writeData(data);
  return newPkg;
}

export async function deletePricingPackage(id: string): Promise<boolean> {
  const data = readData();
  data.pricingPackages = data.pricingPackages.filter((p) => p.id !== id);
  writeData(data);
  return true;
}

// 10. FAQs
export async function getFaqs(onlyActive = false): Promise<Faq[]> {
  const data = readData();
  let list = data.faqs || [];
  if (onlyActive) {
    list = list.filter((f) => f.is_active);
  }
  return list.sort((a, b) => a.display_order - b.display_order);
}

export async function saveFaq(faq: Partial<Faq> & { question: string; answer: string }): Promise<Faq> {
  const data = readData();
  if (faq.id) {
    const idx = data.faqs.findIndex((f) => f.id === faq.id);
    if (idx !== -1) {
      data.faqs[idx] = {
        ...data.faqs[idx],
        ...faq,
        updated_at: new Date().toISOString(),
      };
      writeData(data);
      return data.faqs[idx];
    }
  }
  const newFaq: Faq = {
    id: faq.id || `faq-${Date.now()}`,
    question: faq.question,
    answer: faq.answer,
    category: faq.category || "General",
    display_order: faq.display_order ?? data.faqs.length + 1,
    is_active: faq.is_active ?? true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  data.faqs.push(newFaq);
  writeData(data);
  return newFaq;
}

export async function deleteFaq(id: string): Promise<boolean> {
  const data = readData();
  data.faqs = data.faqs.filter((f) => f.id !== id);
  writeData(data);
  return true;
}

// 11. Contact Inquiries
export async function getContactInquiries(): Promise<ContactInquiry[]> {
  const data = readData();
  return (data.contactInquiries || []).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function saveContactInquiry(inquiry: {
  full_name: string;
  email: string;
  phone_number?: string;
  company_name?: string;
  service_interested: string;
  estimated_budget?: string;
  project_description: string;
}): Promise<ContactInquiry> {
  const data = readData();
  const newInq: ContactInquiry = {
    id: `inq-${Date.now()}`,
    full_name: inquiry.full_name,
    email: inquiry.email,
    phone_number: inquiry.phone_number,
    company_name: inquiry.company_name,
    service_interested: inquiry.service_interested,
    estimated_budget: inquiry.estimated_budget,
    project_description: inquiry.project_description,
    status: "New",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  data.contactInquiries.unshift(newInq);
  writeData(data);
  return newInq;
}

export async function updateInquiryStatus(id: string, status: InquiryStatus): Promise<boolean> {
  const data = readData();
  const item = data.contactInquiries.find((i) => i.id === id);
  if (item) {
    item.status = status;
    item.updated_at = new Date().toISOString();
    writeData(data);
    return true;
  }
  return false;
}

export async function deleteContactInquiry(id: string): Promise<boolean> {
  const data = readData();
  data.contactInquiries = data.contactInquiries.filter((i) => i.id !== id);
  writeData(data);
  return true;
}

// 12. Social Links & Navigation
export async function getSocialLinks(): Promise<SocialLink[]> {
  const data = readData();
  return (data.socialLinks || []).sort((a, b) => a.display_order - b.display_order);
}

export async function saveSocialLink(link: Partial<SocialLink> & { platform: string; url: string }): Promise<SocialLink> {
  const data = readData();
  if (link.id) {
    const idx = data.socialLinks.findIndex((s) => s.id === link.id);
    if (idx !== -1) {
      data.socialLinks[idx] = { ...data.socialLinks[idx], ...link };
      writeData(data);
      return data.socialLinks[idx];
    }
  }
  const newLink: SocialLink = {
    id: link.id || `soc-${Date.now()}`,
    platform: link.platform,
    url: link.url,
    icon_name: link.icon_name || "Globe",
    display_order: link.display_order ?? data.socialLinks.length + 1,
    is_active: link.is_active ?? true,
    created_at: new Date().toISOString(),
  };
  data.socialLinks.push(newLink);
  writeData(data);
  return newLink;
}

export async function getNavigationItems(): Promise<NavigationItem[]> {
  const data = readData();
  return (data.navigationItems || []).sort((a, b) => a.display_order - b.display_order);
}

// 13. Dashboard Real Metrics
export async function getDashboardMetrics() {
  const data = readData();
  const totalInquiries = data.contactInquiries.length;
  const newInquiries = data.contactInquiries.filter((i) => i.status === "New").length;
  const totalProjects = data.projects.length;
  const totalServices = data.services.length;
  const publishedTestimonials = data.testimonials.filter((t) => t.is_approved).length;
  const activeTeamMembers = data.teamMembers.filter((m) => m.is_active).length;

  return {
    totalInquiries,
    newInquiries,
    totalProjects,
    totalServices,
    publishedTestimonials,
    activeTeamMembers,
    recentInquiries: data.contactInquiries.slice(0, 5),
    recentProjects: data.projects.slice(0, 4),
  };
}

