import { type Dispatch, type SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import type { ResumeData } from "../../utils/types";
import TextInput from "../TextInput";
import PrimaryBtn from "../PrimaryBtn";

export default function AchievementSection({
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

  const achievements = resumeData.achievements;

  const updateAchievements = (newList: string[]) => {
    setResumeData((prev) => ({ ...prev, achievements: newList }));
    setValue("achievements", newList, { shouldValidate: true, shouldDirty: true });
  };

  const handleAchievementChange = (index: number, value: string) => {
    const updated = [...achievements];
    updated[index] = value;
    updateAchievements(updated);
  };

  const addAchievement = () => {
    updateAchievements([...achievements, ""]);
  };

  const removeAchievement = (index: number) => {
    const updated = achievements.filter((_, i) => i !== index);
    updateAchievements(updated);
  };

  return (
    <div className="space-y-4">
      {achievements.length > 0 && (
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-2">
              <TextInput<ResumeData>
                name={`achievements.${index}`}
                register={register}
                defaultVal={achievement}
                errors={errors}
                placeholder="Enter Achievement "
                onChange={(e) => handleAchievementChange(index, e.target.value)}
              />
                <button
                  type="button"
                  onClick={() => removeAchievement(index)}
                  className=" text-slate-400"
                  title="Delete"
                >
                  <FaTrash />
                </button>
            </div>
          ))}
        </div>
      )}

      <PrimaryBtn
        value="+ Add"
        variant="outlined"
        className="flex ml-auto px-8"
        onClick={addAchievement}
      />
    </div>
  );
}