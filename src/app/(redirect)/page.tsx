'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Detect language preference from browser
    const browserLang = navigator.language.split('-')[0];
    const supportedLocales = ['en', 'de', 'ar', 'zh'];
    const locale = supportedLocales.includes(browserLang) ? browserLang : 'en';
    router.push(`/${locale}`);
  }, [router]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <p>Redirecting...</p>
    </div>
  );
}
