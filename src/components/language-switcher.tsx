"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function LanguageSwitcher() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Helper to switch locale in the current path
    const switchLocale = (locale: string) => {
        if (!pathname) return "/";
        const segments = pathname.split("/");
        segments[1] = locale; // Replace the first segment (locale)
        return segments.join("/");
    };

    const currentLocale = pathname?.split("/")[1] || "en";

    const flags = {
        en: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-full h-full object-cover">
                <clipPath id="s">
                    <path d="M0,0 v30 h60 v-30 z" />
                </clipPath>
                <clipPath id="t">
                    <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
                </clipPath>
                <g clipPath="url(#s)">
                    <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
                    <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
                    <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
                    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
                </g>
            </svg>
        ),
        de: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" className="w-full h-full object-cover">
                <rect width="5" height="3" y="0" x="0" fill="#000" />
                <rect width="5" height="2" y="1" x="0" fill="#D00" />
                <rect width="5" height="1" y="2" x="0" fill="#FFCE00" />
            </svg>
        ),
        ar: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="w-full h-full object-cover">
                <rect width="3" height="2" fill="#006C35" />
                <text x="1.5" y="1" font-family="sans-serif" font-size="0.6" fill="#fff" text-anchor="middle" dominant-baseline="middle">🇸🇦</text>
            </svg>
        ),
        zh: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="w-full h-full object-cover">
                <rect width="900" height="600" fill="#DE2910" />
                <path fill="#FFDE00" d="M141.5,121.5l14.9,45.8l48.2,0l-39,28.3l14.9,45.8l-39-28.3l-39,28.3l14.9-45.8l-39-28.3l48.2,0L141.5,121.5z M230.1,50.7l2.8,8.5l9,0l-7.3,5.3l2.8,8.5l-7.3-5.3l-7.3,5.3l2.8-8.5l-7.3-5.3l9,0L230.1,50.7z M261.2,104.7l2.8,8.5l9,0l-7.3,5.3l2.8,8.5l-7.3-5.3l-7.3,5.3l2.8-8.5l-7.3-5.3l9,0L261.2,104.7z M261.2,192.4l2.8,8.5l9,0l-7.3,5.3l2.8,8.5l-7.3-5.3l-7.3,5.3l2.8-8.5l-7.3-5.3l9,0L261.2,192.4z M230.1,246.4l2.8,8.5l9,0l-7.3,5.3l2.8,8.5l-7.3-5.3l-7.3,5.3l2.8-8.5l-7.3-5.3l9,0L230.1,246.4z" transform="scale(1.2) translate(-20, -10)" />
            </svg>
        )
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Main Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-12 h-12 rounded-full overflow-hidden shadow-lg ring-2 ring-white/20 hover:scale-105 transition-transform bg-white"
            >
                {flags[currentLocale as keyof typeof flags] || flags['en']}
            </button>

            {/* Dropdown Menu - Opens Upwards */}
            {isOpen && (
                <div className="absolute bottom-14 right-0 bg-white rounded-lg shadow-xl overflow-hidden py-1 min-w-[140px] animate-in slide-in-from-bottom-2 fade-in duration-200">
                    <Link
                        href={switchLocale("en")}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${currentLocale === 'en' ? 'bg-blue-50' : ''}`}
                    >
                        <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200">
                            {flags.en}
                        </div>
                        <span className={`text-sm ${currentLocale === 'en' ? 'font-semibold text-blue-600' : 'text-gray-700'}`}>English</span>
                    </Link>
                    <Link
                        href={switchLocale("de")}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${currentLocale === 'de' ? 'bg-blue-50' : ''}`}
                    >
                        <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200">
                            {flags.de}
                        </div>
                        <span className={`text-sm ${currentLocale === 'de' ? 'font-semibold text-blue-600' : 'text-gray-700'}`}>Deutsch</span>
                    </Link>
                    <Link
                        href={switchLocale("ar")}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${currentLocale === 'ar' ? 'bg-blue-50' : ''}`}
                    >
                        <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="w-full h-full object-cover">
                                <rect width="3" height="2" fill="#006C35" />
                                <path d="M0.5,0.7 L1,0.7" stroke="white" strokeWidth="0.1" />
                                <path fill="white" d="M1,1.5 L1.1,1.4 L1.2,1.5 L1.1,1.6 Z" transform="scale(0.5)" />
                            </svg>
                        </div>
                        <span className={`text-sm ${currentLocale === 'ar' ? 'font-semibold text-blue-600' : 'text-gray-700'}`}>العربية</span>
                    </Link>
                    <Link
                        href={switchLocale("zh")}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${currentLocale === 'zh' ? 'bg-blue-50' : ''}`}
                    >
                        <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200">
                            {flags.zh}
                        </div>
                        <span className={`text-sm ${currentLocale === 'zh' ? 'font-semibold text-blue-600' : 'text-gray-700'}`}>中文</span>
                    </Link>
                </div>
            )}

            {/* Backdrop to close on click outside */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[-1]"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}
