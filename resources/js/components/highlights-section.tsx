import { useEffect, useRef, useState } from 'react';

export type HighlightItem = {
    value: string;
    label: string;
};

type HighlightsSectionProps = {
    highlights: HighlightItem[];
};

const ANIMATION_DURATION_MS = 1400;

function parseHighlightValue(value: string) {
    const match = value.match(/^(\d+)(.*)$/);

    if (!match) {
        return {
            target: 0,
            suffix: value,
        };
    }

    return {
        target: Number(match[1]),
        suffix: match[2],
    };
}

function AnimatedHighlightValue({
    value,
    shouldAnimate,
}: {
    value: string;
    shouldAnimate: boolean;
}) {
    const { target, suffix } = parseHighlightValue(value);
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (!shouldAnimate) {
            return;
        }

        let animationFrame = 0;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const progress = Math.min(
                (currentTime - startTime) / ANIMATION_DURATION_MS,
                1,
            );
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            setDisplayValue(Math.round(target * easedProgress));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [shouldAnimate, target]);

    return (
        <>
            {displayValue}
            {suffix}
        </>
    );
}

export default function HighlightsSection({ highlights }: HighlightsSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [shouldAnimate, setShouldAnimate] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldAnimate(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.35 },
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="bg-sba-primary py-16 text-white">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="grid overflow-hidden   sm:grid-cols-2 lg:grid-cols-4">
                    {highlights.map((highlight) => (
                        <div
                            key={highlight.label}
                            className="relative px-2 py-8 sm:px-6 lg:px-8"
                        >
                            <div className="absolute top-8 bottom-8 left-0 hidden w-px bg-white/15 lg:block" />
                            <p className="text-4xl leading-none font-bold text-sba-secondary sm:text-5xl">
                                <AnimatedHighlightValue
                                    value={highlight.value}
                                    shouldAnimate={shouldAnimate}
                                />
                            </p>
                            <p className="mt-3 text-sm font-medium tracking-wide text-white/75 uppercase">
                                {highlight.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
