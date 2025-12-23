"use client";

import { useState, useRef } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from "next/navigation";

export function ContactForm() {
  const t = useTranslations('Contact');
  const locale = useLocale();
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  // Remove submitted state, use router for redirect
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check honeypot
    if (formData.honeypot) {
      return;
    }

    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.country || !formData.subject || !formData.message) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      // Create a hidden form that submits to Google Forms
      const form = document.createElement('form');
      form.action = 'https://docs.google.com/forms/d/e/1FAIpQLSdSs_m4wi7gyHN3CrzAUcLVP4jBmmXDAghslEQQ-gDK7V94rg/formResponse';
      form.method = 'POST';
      form.target = 'hidden_iframe';
      form.style.display = 'none';

      // Map form fields to Google Form entry IDs
      const fields: Record<string, string> = {
        'entry.377608779': formData.fullName,
        'entry.246526021': formData.email,
        'entry.218981205': formData.phone || '',
        'entry.275916791': formData.company || '',
        'entry.952443479': formData.country || '',
        'entry.378912780': formData.subject,
        'entry.1546397977': formData.message,
      };

      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

      // Clean up
      setTimeout(() => {
        document.body.removeChild(form);
      }, 1000);

      console.log("Form submitted to Google Forms");

      // Redirect to thank you page after submission
      setTimeout(() => {
        router.push(`/${locale}/thank-you`);
      }, 500);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Hidden iframe to receive Google Form submission */}
      <iframe
        name="hidden_iframe"
        id="hidden_iframe"
        style={{ display: 'none' }}
        ref={iframeRef}
      ></iframe>

      <section id="contact" className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                {t('title')}
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                {t('subtitle')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
              {/* Honeypot field */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  {t('fullName')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                  placeholder={t('fullNamePlaceholder')}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  {t('email')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                  placeholder={t('emailPlaceholder')}
                />
              </div>

              {/* Phone (Optional) */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  {t('phone')} <span className="text-gray-500 text-xs">{t('optional')}</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                  placeholder={t('phonePlaceholder')}
                />
              </div>

              {/* Company (Optional) */}
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  {t('company')} <span className="text-gray-500 text-xs">{t('optional')}</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                  placeholder={t('companyPlaceholder')}
                />
              </div>

              {/* Country */}
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  {t('country')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                  placeholder={t('countryPlaceholder')}
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  {t('subject')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                  placeholder={t('subjectPlaceholder')}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  {t('message')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition resize-none"
                  placeholder={t('messagePlaceholder')}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold transition duration-200 text-lg"
              >
                {isLoading ? t('sending') : t('submit')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
