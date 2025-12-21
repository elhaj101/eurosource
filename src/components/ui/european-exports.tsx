"use client";

import { useTranslations } from 'next-intl';
import { 
  Cog, 
  Gem, 
  Car, 
  UtensilsCrossed, 
  Pill, 
  Leaf 
} from "lucide-react";

const industryKeys = [
  { key: "engineering", icon: Cog },
  { key: "fashion", icon: Gem },
  { key: "automotive", icon: Car },
  { key: "food", icon: UtensilsCrossed },
  { key: "pharma", icon: Pill },
  { key: "energy", icon: Leaf },
];

export function EuropeanExports() {
  const t = useTranslations('EuropeanExports');

  return (
    <div className="w-full py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tight max-w-xl font-semibold text-left text-gray-900">
                {t('title')}
              </h2>
              <p className="text-lg max-w-xl lg:max-w-2xl leading-relaxed tracking-tight text-gray-600 text-left">
                {t('subtitle')}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {industryKeys.map((industry, index) => (
              <div key={index} className="flex flex-col gap-3 bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 bg-slate-900 rounded-lg">
                    <industry.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-gray-900">
                  {t(`industries.${industry.key}.title`)}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t(`industries.${industry.key}.description`)}
                </p>
                <p className="text-xs text-gray-500 mt-auto pt-2 border-t border-gray-100">
                  <span className="font-medium text-gray-700">{t('examplesLabel')}</span> {t(`industries.${industry.key}.examples`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
