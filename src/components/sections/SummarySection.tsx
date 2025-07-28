import { useFormContext } from "react-hook-form";
import type { ResumeData } from "../../utils/types";

export default function SummarySection({
  resumeData,
  setResumeData,
}: {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ResumeData>();

  const summary = resumeData.personalInfo.summary;

  return (
    <div className="md:col-span-2">
      <label htmlFor="personalInfo.summary" className="block text-sm mb-1">
        Professional Summary
      </label>
      <textarea
        id="personalInfo.summary"
        {...register("personalInfo.summary")}
        className="w-full border rounded-md p-2 text-sm focus:outline-none"
        placeholder="A brief summary about your experience and goals..."
        rows={5}
        value={summary}
        onChange={(e) => {
          setResumeData((prev) => ({
            ...prev,
            personalInfo: {
              ...prev.personalInfo,
              summary: e.target.value.trim(),
            },
          }));
          setValue("personalInfo.summary", e.target.value.trim());
        }}
      />
      {errors?.personalInfo?.summary && (
        <p className="text-red-500 text-sm mt-1">
          {(errors.personalInfo as any)?.summary?.message}
        </p>
      )}
    </div>
  );
}
