"use client";

import { useTranslations, useLocale } from 'next-intl';
import { LanguageSwitcher } from "@/components/language-switcher";

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
  const locale = useLocale();
  const tHero = useTranslations('Hero');
  const tNav = useTranslations('Navigation');
  const tMarketing = useTranslations('Marketing');
  const tFooter = useTranslations('Footer');

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

      <LanguageSwitcher />

      {/* Contact Button - Fixed top-right */}
      <button
        onClick={scrollToForm}
        className="btn-donate fixed top-6 right-6 z-40"
      >
        {tNav('contact')}
      </button>

      {/* Hero Section */}
      <Hero
        backgroundImage="/shipping-container-eu-2.webp"
        title={locale === 'ar' ? (
          <><span className="inline-block w-48"><CyclingCountry /></span> {tHero('orderFrom')}</>
        ) : (
          <>{tHero('orderFrom')} <span className="inline-block w-48"><CyclingCountry /></span></>
        )}
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
        <Gallery4 />
      </section>

      {/* Marketing Body 2 */}
      <section id="marketing2" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">{tMarketing('whyChoose')}</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{tMarketing('whyChooseDesc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-2xl font-semibold mb-4">{tMarketing('directSourcing')}</h4>
              <p className="text-gray-600 mb-4">{tMarketing('directSourcingDesc')}</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>{tMarketing('point1')}</li>
                <li>{tMarketing('point2')}</li>
                <li>{tMarketing('point3')}</li>
              </ul>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg">
              <p className="text-gray-700 italic">&ldquo;{tMarketing('testimonial')}&rdquo;</p>
              <p className="text-gray-600 font-semibold mt-2">{tMarketing('testimonialAuthor')}</p>
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
              <p className="text-gray-400">{tFooter('brandDesc')}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">{tFooter('headers.company')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about-us" className="hover:text-blue-400">{tFooter('links.about')}</a></li>
                <li><a href="/careers" className="hover:text-blue-400">{tFooter('links.careers')}</a></li>
                <li><a href="/collaboration" className="hover:text-blue-400">{tFooter('links.collaboration')}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">{tFooter('headers.contact')}</h3>
              <p className="text-gray-400 mb-2">{tFooter('contact.basedIn')}</p>
              <p className="text-gray-400 mb-2">Blasewitzer Ring 28</p>
              <p className="text-gray-400">Email: <a href="mailto:alielhajj@outlook.de" className="text-blue-400 hover:text-blue-300">alielhajj@outlook.de</a></p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">{tFooter('headers.resources')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400">{tFooter('links.blog')}</a></li>
                <li><a href="#" className="hover:text-blue-400">{tFooter('links.faq')}</a></li>
                <li><a href="#" className="hover:text-blue-400">{tFooter('links.support')}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">{tFooter('copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}