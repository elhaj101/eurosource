"use client";

import { 
  Cog, 
  Gem, 
  Car, 
  UtensilsCrossed, 
  Pill, 
  Leaf 
} from "lucide-react";

const industries = [
  {
    icon: Cog,
    title: "Precision Engineering & Industrial Machinery",
    examples: "Industrial turbines, Forklifters, Power generators",
    description: "Europe's powerhouse for reliable, high-spec industrial equipment, essential for global infrastructure development.",
  },
  {
    icon: Gem,
    title: "Luxury Fashion & Designer Goods",
    examples: "Leather handbags, Haute couture textiles, Fine watches",
    description: "Access prestigious European craftsmanship and cutting-edge design in high-end textiles, leather, and premium accessories.",
  },
  {
    icon: Car,
    title: "High-End Automotive & Mobility Solutions",
    examples: "Cars, Electric vehicle batteries, Advanced safety systems",
    description: "Source leadership in automotive engineering, advanced EV components, and innovative mobility solutions.",
  },
  {
    icon: UtensilsCrossed,
    title: "Premium Food & Beverage",
    examples: "Chocolate, Italian olive oil, Artisanal cheeses",
    description: "Discover high-demand, high-quality European brands, from chocolates and spirits to artisanal cheeses and organic products.",
  },
  {
    icon: Pill,
    title: "Advanced Pharmaceutical & Biotech",
    examples: "Vaccines, Specialized medications, Biotechnology kits",
    description: "The EU's fastest-growing high-tech sector, providing world-class medical treatments and research.",
  },
  {
    icon: Leaf,
    title: "Green Energy & Sustainable Technology",
    examples: "Solar panels, Wind turbine blades, Energy storage systems",
    description: "Source European expertise in future-focused, renewable energy components like wind turbine parts and advanced solar technology.",
  },
];

export function EuropeanExports() {
  return (
    <div className="w-full py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tight max-w-xl font-semibold text-left text-gray-900">
                What does Europe export?
              </h2>
              <p className="text-lg max-w-xl lg:max-w-2xl leading-relaxed tracking-tight text-gray-600 text-left">
                Europe leads global trade in high-value sectors. Access these industries directly through EuroSource.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="flex flex-col gap-3 bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 bg-slate-900 rounded-lg">
                    <industry.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-gray-900">{industry.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {industry.description}
                </p>
                <p className="text-xs text-gray-500 mt-auto pt-2 border-t border-gray-100">
                  <span className="font-medium text-gray-700">Examples:</span> {industry.examples}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
