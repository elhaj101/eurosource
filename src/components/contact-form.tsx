"use client";

import { useState, useRef } from "react";
import { useTranslations } from 'next-intl';

export function ContactForm() {
  const t = useTranslations('Contact');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [formData, setFormData] = useState({
    entityType: "", // "company" or "individual"
    companyName: "",
    country: "",
    email: "",
    phone: "",
    productName: "",
    productDetails: "",
    budget: "",
    contactMethod: "", // "email" or "whatsapp"
    honeypot: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check honeypot
    if (formData.honeypot) {
      return;
    }

    // Validate required fields
    if (!formData.entityType || !formData.email || !formData.budget || !formData.contactMethod) {
      alert("Please fill in all required fields");
      return;
    }

    if (formData.entityType === "company" && (!formData.companyName || !formData.country || !formData.phone)) {
      alert("Please fill in all company required fields");
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

      // Add all form fields as hidden inputs
      // Map values to match EXACT Google Form option text
      const budgetMap: Record<string, string> = {
        "under-5k": "under 5,000",
        "5k-10k": "5,000 - 10,000",
        "10k-25k": "10,000 - 25,000",
        "25k-50k": "25,000 - 50,000",
        "50k-100k": "50,000 - 100,000",
        "100k+": "100,000+"
      };

      const fields: Record<string, string> = {
        'entry.377608779': formData.entityType === 'company' ? 'Yes, I represent a company' : "No, I'm an individual",
        'entry.275916791': formData.companyName || '',
        'entry.952443479': formData.country || '',
        'entry.246526021': formData.email,
        'entry.218981205': formData.phone || '',
        'entry.378912780': formData.productName || '',
        'entry.1546397977': formData.productDetails || '',
        'entry.1663388540': budgetMap[formData.budget] || formData.budget,
        'entry.545241450': formData.contactMethod, // Send as-is: "email" or "whatsapp"
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

      setSubmitted(true);
      setFormData({
        entityType: "",
        companyName: "",
        country: "",
        email: "",
        phone: "",
        productName: "",
        productDetails: "",
        budget: "",
        contactMethod: "",
        honeypot: "",
      });
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

            {submitted ? (
              <div className="text-center py-8 space-y-2">
                <p className="text-lg font-semibold text-green-400">
                  {t('successTitle')}
                </p>
                <p className="text-gray-400">
                  {t('successSubtitle')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
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

                {/* Entity Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    {t('entityType')} <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="entityType"
                        value="company"
                        checked={formData.entityType === "company"}
                        onChange={handleChange}
                        className="w-4 h-4 mr-3"
                      />
                      <span className="text-gray-300">{t('yesCompany')}</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="entityType"
                        value="individual"
                        checked={formData.entityType === "individual"}
                        onChange={handleChange}
                        className="w-4 h-4 mr-3"
                      />
                      <span className="text-gray-300">{t('noIndividual')}</span>
                    </label>
                  </div>
                </div>

                {/* Company Fields (conditional) */}
                {formData.entityType === "company" && (
                  <div className="space-y-6 border-l-2 border-blue-500 pl-6">
                    {/* Company Name */}
                    <div>
                      <label
                        htmlFor="companyName"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        {t('companyName')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required={formData.entityType === "company"}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                        placeholder={t('companyNamePlaceholder')}
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
                        required={formData.entityType === "company"}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                        placeholder={t('countryPlaceholder')}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        {t('phone')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required={formData.entityType === "company"}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                        placeholder={t('phonePlaceholder')}
                      />
                    </div>
                  </div>
                )}

                {/* Email (always required) */}
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

                {/* Product Information Section */}
                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-lg font-semibold text-gray-300 mb-4">
                    {t('productInfo')} <span className="text-sm text-gray-500">{t('optional')}</span>
                  </h3>

                  {/* Product Name */}
                  <div className="mb-6">
                    <label
                      htmlFor="productName"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      {t('productName')}
                    </label>
                    <input
                      type="text"
                      id="productName"
                      name="productName"
                      value={formData.productName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                      placeholder={t('productNamePlaceholder')}
                    />
                  </div>

                  {/* Product Details */}
                  <div>
                    <label
                      htmlFor="productDetails"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      {t('productDetails')}
                    </label>
                    <textarea
                      id="productDetails"
                      name="productDetails"
                      value={formData.productDetails}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition resize-none"
                      placeholder={t('productDetailsPlaceholder')}
                    />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    {t('budget')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500 transition"
                  >
                    <option value="">{t('selectBudget')}</option>
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="100k+">$100,000+</option>
                  </select>
                </div>

                {/* Contact Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    {t('contactMethod')} <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="email"
                        checked={formData.contactMethod === "email"}
                        onChange={handleChange}
                        className="w-4 h-4 mr-3"
                      />
                      <span className="text-gray-300">Email</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="whatsapp"
                        checked={formData.contactMethod === "whatsapp"}
                        onChange={handleChange}
                        className="w-4 h-4 mr-3"
                      />
                      <span className="text-gray-300">WhatsApp</span>
                    </label>
                  </div>
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
            )}
          </div>
        </div>
      </section>
    </>
  );
}
