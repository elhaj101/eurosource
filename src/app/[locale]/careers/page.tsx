"use client";

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function Careers() {
  const locale = useLocale();
  const t = useTranslations('Careers');
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

        {/* Why Join Us */}
        <section className="py-16">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">{t('whyJoinTitle')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('benefit1Title')}</h3>
                <p className="text-gray-600">{t('benefit1Desc')}</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('benefit2Title')}</h3>
                <p className="text-gray-600">{t('benefit2Desc')}</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('benefit3Title')}</h3>
                <p className="text-gray-600">{t('benefit3Desc')}</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('benefit4Title')}</h3>
                <p className="text-gray-600">{t('benefit4Desc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">{t('positionsTitle')}</h2>
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-600 text-lg mb-4">{t('noPositions')}</p>
              <p className="text-gray-500">{t('noPositionsDesc')}</p>
            </div>
          </div>
        </section>

        {/* Spontaneous Application */}
        <section className="py-16">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('spontaneousTitle')}</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">{t('spontaneousDesc')}</p>
            <a 
              href="mailto:alielhajj@outlook.de?subject=Spontaneous Application - EuroSource"
              className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              {t('applyButton')}
            </a>
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
