import { Globe, Handshake, Truck, FileCheck, CheckCircle, Headphones } from 'lucide-react'
import Image from 'next/image'
import { getImagePath } from '@/lib/image-utils'

export function Features() {
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
                        <h2 className="text-balance text-4xl font-medium lg:text-5xl">Our Services</h2>
                    </div>
                    <p>EuroSource specializes in connecting you with the best suppliers from Germany and Europe. We handle every step of your sourcing journey with expertise and care.</p>
                </div>

                <div className="relative mx-auto grid max-w-2xl lg:max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Globe className="size-7 text-blue-600" />
                            <h3 className="text-lg font-medium">Supplier Sourcing</h3>
                        </div>
                        <p className="text-lg text-gray-600">We identify and connect you with the most reliable and innovative suppliers across Germany and Europe for your specific needs.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Handshake className="size-7 text-blue-600" />
                            <h3 className="text-lg font-medium">Negotiation</h3>
                        </div>
                        <p className="text-lg text-gray-600">Our expert negotiators work on your behalf to secure the best terms, pricing, and conditions with your suppliers.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Truck className="size-7 text-blue-600" />

                            <h3 className="text-lg font-medium">Logistics</h3>
                        </div>
                        <p className="text-lg text-gray-600">We manage the complete logistics chain, from warehousing to delivery, ensuring your products reach you on time.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <FileCheck className="size-7 text-blue-600" />

                            <h3 className="text-lg font-medium">Customs Clearance</h3>
                        </div>
                        <p className="text-lg text-gray-600">Our customs experts handle all documentation and regulatory requirements to ensure smooth border crossings.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="size-7 text-blue-600" />

                            <h3 className="text-lg font-medium">Quality Control</h3>
                        </div>
                        <p className="text-lg text-gray-600">We perform rigorous quality inspections at every stage to guarantee your products meet the highest standards.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Headphones className="size-7 text-blue-600" />

                            <h3 className="text-lg font-medium">24/7 Support</h3>
                        </div>
                        <p className="text-lg text-gray-600">Our dedicated support team is available around the clock to assist with any questions or issues.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
