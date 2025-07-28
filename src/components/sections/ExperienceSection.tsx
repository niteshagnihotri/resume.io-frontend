import { useState, type Dispatch, type SetStateAction, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import TextInput from "../TextInput";
import type { ResumeData, ExperienceItem } from "../../utils/types";
import { FaChevronDown, FaChevronRight, FaTrash } from "react-icons/fa";

export default function ExperienceSection({
  resumeData,
  setResumeData,
}: {
  resumeData: ResumeData;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
}) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ResumeData>();

  const [experienceList, setExperienceList] = useState<ExperienceItem[]>([]);

  // Hydrate local state from resumeData on mount
  useEffect(() => {
    setExperienceList((prev) =>
      prev.length ? prev : resumeData.experience || []
    );
  }, []);

  const updateExperience = (updated: ExperienceItem[]) => {
    setExperienceList(updated);
    setResumeData((prev) => ({ ...prev, experience: updated }));
    setValue("experience", updated);
  };

  const handleExperienceChange = <K extends keyof ExperienceItem>(
    index: number,
    field: K,
    value: ExperienceItem[K]
  ) => {
    const updated = [...experienceList];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    updateExperience(updated);
  };

  const handleBulletChange = (
    expIdx: number,
    bulletIdx: number,
    value: string
  ) => {
    const updated = [...experienceList];
    updated[expIdx].description[bulletIdx] = value;
    updateExperience(updated);
  };

  const addBullet = (expIdx: number) => {
    const updated = [...experienceList];
    updated[expIdx].description.push("");
    updateExperience(updated);
  };

  const deleteBullet = (expIdx: number, bulletIdx: number) => {
    const updated = [...experienceList];
    updated[expIdx].description.splice(bulletIdx, 1);
    updateExperience(updated);
  };

  const addExperience = () => {
    const newExp: ExperienceItem = {
      jobTitle: "",
      company: "",
      from: "",
      to: "",
      isCurrent: false,
      description: [],
    };
    updateExperience([...experienceList, newExp]);
  };

  const deleteExperience = (index: number) => {
    const updated = [...experienceList];
    updated.splice(index, 1);
    updateExperience(updated);
  };

  const [collapsedState, setCollapsedState] = useState<boolean[]>(
    experienceList.map(() => true)
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
      {experienceList.map((exp, index) => (
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
                Experience {index + 1}
              </p>
            </div>

            <button
              type="button"
              onClick={() => deleteExperience(index)}
              className="text-slate-400 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>

          <TextInput
            name={`experience.${index}.jobTitle`}
            label="Job Title"
            register={register}
            errors={errors}
            placeholder="e.g. Software Engineer"
            onChange={(e) =>
              handleExperienceChange(index, "jobTitle", e.target.value)
            }
          />

          <TextInput
            name={`experience.${index}.company`}
            label="Company"
            register={register}
            errors={errors}
            placeholder="e.g. Microsoft"
            onChange={(e) =>
              handleExperienceChange(index, "company", e.target.value)
            }
          />
          {!collapsedState[index] && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  name={`experience.${index}.from`}
                  label="From"
                  type="month"
                  register={register}
                  errors={errors}
                  onChange={(e) =>
                    handleExperienceChange(index, "from", e.target.value)
                  }
                />
                <TextInput
                  name={`experience.${index}.to`}
                  label="To"
                  type="month"
                  register={register}
                  errors={errors}
                  onChange={(e) =>
                    handleExperienceChange(index, "to", e.target.value)
                  }
                />
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={exp.isCurrent}
                  onChange={(e) =>
                    handleExperienceChange(index, "isCurrent", e.target.checked)
                  }
                />
                This is my current job
              </label>

              <div>
                <label className="font-medium text-sm mb-1 block">
                  Job Description (bullet points)
                </label>
                <div className="space-y-2">
                  {exp.description.map((_, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2">
                      <TextInput
                        name={`experience.${index}.description.${bIdx}`}
                        register={register}
                        errors={errors}
                        onChange={(e) =>
                          handleBulletChange(index, bIdx, e.target.value)
                        }
                        placeholder={`Point ${bIdx + 1}`}
                      />

                      <button
                        type="button"
                        onClick={() => deleteBullet(index, bIdx)}
                        className="text-slate-400 hover:text-red-700"
                        title="Delete point"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addBullet(index)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    + Add Description Point
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addExperience}
        className="px-4 py-2 border-primary border flex ml-auto text-primary rounded"
      >
        + Add Experience
      </button>
    </div>
  );
}
