"use client";

import { useState } from "react";

export function ContactForm() {
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

      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
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
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-900 text-white">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              let's get started
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              It's time to delight your customers and accelerate your business.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-2">
              <p className="text-lg font-semibold text-green-400">
                Sweet. See you in the inbox!
              </p>
              <p className="text-gray-400">
                We'll get back to you shortly with next steps.
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
                  ARE YOU REPRESENTING A COMPANY? <span className="text-red-500">*</span>
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
                    <span className="text-gray-300">Yes, I represent a company</span>
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
                    <span className="text-gray-300">No, I'm an individual</span>
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
                      COMPANY NAME <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required={formData.entityType === "company"}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                      placeholder="Your Company Name"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      COUNTRY <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required={formData.entityType === "company"}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                      placeholder="Your Country"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      PHONE NUMBER <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required={formData.entityType === "company"}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                      placeholder="+1 (555) 123-4567"
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
                  EMAIL <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                  placeholder="your@email.com"
                />
              </div>

              {/* Product Information Section */}
              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">
                  Product Information <span className="text-sm text-gray-500">(Optional)</span>
                </h3>

                {/* Product Name */}
                <div className="mb-6">
                  <label
                    htmlFor="productName"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    PRODUCT NAME
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                    placeholder="Name of your product or service"
                  />
                </div>

                {/* Product Details */}
                <div>
                  <label
                    htmlFor="productDetails"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    PRODUCT DETAILS
                  </label>
                  <textarea
                    id="productDetails"
                    name="productDetails"
                    value={formData.productDetails}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition resize-none"
                    placeholder="Describe your product or service..."
                  />
                </div>
              </div>

              {/* Budget */}
              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  BUDGET (USD) <span className="text-red-500">*</span>
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500 transition"
                >
                  <option value="">Select a budget range</option>
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
                  PREFERRED CONTACT METHOD <span className="text-red-500">*</span>
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
                {isLoading ? "Sending..." : "Book consultation"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
