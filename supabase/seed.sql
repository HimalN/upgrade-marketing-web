-- UPGRADE MARKETING AGENCY - SEED DATA

INSERT INTO site_settings (
  id, agency_name, tagline, logo_url, favicon_url, contact_email,
  phone_number, whatsapp_number, office_address, business_hours,
  google_maps_embed, footer_copyright, primary_color, secondary_color
) VALUES (
  'primary',
  'Upgrade Marketing Agency',
  'We Don''t Just Market Brands. We Make Them Unforgettable.',
  '/images/logo.png',
  '/images/logo.png',
  'contact@upgrademarketing.agency',
  '+1 (800) 459-8743',
  '+1 (800) 459-8743',
  'Level 24, Prestige Tower, Financial District, Colombo / Global Remote',
  'Monday - Friday: 9:00 AM - 6:00 PM (EST)',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.58585987399!2d79.78616428718991!3d6.921837369623869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1714500000000!5m2!1sen!2sus',
  '© 2026 Upgrade Marketing Agency. All rights reserved. Crafting bold legacy brands.',
  '#080808',
  '#D6A64B'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO statistics (label, value, numeric_value, suffix, description, display_order, is_visible)
VALUES
  ('Projects Completed', '250+', 250, '+', 'Delivered on-time and with distinction', 1, true),
  ('Happy Clients', '120+', 120, '+', 'Across 14 international markets', 2, true),
  ('Years of Experience', '8+', 8, '+', 'Pioneering creative market solutions', 3, true),
  ('Client Satisfaction', '99.4%', 99.4, '%', 'Unmatched client loyalty & retention', 4, true);

INSERT INTO project_categories (id, name, slug, description, display_order)
VALUES
  ('11111111-1111-1111-1111-111111111101', 'Branding', 'branding', 'Identity systems and brand bibles', 1),
  ('11111111-1111-1111-1111-111111111102', 'Web Design', 'web-design', 'Digital flagships and web applications', 2),
  ('11111111-1111-1111-1111-111111111103', 'Digital Marketing', 'digital-marketing', 'Paid growth and multi-channel campaigns', 3),
  ('11111111-1111-1111-1111-111111111104', 'Video Production', 'video-production', 'Commercials and cinematic stories', 4),
  ('11111111-1111-1111-1111-111111111105', 'Graphic & Packaging', 'graphic-packaging', 'Physical and editorial packaging', 5)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO services (title, slug, short_description, full_description, icon_name, cover_image, starting_price, is_featured, is_published, display_order)
VALUES
  ('Branding & Visual Identity', 'branding-and-visual-identity', 'Transformative brand identities, luxury logo suites, typography guidelines, and complete corporate design systems.', 'A brand is not just a logo; it is the emotional signature that lives in the mind of your consumer. We create holistic identity ecosystems that embody prestige, inspire trust, and carve an unforgettable market presence.', 'Crown', 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80', '$1,800', true, true, 1),
  ('Graphic Design & Packaging', 'graphic-design-and-packaging', 'High-end product packaging, luxury print collateral, promotional artwork, and bespoke marketing collateral.', 'In physical and digital shelf environments, design either commands attention or disappears. We craft tactile, visually commanding packaging and collateral designed to win buyer desire instantly.', 'Palette', 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80', '$1,200', true, true, 2),
  ('Social Media Management', 'social-media-management', 'Curated social aesthetics, viral content creation, community engagement, and algorithmic audience growth.', 'We turn social channels into high-converting branded magazines. Through cohesive visual direction, cinematic reels, and strategic storytelling, your accounts will build an obsessed following.', 'Share2', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80', '$1,500/mo', true, true, 3),
  ('Performance Digital Marketing', 'performance-digital-marketing', 'Data-driven Meta, Google, and LinkedIn ad campaigns optimized for maximum return on ad spend (ROAS).', 'Creativity without conversion is vanity. We combine laser-targeted media buying, high-converting ad creatives, and aggressive conversion funnel optimization to fuel scalable revenue.', 'TrendingUp', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80', '$2,000/mo', true, true, 4),
  ('Website Design & Development', 'website-design-and-development', 'Bespoke, lightning-fast web applications, luxury e-commerce platforms, and interactive digital experiences.', 'Your digital flagship should be as impressive as a luxury showroom. We engineer bespoke web experiences using Next.js, headless CMS, and smooth animations that convert visitors into loyal clients.', 'Globe', 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80', '$3,200', true, true, 5),
  ('Cinematic Video Production', 'cinematic-video-production', 'Television commercials, luxury brand films, promotional documentaries, and high-impact social clips.', 'Video is the undisputed medium of emotion. Our production crew combines cinematic 4K/6K cinema cameras, high-concept directing, and Hollywood-grade color grading to tell your brand story.', 'Video', 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80', '$2,500', true, true, 6)
ON CONFLICT (slug) DO NOTHING;

