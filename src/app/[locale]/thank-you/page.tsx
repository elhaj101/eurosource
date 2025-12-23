"use client";

import { useTranslations, useLocale } from 'next-intl';
import Link from "next/link";

export default function ThankYouPage() {
  const t = useTranslations('ThankYou');
  const locale = useLocale();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="max-w-xl w-full px-6 py-12 rounded-xl shadow-lg bg-gray-800/80 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-green-400">{t('title')}</h1>
        <p className="text-lg md:text-xl mb-8 text-gray-300">{t('subtitle')}</p>
        <Link href={`/${locale}`} className="inline-block mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition">{t('backHome')}</Link>
      </div>
    </div>
  );
}
