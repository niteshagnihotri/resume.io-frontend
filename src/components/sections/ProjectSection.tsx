import { useState, type Dispatch, type SetStateAction, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import TextInput from "../TextInput";
import type { ResumeData, ProjectItem } from "../../utils/types";
import { FaChevronDown, FaChevronRight, FaTrash } from "react-icons/fa";

export default function ProjectSection({
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

  const [projectList, setProjectList] = useState<ProjectItem[]>([]);

  // Hydrate local state from resumeData on mount
  useEffect(() => {
    setProjectList((prev) => (prev.length ? prev : resumeData.projects || []));
  }, []);

  const updateProjects = (updated: ProjectItem[]) => {
    setProjectList(updated);
    setResumeData((prev) => ({ ...prev, projects: updated }));
    setValue("projects", updated);
  };

  const handleExperienceChange = <K extends keyof ProjectItem>(
    index: number,
    field: K,
    value: ProjectItem[K]
  ) => {
    const updated = [...projectList];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    updateProjects(updated);
  };

  const handleBulletChange = (
    expIdx: number,
    bulletIdx: number,
    value: string
  ) => {
    const updated = [...projectList];
    updated[expIdx].description[bulletIdx] = value;
    updateProjects(updated);
  };

  const addBullet = (expIdx: number) => {
    const updated = [...projectList];
    updated[expIdx].description.push("");
    updateProjects(updated);
  };

  const deleteBullet = (expIdx: number, bulletIdx: number) => {
    const updated = [...projectList];
    updated[expIdx].description.splice(bulletIdx, 1);
    updateProjects(updated);
  };

  const addProject = () => {
    const newExp: ProjectItem = {
      title: "",
      from: "",
      to: "",
      isCurrent: false,
      description: [],
    };
    updateProjects([...projectList, newExp]);
  };

  const deleteProject = (index: number) => {
    const updated = [...projectList];
    updated.splice(index, 1);
    updateProjects(updated);
  };

  const [collapsedState, setCollapsedState] = useState<boolean[]>(
    projectList.map(() => true)
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
      {projectList.map((exp, index) => (
        <div
          key={index}
          className="border p-4 rounded-md shadow space-y-4 relative"
        >
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
                Project {index + 1}
              </p>
            </div>
            <button
              type="button"
              onClick={() => deleteProject(index)}
              className="text-slate-400 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>

          <TextInput
            name={`projects.${index}.title`}
            label="Title"
            register={register}
            errors={errors}
            placeholder="e.g. Resume.io"
            onChange={(e) =>
              handleExperienceChange(index, "title", e.target.value)
            }
          />
          {!collapsedState[index] && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  name={`projects.${index}.from`}
                  label="From"
                  type="month"
                  register={register}
                  errors={errors}
                  onChange={(e) =>
                    handleExperienceChange(index, "from", e.target.value)
                  }
                />
                <TextInput
                  name={`projects.${index}.to`}
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
                This is in progress
              </label>

              <div>
                <label className="font-medium text-sm mb-1 block">
                  Project Description (bullet points)
                </label>
                <div className="space-y-2">
                  {exp.description.map((_, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2">
                      <TextInput
                        name={`projects.${index}.description.${bIdx}`}
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
                    className="text-primary hover:underline text-sm"
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
        onClick={addProject}
        className="px-4 py-2 border-primary border flex ml-auto text-primary rounded"
      >
        + Add Project
      </button>
    </div>
  );
}
