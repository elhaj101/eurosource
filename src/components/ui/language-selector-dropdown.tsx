"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

export function LanguageSelectorDropdown() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = pathname?.split("/")[1] || "en";
  const selected = languages.find((lang) => lang.code === currentLocale) || languages[0];

  // Helper to switch locale in the current path
  const switchLocale = (locale: string) => {
    if (!pathname) return `/${locale}`;
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm",
          "bg-white/80 backdrop-blur-md shadow-sm",
          "border-gray-200",
          "text-gray-800",
          "hover:bg-gray-50 transition-all"
        )}
      >
        <span className="text-lg">{selected.flag}</span>
        <span className="font-medium">{selected.label}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className={cn(
            "absolute left-0 mt-2 w-44 rounded-xl overflow-hidden z-50",
            "bg-white/95 backdrop-blur-xl",
            "shadow-lg border border-gray-200",
            "animate-dropdown-fade-in"
          )}
        >
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={switchLocale(lang.code)}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 w-full px-3 py-2.5 text-sm text-left transition-colors",
                selected.code === lang.code
                  ? "font-semibold text-slate-900 bg-gray-50"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="flex-1">{lang.label}</span>
              {selected.code === lang.code && (
                <Check className="h-4 w-4 text-slate-900" />
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
