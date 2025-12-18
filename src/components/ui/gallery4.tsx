"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getImagePath } from "@/lib/image-utils";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  flag: string;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items?: Gallery4Item[];
}

import { useTranslations } from 'next-intl';

const Gallery4 = ({
  title,
  description,
  items,
}: Gallery4Props) => {
  const t = useTranslations('Gallery');

  // Use passed props, or fallback to translations
  const displayTitle = title || t('sectionTitle');
  const displayDescription = description || t('sectionDesc');

  // If no items passed, generate default data with translations
  const defaultItems = [
    {
      id: "automotive",
      title: t('items.automotive.title'),
      description: t('items.automotive.description'),
      href: "#",
      image: "/Mercedes-1_1920x1080.webp",
      flag: "🇩🇪",
    },
    {
      id: "electronics",
      title: t('items.electronics.title'),
      description: t('items.electronics.description'),
      href: "#",
      image: "/labeling-machine.webp",
      flag: "🇫🇷",
    },
    {
      id: "textiles",
      title: t('items.textiles.title'),
      description: t('items.textiles.description'),
      href: "#",
      image: "/furniture-production.webp",
      flag: "🇵🇱",
    },
    {
      id: "machinery",
      title: t('items.machinery.title'),
      description: t('items.machinery.description'),
      href: "#",
      image: "/forklift.webp",
      flag: "🇩🇪",
    },
    {
      id: "chemicals",
      title: t('items.chemicals.title'),
      description: t('items.chemicals.description'),
      href: "#",
      image: "/legoland-lego-fabrik.webp",
      flag: "🇩🇰",
    },
  ];

  const displayItems = items || defaultItems;

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">
              {displayTitle}
            </h2>
            <p className="max-w-lg text-muted-foreground">{displayDescription}</p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-0 2xl:ml-[max(8rem,calc(50vw-700px))] 2xl:mr-[max(0rem,calc(50vw-700px))]">
            {displayItems.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[320px] pl-[20px] lg:max-w-[360px]"
              >
                <div className="flex flex-col items-center">
                  <a href={item.href} className="group rounded-xl w-full">
                    <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl md:aspect-[5/4] lg:aspect-[16/9]">
                      <img
                        src={getImagePath(item.image)}
                        alt={item.title}
                        className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 h-full bg-[linear-gradient(hsl(var(--primary)/0),hsl(var(--primary)/0.4),hsl(var(--primary)/0.8)_100%)] mix-blend-multiply" />
                      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-white md:p-8">
                        <div className="w-full px-3 py-4 bg-black/60 rounded">
                          <div className="mb-2 text-xl font-semibold [text-shadow:_0_2px_8px_rgba(0,0,0,0.7)]">
                            {item.title}
                          </div>
                          <div className="line-clamp-2 [text-shadow:_0_2px_8px_rgba(0,0,0,0.7)]">
                            {item.description}
                          </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm [text-shadow:_0_2px_8px_rgba(0,0,0,0.7)]">
                          {t('readMore')}{" "}
                          <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </a>
                  <div className="mt-3 text-4xl">
                    {item.flag}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {displayItems.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${currentSlide === index ? "bg-primary" : "bg-primary/20"
                }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery4 };
