-- UPGRADE MARKETING AGENCY - SUPABASE SCHEMA MIGRATION
-- Enables UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES & ROLES
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SITE SETTINGS
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT 'primary',
  agency_name TEXT NOT NULL DEFAULT 'Upgrade Marketing Agency',
  tagline TEXT NOT NULL DEFAULT 'We Don''t Just Market Brands. We Make Them Unforgettable.',
  logo_url TEXT NOT NULL DEFAULT '/images/logo.png',
  favicon_url TEXT NOT NULL DEFAULT '/images/logo.png',
  contact_email TEXT NOT NULL DEFAULT 'contact@upgrademarketing.agency',
  phone_number TEXT NOT NULL DEFAULT '+1 (800) 459-8743',
  whatsapp_number TEXT NOT NULL DEFAULT '+1 (800) 459-8743',
  office_address TEXT NOT NULL,
  business_hours TEXT NOT NULL,
  google_maps_embed TEXT,
  footer_copyright TEXT NOT NULL,
  primary_color TEXT DEFAULT '#080808',
  secondary_color TEXT DEFAULT '#D6A64B',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. HOMEPAGE SECTIONS
CREATE TABLE IF NOT EXISTS homepage_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_key TEXT UNIQUE NOT NULL,
  badge TEXT,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  cta_text TEXT,
  cta_link TEXT,
  image_url TEXT,
  video_url TEXT,
  is_visible BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. STATISTICS
CREATE TABLE IF NOT EXISTS statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  numeric_value NUMERIC DEFAULT 0,
  suffix TEXT DEFAULT '+',
  prefix TEXT,
  description TEXT,
  display_order INT DEFAULT 1,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SERVICE CATEGORIES
CREATE TABLE IF NOT EXISTS service_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  display_order INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. SERVICES
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES service_categories(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  icon_name TEXT DEFAULT 'Sparkles',
  cover_image TEXT NOT NULL,
  features JSONB DEFAULT '[]'::jsonb,
  benefits JSONB DEFAULT '[]'::jsonb,
  starting_price TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SERVICE FEATURES
CREATE TABLE IF NOT EXISTS service_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  feature_text TEXT NOT NULL,
  display_order INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. PROJECT CATEGORIES
CREATE TABLE IF NOT EXISTS project_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  display_order INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. PROJECTS
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES project_categories(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  client_name TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  objectives TEXT,
  approach TEXT,
  results TEXT,
  cover_image TEXT NOT NULL,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  completion_date DATE,
  live_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. PROJECT IMAGES
CREATE TABLE IF NOT EXISTS project_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. TEAM MEMBERS
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  bio TEXT NOT NULL,
  profile_photo TEXT NOT NULL,
  skills JSONB DEFAULT '[]'::jsonb,
  linkedin_url TEXT,
  twitter_url TEXT,
  instagram_url TEXT,
  github_url TEXT,
  display_order INT DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. TESTIMONIALS
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  designation TEXT,
  company_name TEXT NOT NULL,
  client_image TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT NOT NULL,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  is_approved BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. PRICING PACKAGES
CREATE TABLE IF NOT EXISTS pricing_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  numeric_price NUMERIC DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  billing_type TEXT DEFAULT 'one-time',
  description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  is_popular BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. PRICING FEATURES
CREATE TABLE IF NOT EXISTS pricing_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  package_id UUID NOT NULL REFERENCES pricing_packages(id) ON DELETE CASCADE,
  feature_text TEXT NOT NULL,
  is_included BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. FAQS
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  display_order INT DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. CONTACT INQUIRIES
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT,
  company_name TEXT,
  service_interested TEXT NOT NULL,
  estimated_budget TEXT,
  project_description TEXT NOT NULL,
  status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'In Discussion', 'Proposal Sent', 'Converted', 'Closed')),
  assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. INQUIRY NOTES
CREATE TABLE IF NOT EXISTS inquiry_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inquiry_id UUID NOT NULL REFERENCES contact_inquiries(id) ON DELETE CASCADE,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  note_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. MEDIA ASSETS
CREATE TABLE IF NOT EXISTS media_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  folder TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. NAVIGATION ITEMS
CREATE TABLE IF NOT EXISTS navigation_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  is_external BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 1,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. SOCIAL LINKS
CREATE TABLE IF NOT EXISTS social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon_name TEXT DEFAULT 'Globe',
  display_order INT DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 21. NEWSLETTER SUBSCRIBERS
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'subscribed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 22. PAGE SEO
CREATE TABLE IF NOT EXISTS page_seo (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_route TEXT UNIQUE NOT NULL,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  keywords TEXT,
  og_image_url TEXT,
  canonical_url TEXT,
  is_indexed BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 23. PAGE CONTENT
CREATE TABLE IF NOT EXISTS page_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_slug TEXT NOT NULL,
  section_identifier TEXT NOT NULL,
  title TEXT,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page_slug, section_identifier)
);

-- 24. ACTIVITY LOGS
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_email TEXT NOT NULL,
  action_type TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_published ON services(is_published);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON contact_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON contact_inquiries(created_at DESC);

-- ROW LEVEL SECURITY (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES
CREATE POLICY "Public can view site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public can view homepage sections" ON homepage_sections FOR SELECT USING (is_visible = true);
CREATE POLICY "Public can view statistics" ON statistics FOR SELECT USING (is_visible = true);
CREATE POLICY "Public can view published services" ON services FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view service categories" ON service_categories FOR SELECT USING (true);
CREATE POLICY "Public can view published projects" ON projects FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view project categories" ON project_categories FOR SELECT USING (true);
CREATE POLICY "Public can view active team members" ON team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view approved testimonials" ON testimonials FOR SELECT USING (is_approved = true);
CREATE POLICY "Public can view published pricing" ON pricing_packages FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view active faqs" ON faqs FOR SELECT USING (is_active = true);

-- PUBLIC INSERT POLICIES FOR INQUIRIES & NEWSLETTER
CREATE POLICY "Public can submit contact inquiry" ON contact_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can subscribe to newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- ADMIN FULL ACCESS POLICIES
CREATE POLICY "Admins full access site settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access team" ON team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access pricing" ON pricing_packages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access inquiries" ON contact_inquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access faqs" ON faqs FOR ALL USING (auth.role() = 'authenticated');

