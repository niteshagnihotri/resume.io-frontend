import { useEffect, useRef } from "react";

export default function StepTabs({
  sections,
  currentStep,
  setCurrentStep,
}: {
  sections: string[];
  currentStep: number;
  setCurrentStep: (index: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    // Auto-scroll current tab into view
    tabRefs.current[currentStep]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [currentStep]);

  return (
    <div className="relative w-full">
      {/* Tab Buttons */}
      <div
        id="step-tabs"
        ref={containerRef}
        className="flex overflow-x-auto gap-4 pb-2 px-10 scroll-smooth snap-x hide-scrollbar"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {sections.map((label, index) => (
          <button
            key={label}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            onClick={() => setCurrentStep(index)}
            className={`min-w-max px-4 py-2 text-base text-center snap-start whitespace-nowrap border-b-2 transition-colors ${
              currentStep === index
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-gray-500"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}