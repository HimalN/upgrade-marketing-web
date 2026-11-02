export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "admin" | "super_admin" | "editor";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  agency_name: string;
  tagline: string;
  logo_url: string;
  favicon_url: string;
  contact_email: string;
  phone_number: string;
  whatsapp_number: string;
  office_address: string;
  business_hours: string;
  google_maps_embed: string;
  footer_copyright: string;
  primary_color: string;
  secondary_color: string;
  created_at: string;
  updated_at: string;
}

export interface HomepageSection {
  id: string;
  section_key: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  cta_text?: string;
  cta_link?: string;
  image_url?: string;
  video_url?: string;
  is_visible: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Statistic {
  id: string;
  label: string;
  value: string;
  numeric_value: number;
  suffix: string;
  prefix?: string;
  description?: string;
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceFeature {
  id: string;
  service_id: string;
  feature_text: string;
  display_order: number;
  created_at: string;
}

export interface Service {
  id: string;
  category_id?: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  icon_name: string;
  cover_image: string;
  features: string[];
  benefits: string[];
  starting_price?: string;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  caption?: string;
  display_order: number;
  created_at: string;
}

export interface Project {
  id: string;
  category_id: string;
  category_name?: string;
  title: string;
  slug: string;
  client_name: string;
  short_description: string;
  full_description: string;
  objectives?: string;
  approach?: string;
  results?: string;
  cover_image: string;
  gallery_images: string[];
  completion_date?: string;
  live_url?: string;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  bio: string;
  profile_photo: string;
  skills: string[];
  linkedin_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  github_url?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  designation?: string;
  company_name: string;
  client_image: string;
  rating: number;
  feedback: string;
  project_id?: string;
  project_name?: string;
  is_approved: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface PricingFeature {
  id: string;
  package_id: string;
  feature_text: string;
  is_included: boolean;
  display_order: number;
  created_at: string;
}

export interface PricingPackage {
  id: string;
  service_id?: string;
  service_name?: string;
  name: string;
  price: string;
  numeric_price: number;
  currency: string;
  billing_type: "one-time" | "monthly" | "custom" | "starting-at";
  description: string;
  features: string[];
  is_popular: boolean;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type InquiryStatus =
  | "New"
  | "Contacted"
  | "In Discussion"
  | "Proposal Sent"
  | "Converted"
  | "Closed";

export interface ContactInquiry {
  id: string;
  full_name: string;
  email: string;
  phone_number?: string;
  company_name?: string;
  service_interested: string;
  estimated_budget?: string;
  project_description: string;
  status: InquiryStatus;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}

export interface InquiryNote {
  id: string;
  inquiry_id: string;
  author_id: string;
  author_name: string;
  note_text: string;
  created_at: string;
}

export interface MediaAsset {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  folder?: string;
  created_at: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  is_external: boolean;
  display_order: number;
  is_visible: boolean;
  created_at: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon_name: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  status: "subscribed" | "unsubscribed";
  created_at: string;
}

export interface PageSeo {
  id: string;
  page_route: string;
  meta_title: string;
  meta_description: string;
  keywords?: string;
  og_image_url?: string;
  canonical_url?: string;
  is_indexed: boolean;
  created_at: string;
  updated_at: string;
}

export interface PageContent {
  id: string;
  page_slug: string;
  section_identifier: string;
  title?: string;
  content: Json;
  created_at: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  actor_email: string;
  action_type: string;
  entity_type: string;
  entity_id?: string;
  details?: string;
  created_at: string;
}

