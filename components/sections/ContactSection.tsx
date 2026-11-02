"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { SiteSettings } from "@/lib/types/database";

interface ContactSectionProps {
  settings?: SiteSettings;
  title?: string;
  subtitle?: string;
}

export default function ContactSection({
  settings,
  title = "Let's Create Something Extraordinary",
  subtitle = "Tell us about your brand ambitions and let our senior partners engineer a custom strategy.",
}: ContactSectionProps) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    company_name: "",
    service_interested: "Branding & Visual Identity",
    estimated_budget: "$5,000 - $10,000",
    project_description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.full_name || !formData.email || !formData.project_description) {
      toast.error("Please fill in your name, email, and project description.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(
          "Inquiry received! Our executive team will review and reply within 24 hours."
        );
        setIsSuccess(true);
        setFormData({
          full_name: "",
          email: "",
          phone_number: "",
          company_name: "",
          service_interested: "Branding & Visual Identity",
          estimated_budget: "$5,000 - $10,000",
          project_description: "",
        });
      } else {
        toast.error(data.message || (data.errors && data.errors[0]) || "Submission failed");
      }
    } catch {
      toast.error("Network error while submitting. Please try again or message via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const phone = settings?.phone_number || "+1 (800) 459-8743";
  const email = settings?.contact_email || "contact@upgrademarketing.agency";
  const whatsapp = settings?.whatsapp_number || "+1 (800) 459-8743";
  const address = settings?.office_address || "Level 24, Prestige Tower, Financial District, Colombo / Global Remote";
  const hours = settings?.business_hours || "Monday - Friday: 9:00 AM - 6:00 PM (EST)";
  const mapUrl = settings?.google_maps_embed || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.58585987399!2d79.78616428718991!3d6.921837369623869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1714500000000!5m2!1sen!2sus";

  return (
    <section id="contact" className="py-20 bg-[#080808] relative overflow-hidden border-t border-[rgba(214,166,75,0.15)] scroll-mt-20 lg:scroll-mt-24">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#D6A64B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-[#D6A64B]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6A64B]" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-[#E8C477]">
              Get In Touch
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            {title}
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Left Column: Form (Span 7) */}
          <div className="lg:col-span-7 p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-[#111111] border border-[rgba(214,166,75,0.25)] shadow-2xl">
            {isSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#D6A64B]/20 border border-[#D6A64B] flex items-center justify-center text-[#E8C477] mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Inquiry Successfully Received</h3>
                <p className="text-sm text-zinc-400 max-w-md mx-auto">
                  Thank you for reaching out to Upgrade Marketing Agency. Our partners are reviewing
                  your project specifications and will follow up shortly.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#171717] border border-[#D6A64B]/40 text-xs font-bold text-[#E8C477] hover:border-[#D6A64B]"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Full Name */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                      Full Name <span className="text-[#D6A64B]">*</span>
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="e.g. Alexander Vance"
                      required
                      className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#D6A64B] transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                      Corporate Email <span className="text-[#D6A64B]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. name@company.com"
                      required
                      className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#D6A64B] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Phone */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#D6A64B] transition-colors"
                    />
                  </div>

                  {/* Company Name */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                      Company / Brand Name
                    </label>
                    <input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      placeholder="e.g. Aura Fragrances"
                      className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#D6A64B] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Service Interested In */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                      Service Interested In
                    </label>
                    <select
                      name="service_interested"
                      value={formData.service_interested}
                      onChange={handleChange}
                      className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#D6A64B] transition-colors"
                    >
                      <option value="Branding & Visual Identity">Branding & Visual Identity</option>
                      <option value="Graphic Design & Packaging">Graphic Design & Packaging</option>
                      <option value="Social Media Management">Social Media Management</option>
                      <option value="Performance Digital Marketing">Performance Digital Marketing</option>
                      <option value="Website Design & Development">Website Design & Development</option>
                      <option value="Cinematic Video Production">Cinematic Video Production</option>
                      <option value="Commercial Photography">Commercial Photography</option>
                      <option value="Comprehensive Agency Retainer">Comprehensive Agency Retainer</option>
                    </select>
                  </div>

                  {/* Estimated Budget */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                      Estimated Budget
                    </label>
                    <select
                      name="estimated_budget"
                      value={formData.estimated_budget}
                      onChange={handleChange}
                      className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#D6A64B] transition-colors"
                    >
                      <option value="Under $5,000">Under $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                      <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                      <option value="$50,000+">$50,000+ (Enterprise)</option>
                    </select>
                  </div>
                </div>

                {/* Project Description */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                    Project Description & Goals <span className="text-[#D6A64B]">*</span>
                  </label>
                  <textarea
                    name="project_description"
                    rows={4}
                    value={formData.project_description}
                    onChange={handleChange}
                    placeholder="Provide a high-level briefing of your objectives, timelines, and current bottlenecks..."
                    required
                    className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#D6A64B] transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#F5DFA9] via-[#D6A64B] to-[#99732B] text-[#080808] font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(214,166,75,0.3)] hover:shadow-[0_0_35px_rgba(214,166,75,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Submitting Inquiry..." : "Submit Project Inquiry"}</span>
                </button>

                <p className="text-[11px] text-center text-zinc-500 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#D6A64B]" />
                  <span>Strict NDA and executive confidentiality observed on all inquiries.</span>
                </p>
              </form>
            )}
          </div>

          {/* Right Column: Contact Details, WhatsApp CTA, Google Maps (Span 5) */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            {/* WhatsApp Fast CTA Card */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[#111111] border border-[#25D366]/40 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#25D366] font-bold">
                  Instant Messaging
                </span>
                <h4 className="text-white font-bold text-sm sm:text-base">Direct WhatsApp Line</h4>
                <p className="text-xs text-zinc-400">Speak with our creative producer right now</p>
              </div>
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-[#25D366] text-black font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#20ba5a] transition-colors shadow-md shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Now</span>
              </a>
            </div>

            {/* Direct Information Card */}
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#111111] border border-[rgba(214,166,75,0.22)] space-y-5 sm:space-y-6">
              <h3 className="text-base sm:text-lg font-bold text-white border-l-2 border-[#D6A64B] pl-3">
                Agency Headquarters
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#171717] border border-[#D6A64B]/30 flex items-center justify-center text-[#E8C477] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-white">Office Location</h5>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#171717] border border-[#D6A64B]/30 flex items-center justify-center text-[#E8C477] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-white">Direct Email</h5>
                    <a
                      href={`mailto:${email}`}
                      className="text-xs text-[#E8C477] hover:underline mt-0.5 block"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#171717] border border-[#D6A64B]/30 flex items-center justify-center text-[#E8C477] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-white">Telephone</h5>
                    <a
                      href={`tel:${phone}`}
                      className="text-xs text-zinc-300 hover:text-white mt-0.5 block"
                    >
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#171717] border border-[#D6A64B]/30 flex items-center justify-center text-[#E8C477] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-white">Operational Hours</h5>
                    <p className="text-xs text-zinc-400 mt-0.5">{hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden border border-[rgba(214,166,75,0.22)] h-56 bg-zinc-900 relative">
              <iframe
                title="Office Location Map"
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(120%)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

