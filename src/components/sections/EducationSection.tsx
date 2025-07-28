import { useState, type Dispatch, type SetStateAction, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import type { ResumeData, EducationItem } from "../../utils/types";
import TextInput from "../TextInput";
import { FaChevronDown, FaChevronRight, FaTrash } from "react-icons/fa";

export default function EducationSection({
  resumeData,
  setResumeData,
}: {
  resumeData: ResumeData;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
}) {
  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext<ResumeData>();

  const [educationList, setEducationList] = useState<EducationItem[]>([]);

  // Load existing data into local state
  useEffect(() => {
    setEducationList((prev) =>
      prev.length ? prev : resumeData.education || []
    );
  }, [resumeData.education]);

  const updateEducation = (updated: EducationItem[]) => {
    setEducationList(updated);
    setResumeData((prev) => ({ ...prev, education: updated }));
    setValue("education", updated);
  };

  const handleChange = <K extends keyof EducationItem>(
    index: number,
    field: K,
    value: EducationItem[K]
  ) => {
    const updated = [...educationList];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    updateEducation(updated);
  };

  const addEducation = () => {
    const newItem: EducationItem = {
      school: "",
      from: "",
      to: "",
      course: "",
      specialisation: "",
      inProgress: false,
    };
    updateEducation([...educationList, newItem]);
  };

  const deleteEducation = (index: number) => {
    const updated = [...educationList];
    updated.splice(index, 1);
    updateEducation(updated);
  };

  const [collapsedState, setCollapsedState] = useState<boolean[]>(
    educationList.map(() => true)
  );

  // Toggle collapse for a section
  const toggleCollapse = (index: number) => {
    setCollapsedState((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <div className="space-y-6">
      {educationList.map((education, index) => (
        <div key={index} className="border p-4 rounded-md shadow space-y-4">
          <div className="flex items-center justify-between w-full">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => toggleCollapse(index)}
            >
              {collapsedState[index] ? (
                <FaChevronRight className="text-gray-500" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
              <p className="text-lg font-semibold text-primary">
                Education {index + 1}
              </p>
            </div>
            <button
              type="button"
              onClick={() => deleteEducation(index)}
              className="text-slate-400 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>

          <TextInput
            name={`education.${index}.course`}
            label="Degree Name"
            register={register}
            errors={errors}
            placeholder="e.g. Bachelor in Technology"
            onChange={(e) => handleChange(index, "course", e.target.value)}
          />
          {!collapsedState[index] && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  name={`education.${index}.from`}
                  label="From"
                  type="month"
                  register={register}
                  errors={errors}
                  onChange={(e) => handleChange(index, "from", e.target.value)}
                />

                <TextInput
                  name={`education.${index}.to`}
                  label="To"
                  type="month"
                  register={register}
                  errors={errors}
                  onChange={(e) => handleChange(index, "to", e.target.value)}
                />
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={education.inProgress}
                  onChange={(e) =>
                    handleChange(index, "inProgress", e.target.checked)
                  }
                />
                This is in progress
              </label>

              <TextInput
                name={`education.${index}.school`}
                label="School / College"
                register={register}
                errors={errors}
                placeholder="e.g. Stanford University"
                onChange={(e) => handleChange(index, "school", e.target.value)}
              />
              <TextInput
                name={`education.${index}.specialisation`}
                label="Specialization"
                register={register}
                errors={errors}
                placeholder="e.g. Computer Science"
                onChange={(e) =>
                  handleChange(index, "specialisation", e.target.value)
                }
              />
              <TextInput
                name={`education.${index}.cgpa`}
                label="CGPA"
                register={register}
                errors={errors}
                placeholder="Enter CGPA "
                onChange={(e) => handleChange(index, "cgpa", e.target.value)}
              />
              <TextInput
                name={`education.${index}.percentage`}
                label="Percentage"
                register={register}
                errors={errors}
                placeholder="Enter Percentage "
                onChange={(e) =>
                  handleChange(index, "percentage", e.target.value)
                }
              />
            </>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addEducation}
        className="px-4 py-2 border-primary border flex ml-auto text-primary rounded"
      >
        + Add Education
      </button>
    </div>
  );
}
