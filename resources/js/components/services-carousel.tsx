import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export type ServiceCarouselItem = {
    title: string;
    description: string;
    icon: LucideIcon;
};

type ServicesCarouselProps = {
    services: ServiceCarouselItem[];
};

function getServiceId(title: string) {
    return title.toLowerCase().replaceAll(' ', '-');
}

export default function ServicesCarousel({ services }: ServicesCarouselProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            align: 'start',
            loop: true,
        },
        [Autoplay({ delay: 4200, stopOnInteraction: false, stopOnMouseEnter: true })],
    );

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) {
            return;
        }

        const updateSelectedIndex = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        updateSelectedIndex();
        emblaApi.on('select', updateSelectedIndex);
        emblaApi.on('reInit', updateSelectedIndex);

        return () => {
            emblaApi.off('select', updateSelectedIndex);
            emblaApi.off('reInit', updateSelectedIndex);
        };
    }, [emblaApi]);

    return (
        <div className="mt-10">
            <div ref={emblaRef} className="overflow-hidden">
                <div className="-ml-5 flex">
                    {services.map((service, index) => {
                        const Icon = service.icon;

                        return (
                            <div
                                key={service.title}
                                className="min-w-0 flex-[0_0_100%] pl-5 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                            >
                                <article
                                    id={getServiceId(service.title)}
                                    className="group relative flex min-h-76 flex-col overflow-hidden border border-slate-200 bg-white p-7 transition-all hover:-translate-y-1 hover:border-sba-secondary hover:shadow-xl"
                                >
                                    <div className="absolute inset-x-0 top-0 h-1 bg-sba-secondary opacity-0 transition-opacity group-hover:opacity-100" />

                                    <div className="flex items-start justify-between gap-5">
                                        <div className="flex size-14 items-center justify-center border border-slate-200 bg-slate-50 text-sba-primary transition-colors group-hover:border-sba-secondary group-hover:bg-sba-primary group-hover:text-white">
                                            <Icon className="size-6" aria-hidden="true" />
                                        </div>
                                        <span className="text-4xl leading-none font-bold text-slate-100 transition-colors group-hover:text-sba-secondary/30">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                    </div>

                                    <h3 className="mt-7 text-2xl leading-snug font-bold text-sba-primary">
                                        {service.title}
                                    </h3>
                                    <p className="mt-4 text-sm leading-7 text-slate-600">
                                        {service.description}
                                    </p>

                                    <div className="mt-auto pt-8">
                                        <a
                                            href={`#${getServiceId(service.title)}`}
                                            className="inline-flex items-center text-sm font-semibold text-sba-primary transition-colors hover:text-sba-secondary"
                                        >
                                            Detail layanan
                                            <ChevronRight
                                                className="ml-1 size-4"
                                                aria-hidden="true"
                                            />
                                        </a>
                                    </div>
                                </article>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-7 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    {services.map((service, index) => (
                        <button
                            key={service.title}
                            type="button"
                            aria-label={`Tampilkan layanan ${index + 1}`}
                            aria-current={selectedIndex === index}
                            onClick={() => emblaApi?.scrollTo(index)}
                            className={`h-2 rounded-full transition-all ${
                                selectedIndex === index
                                    ? 'w-8 bg-sba-secondary'
                                    : 'w-2 bg-slate-300 hover:bg-sba-primary'
                            }`}
                        />
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Layanan sebelumnya"
                        onClick={scrollPrev}
                        className="size-10 rounded-none border border-slate-300 text-sba-primary hover:border-sba-secondary hover:bg-sba-primary hover:text-white has-[>svg]:px-0"
                    >
                        <ChevronLeft className="size-5" aria-hidden="true" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Layanan berikutnya"
                        onClick={scrollNext}
                        className="size-10 rounded-none border border-slate-300 text-sba-primary hover:border-sba-secondary hover:bg-sba-primary hover:text-white has-[>svg]:px-0"
                    >
                        <ChevronRight className="size-5" aria-hidden="true" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
