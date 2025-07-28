import { useEffect, useRef, useState } from "react";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import type { ResumeData } from "../utils/types";
import { FaChevronLeft, FaChevronRight, FaPrint } from "react-icons/fa";
import {
  cn,
  defaultResumeData,
  loadResumeDataWithExpiry,
  saveResumeDataWithExpiry,
} from "../utils/helper";

export default function ResumeBuilder() {
  const [formVisible, setFormVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    try {
      setLoading(true);
      const html = contentRef.current?.outerHTML;
      if (!html) return;
      const response = await fetch("http://localhost:3000/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html }),
      });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "resume.pdf";
      link.click();
    } catch (error) {
      console.log("error occured ", error);
    }
    finally{
      setLoading(false);
    }
  };

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
          onClick={handleDownload}
          className={cn("flex items-center gap-2 border-2 border-primary-light hover:opacity-70 px-5 py-2 rounded-full text-sm ", loading && "disabled:opacity-70 animate-pulse ")}
          disabled={loading}
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
