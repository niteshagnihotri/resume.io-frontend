import type { Dispatch, SetStateAction } from "react";
import type { ResumeData, SkillItem } from "../../utils/types";
import PrimaryBtn from "../PrimaryBtn";
import { useFormContext } from "react-hook-form";
import TextInput from "../TextInput";
import { FaTrash } from "react-icons/fa";

export default function SkillsSection({
  resumeData,
  setResumeData,
}: {
  resumeData: ResumeData;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
}) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<ResumeData>();

  const skills = resumeData.skills;

  const updateSkills = (newList: SkillItem[]) => {
    setResumeData((prev) => ({ ...prev, skills: newList }));
    setValue("skills", newList, { shouldValidate: true, shouldDirty: true });
  };

  const addSkills = () => {
    const newSkill = {
      title: "",
      description: "",
    };
    updateSkills([...skills, newSkill]);
  };

  const deleteSkill = (index: number) => {
    const updated = [...skills];
    updated.splice(index, 1);
    updateSkills(updated);
  };

  const handleChange = <K extends keyof SkillItem>(
    index: number,
    field: K,
    value: SkillItem[K]
  ) => {
    const updated = [...skills];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    updateSkills(updated);
  };

  return (
    <div className="space-y-6">
      {skills.length > 0 && (
        <div className="space-y-2">
          {skills.map((_, index) => (
            <div
              key={index}
              className="border p-4 rounded-md shadow relative space-y-4"
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="text-lg font-semibold text-primary">
                  Skill {index + 1}
                </h1>
                <button
                  type="button"
                  onClick={() => deleteSkill(index)}
                  className="text-slate-400 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
              <TextInput
                label="Title"
                name={`skills.${index}.title`}
                register={register}
                errors={errors}
                placeholder="Eg. Programming languages "
                onChange={(e) => handleChange(index, "title", e.target.value)}
              />

              <TextInput
                label="Description"
                name={`skills.${index}.description`}
                register={register}
                errors={errors}
                placeholder="Eg. C++, Java, Javascript"
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
              />
            </div>
          ))}
        </div>
      )}
      <PrimaryBtn
        value="+ Add"
        variant="outlined"
        className="flex ml-auto px-8"
        onClick={addSkills}
      />
    </div>
  );
}
