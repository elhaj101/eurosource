"use client"

import { IconCloud } from "@/components/ui/interactive-icon-cloud"

const slugs = [
  "red-bull",
  "ferrari",
  "lamborghini",
  "porsche",
  "bmw",
  "mercedes-benz",
  "volkswagen",
  "lvmh",
  "prada",
  "gucci",
  "ikea",
  "h-and-m",
  "siemens",
  "philips",
  "shell",
  "heineken",
  "lego",
  "airbus",
  "nokia",
  "spotify",
]

export function IconCloudDemo() {
  return (
    <div className="relative flex w-full h-full items-center justify-center overflow-hidden rounded-lg px-20 pb-20 pt-8">
      <IconCloud iconSlugs={slugs} />
    </div>
  )
}
