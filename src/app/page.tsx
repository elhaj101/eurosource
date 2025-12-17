"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Hero } from "@/components/ui/hero";
import { CyclingCountry } from "@/components/ui/cycling-country";
import { Features } from "@/components/ui/features-4";
import { Gallery4 } from "@/components/ui/gallery4";
import { ContactForm } from "@/components/contact-form";
import { IconCloudSkeleton } from "@/components/suspense-boundary";

const IconCloudDemo = dynamic(
  () => import("@/components/ui/demo-icon-cloud").then(mod => ({ default: mod.IconCloudDemo })),
  { ssr: false, loading: () => <IconCloudSkeleton /> }
);

export default function Home() {
  const scrollToForm = () => {
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Logo - Fixed top-left with fade-in */}
      <div className="fixed top-6 left-6 z-40 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold text-white">EuroSource</h1>
      </div>

      {/* Contact Button - Fixed top-right */}
      <button
        onClick={scrollToForm}
        className="btn-donate fixed top-6 right-6 z-40"
      >
        Contact Us
      </button>

      {/* Hero Section */}
      <Hero
        backgroundImage="/shipping-container-eu-2.webp"
        title={<>Order products from <span className="inline-block w-48"><CyclingCountry /></span></>}
        gradient={false}
        titleClassName="text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-lg"
        className="min-h-screen"
      />

      {/* Features Section */}
      <section className="w-full bg-gray-50 relative">
        <Features />
      </section>

      {/* Gallery Section */}
      <section className="w-full bg-white">
        <Gallery4 
          title="Import from European companies directly"
          description="Connect directly with top European manufacturers and suppliers across multiple industries. Our curated selection includes automotive components, industrial equipment, furniture, packaging solutions, and consumer products. Each supplier has been vetted for quality, reliability, and competitive pricing. Start your sourcing journey today with access to Europe's most trusted suppliers."
        />
      </section>

      {/* Marketing Body 2 */}
      <section id="marketing2" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">Why Choose EuroSource?</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Partner with Europe's most trusted sourcing solution for direct access to premium manufacturers and suppliers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-2xl font-semibold mb-4">Direct European Sourcing</h4>
              <p className="text-gray-600 mb-4">We connect you directly with vetted manufacturers across Germany, France, Poland, and other EU countries.</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Access to 1+ million verified European suppliers</li>
                <li>Competitive pricing with guaranteed quality</li>
                <li>Dedicated logistics and customs support</li>
              </ul>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg">
              <p className="text-gray-700 italic">&ldquo;As an importer serving Middle Eastern and African markets, finding reliable European suppliers was challenging until we partnered with EuroSource. They handle everything from supplier vetting to customs documentation, making our operations significantly more efficient.&rdquo;</p>
              <p className="text-gray-600 font-semibold mt-2">- Ahmad Hassan, Procurement Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Body 3 - Tech Stack */}
      <section id="marketing3" className="py-0 md:py-0 bg-gray-50">
        <div className="container mx-auto max-w-2xl px-0">
          <div className="flex justify-center">
            <Suspense fallback={<IconCloudSkeleton />}>
              <IconCloudDemo />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <div id="contact-form">
        <ContactForm />
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 md:py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">EuroSource</h3>
              <p className="text-gray-400">Connecting businesses with Europe's finest manufacturers and suppliers.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about-us" className="hover:text-blue-400">About Us</a></li>
                <li><a href="/careers" className="hover:text-blue-400">Careers</a></li>
                <li><a href="/collaboration" className="hover:text-blue-400">Collaboration</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
              <p className="text-gray-400 mb-2">Based in Germany, Berlin</p>
              <p className="text-gray-400 mb-2">Blasewitzer Ring 28</p>
              <p className="text-gray-400">Email: <a href="mailto:alielhajj@outlook.de" className="text-blue-400 hover:text-blue-300">alielhajj@outlook.de</a></p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400">FAQ</a></li>
                <li><a href="#" className="hover:text-blue-400">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 EuroSource. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}