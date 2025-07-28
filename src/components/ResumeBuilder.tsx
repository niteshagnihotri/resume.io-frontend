import { useEffect, useRef, useState } from "react";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import type { ResumeData } from "../utils/types";
import { FaChevronLeft, FaChevronRight, FaPrint } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import {
  defaultResumeData,
  loadResumeDataWithExpiry,
  saveResumeDataWithExpiry,
} from "../utils/helper";

export default function ResumeBuilder() {
  const [formVisible, setFormVisible] = useState(true);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    return loadResumeDataWithExpiry() || defaultResumeData;
  });

  useEffect(() => {
    saveResumeDataWithExpiry(resumeData);
  }, [resumeData]);

  return (
    <div className="py-6 sm:px-6 lg:px-0 space-y-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-8xl lg:mx-auto min-h-screen">
      <div className="flex items-center gap-5 pr-5 justify-end">
        <button
          onClick={() => setFormVisible((prev) => !prev)}
          className="flex items-center gap-2 lg:hidden border-2 border-primary-light hover:opacity-70 px-5 py-2 rounded-full text-sm "
        >
          {formVisible ? "View Resume" : "Show Form"}
        </button>
        <button
          onClick={reactToPrintFn}
          className="flex items-center gap-2 border-2 border-primary-light hover:opacity-70 px-5 py-2 rounded-full text-sm "
        >
          <FaPrint /> <span className="hidden sm:block">Export PDF</span> 
        </button>
      </div>

      <div className="flex flex-col xl:flex-row justify-between w-full items-start gap-12 xl:gap-4">
        {/* Form Section */}
        {formVisible && (
          <div className="p-4 rounded-xl shadow-sm bg-white h-full min-h-[500px] w-full sm:max-w-[794px] mx-auto xl:max-w-1/2">
            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => setFormVisible((prev) => !prev)}
          className="xl:flex rotate-90 xl:rotate-0 h-fit hidden rounded-full p-2 bg-white hover:opacity-80 border-2 border-primary-light text-primary self-start mt-5"
          title="Toggle Preview"
        >
          {formVisible ? <FaChevronLeft /> : <FaChevronRight />}
        </button>

        {/* Preview Section */}
        <div className="p-2 rounded-lg shadow-sm bg-primary-light overflow-auto w-full max-h-[1250px] max-w-[794px] mx-auto">
          <div ref={contentRef} className="">
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}
