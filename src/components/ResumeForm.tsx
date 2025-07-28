// ResumeForm.tsx
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import type { ResumeData } from "../utils/types";
import InfoSection from "./sections/InfoSection";
import ExperienceSection from "./sections/ExperienceSection";
import PrimaryBtn from "./PrimaryBtn";
import StepTabs from "./sections/StepTabs";
import EducationSection from "./sections/EducationSection";
import AchievementSection from "./sections/AchievementSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectSection from "./sections/ProjectSection";
import SummarySection from "./sections/SummarySection";

const sections = [
  "INFOMATION",
  "SUMMARY",
  "EXPERIENCE",
  "EDUCATION",
  "PROJECTS",
  "SKILLS",
  "ACHIEVEMENTS",
];

export default function ResumeForm({
  resumeData,
  setResumeData,
}: {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}) {
  const methods = useForm<ResumeData>({ defaultValues: resumeData });
  const [currentStep, setCurrentStep] = useState(0);
  // const currentResumeData = methods.getValues();

  const onSubmit = (data: ResumeData) => {
    console.log("Final Resume Data:", data);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <InfoSection setResumeData={setResumeData} />;
      case 1:
        return (
          <SummarySection
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        );
      case 2:
        return (
          <ExperienceSection
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        );
      case 3:
        return (
          <EducationSection
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        );
      case 4:
        return (
          <ProjectSection
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        );
      case 5:
        return (
          <SkillsSection
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        );
      case 6:
        return (
          <AchievementSection
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        );
      default:
        return <div>Coming soon...</div>;
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 md:space-y-4 px-5"
      >
        <StepTabs
          currentStep={currentStep}
          sections={sections}
          setCurrentStep={setCurrentStep}
        />
        <div className="">{renderCurrentStep()}</div>

        <div className="flex justify-between">
          <PrimaryBtn
            value="Previous"
            isDisabled={currentStep == 0}
            onClick={() =>
              setCurrentStep((prev) => (prev - 1 < 0 ? 0 : prev - 1))
            }
          />
          {currentStep < sections.length - 1 && (
            <PrimaryBtn
              value="Next"
              variant="filled"
              onClick={() => setCurrentStep((prev) => prev + 1)}
              className="px-10"
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
}
