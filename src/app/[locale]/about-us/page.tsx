"use client";

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function AboutUs() {
  const locale = useLocale();
  const t = useTranslations('AboutUs');
  const tNav = useTranslations('Navigation');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-gray-900 text-white py-6">
        <div className="container mx-auto max-w-7xl px-4 flex justify-between items-center">
          <Link href={`/${locale}`} className="text-2xl md:text-3xl font-bold hover:text-blue-400 transition">
            EuroSource
          </Link>
          <Link 
            href={`/${locale}#contact-form`}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition"
          >
            {tNav('contact')}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('title')}</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t('subtitle')}</p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('storyTitle')}</h2>
            <div className="prose prose-lg text-gray-600 space-y-4">
              <p>{t('storyP1')}</p>
              <p>{t('storyP2')}</p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('missionTitle')}</h3>
                <p className="text-gray-600">{t('missionDesc')}</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('visionTitle')}</h3>
                <p className="text-gray-600">{t('visionDesc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">{t('valuesTitle')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{t('value1Title')}</h4>
                <p className="text-gray-600">{t('value1Desc')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{t('value2Title')}</h4>
                <p className="text-gray-600">{t('value2Desc')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{t('value3Title')}</h4>
                <p className="text-gray-600">{t('value3Desc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{t('ctaTitle')}</h2>
            <p className="text-xl text-blue-100 mb-8">{t('ctaDesc')}</p>
            <Link 
              href={`/${locale}#contact-form`}
              className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-100 transition"
            >
              {tNav('contact')}
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <Link href={`/${locale}`} className="text-xl font-bold hover:text-blue-400 transition">
            EuroSource
          </Link>
          <p className="text-gray-400 mt-2">© 2025 EuroSource. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
