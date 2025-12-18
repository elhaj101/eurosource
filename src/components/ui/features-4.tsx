import { Globe, Handshake, Truck, FileCheck, CheckCircle, Headphones } from 'lucide-react'
import Image from 'next/image'
import { getImagePath } from '@/lib/image-utils'

import { useTranslations } from 'next-intl';

export function Features() {
    const t = useTranslations('Services');
    return (
        <section className="py-12 md:py-20">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center md:space-y-12">
                    <div className="relative inline-block">
                        <Image
                            src={getImagePath("/abstract-representation-german-flag-paint-brush-strokes-isolated-white-background-stroke-368550399-removebg-preview.png")}
                            alt="German Flag"
                            width={800}
                            height={600}
                            className="absolute inset-0 w-96 h-auto object-contain opacity-20 -z-10 left-1/2 -translate-x-1/2 -top-12"
                        />
                        <h2 className="text-balance text-4xl font-medium lg:text-5xl text-gray-900">{t('title')}</h2>
                    </div>
                    <p>{t('subtitle')}</p>
                </div>

                <div className="relative mx-auto grid max-w-2xl lg:max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Globe className="size-7 text-blue-600" />
                            <h3 className="text-lg font-medium text-gray-900">{t('sourcing')}</h3>
                        </div>
                        <p className="text-lg text-gray-600">{t('sourcingDesc')}</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Handshake className="size-7 text-blue-600" />
                            <h3 className="text-lg font-medium text-gray-900">{t('negotiation')}</h3>
                        </div>
                        <p className="text-lg text-gray-600">{t('negotiationDesc')}</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Truck className="size-7 text-blue-600" />

                            <h3 className="text-lg font-medium text-gray-900">{t('logistics')}</h3>
                        </div>
                        <p className="text-lg text-gray-600">{t('logisticsDesc')}</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <FileCheck className="size-7 text-blue-600" />

                            <h3 className="text-lg font-medium text-gray-900">{t('customs')}</h3>
                        </div>
                        <p className="text-lg text-gray-600">{t('customsDesc')}</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="size-7 text-blue-600" />

                            <h3 className="text-lg font-medium text-gray-900">{t('quality')}</h3>
                        </div>
                        <p className="text-lg text-gray-600">{t('qualityDesc')}</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Headphones className="size-7 text-blue-600" />

                            <h3 className="text-lg font-medium text-gray-900">{t('support')}</h3>
                        </div>
                        <p className="text-lg text-gray-600">{t('supportDesc')}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
