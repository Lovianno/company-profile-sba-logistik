import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const heroSlides = [
    {
        title: 'SBA Logistik',
        description: 'Solusi transportasi dan distribusi terpercaya.',
        image: '/assets/images/logistik1.png',
        imageAlt: 'Armada truk dan kontainer di area logistik',
    },
    {
        title: 'Transportasi Darat',
        description: 'Pengiriman antarkota yang aman, rapi, dan tepat waktu.',
        image: '/assets/images/logistik2.jpg',
        imageAlt: 'Aktivitas distribusi logistik',
    },
    {
        title: 'Distribusi Logistik',
        description: 'Mendukung pergerakan barang ke berbagai wilayah layanan.',
        image: '/assets/images/logistik3.jpg',
        imageAlt: 'Area operasional layanan logistik',
    },
];

export default function HeroCarousel() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 32 }, [
        Autoplay({ delay: 5200, stopOnInteraction: false, stopOnMouseEnter: false }),
    ]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const scrollTo = useCallback(
        (index: number) => emblaApi?.scrollTo(index),
        [emblaApi],
    );

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
        <section className="relative isolate min-h-120 overflow-hidden bg-sba-primary text-white sm:min-h-135">
            <style>
                {`
                    @keyframes hero-carousel-zoom {
                        from {
                            transform: scale(1);
                        }

                        to {
                            transform: scale(1.12);
                        }
                    }
                `}
            </style>

            <div ref={emblaRef} className="overflow-hidden">
                <div className="flex">
                    {heroSlides.map((slide, index) => (
                        <div key={slide.title} className="relative min-w-0 flex-[0_0_100%]">
                            <img
                                src={slide.image}
                                alt={slide.imageAlt}
                                className={`absolute inset-0 -z-20 size-full object-cover ${
                                    selectedIndex === index
                                        ? 'origin-center [animation:hero-carousel-zoom_5.2s_linear_forwards]'
                                        : 'scale-100'
                                }`}
                            />
                            <div className="absolute inset-0 -z-10 bg-black/35" />

                            <div className="mx-auto flex min-h-120 max-w-7xl items-center justify-center px-5 py-20 text-center sm:min-h-150 sm:px-8 lg:min-h-135">
                                <div className="max-w-5xl">
                                    <h1 className="text-4xl leading-tight font-bold text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
                                        {slide.title}
                                    </h1>
                                    <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-white drop-shadow-md sm:text-3xl">
                                        {slide.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex justify-center px-5">
                <div className="pointer-events-auto flex items-center gap-2">
                    {heroSlides.map((slide, index) => (
                        <button
                            key={slide.title}
                            type="button"
                            aria-label={`Tampilkan slide ${index + 1}`}
                            aria-current={selectedIndex === index}
                            onClick={() => scrollTo(index)}
                            className={`size-2 rounded-full transition-all ${
                                selectedIndex === index
                                    ? 'bg-sba-secondary'
                                    : 'bg-black/70 hover:bg-white'
                            }`}
                        />
                    ))}
                </div>
            </div>

            <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Slide sebelumnya"
                onClick={scrollPrev}
                className="absolute top-1/2 left-4 z-10 size-11 -translate-y-1/2 rounded-none text-white hover:bg-transparent hover:text-sba-secondary has-[>svg]:px-0 sm:left-8"
            >
                <ChevronLeft className="size-8" aria-hidden="true" />
            </Button>
            <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Slide berikutnya"
                onClick={scrollNext}
                className="absolute top-1/2 right-4 z-10 size-11 -translate-y-1/2 rounded-none text-white hover:bg-transparent hover:text-sba-secondary has-[>svg]:px-0 sm:right-8"
            >
                <ChevronRight className="size-8" aria-hidden="true" />
            </Button>
        </section>
    );
}
