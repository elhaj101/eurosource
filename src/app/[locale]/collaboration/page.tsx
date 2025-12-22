"use client";

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function Collaboration() {
  const locale = useLocale();
  const t = useTranslations('Collaboration');
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

        {/* Partnership Types */}
        <section className="py-16">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">{t('typesTitle')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 border border-gray-200 rounded-lg text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('type1Title')}</h3>
                <p className="text-gray-600">{t('type1Desc')}</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('type2Title')}</h3>
                <p className="text-gray-600">{t('type2Desc')}</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('type3Title')}</h3>
                <p className="text-gray-600">{t('type3Desc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">{t('howItWorksTitle')}</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('step1Title')}</h3>
                  <p className="text-gray-600">{t('step1Desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('step2Title')}</h3>
                  <p className="text-gray-600">{t('step2Desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('step3Title')}</h3>
                  <p className="text-gray-600">{t('step3Desc')}</p>
                </div>
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
              {t('ctaButton')}
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
