import { formatMonthYear } from "../utils/helper";
import type { ResumeData } from "../utils/types";
import Separator from "./common/Separator";

export default function ResumePreview({
  data,
}: {
  data: ResumeData;
}) {
  const {
    personalInfo,
    experience,
    education,
    skills,
    achievements,
    projects,
  } = data;

  return (
    <div className="bg-white p-6 rounded shadow-inner flex justify-evenly flex-col text-black font-sans text-sm space-y-3 leading-relaxed overflow-auto">
      {/* Personal info */}
      <div className="text-center">
          <h1 className="text-2xl font-semibold">
            {personalInfo.name || "Your Name"}
          </h1>
          <p className="text-gray-700">
            {personalInfo.location || "Location"} |{" "}
            {personalInfo.email || "Email"} | {personalInfo.phone || "Contact"}
          </p>
          <p className="text-gray-700"></p>
          <div className="flex flex-row text-center justify-center flex-wrap gap-1 text-xs underline">
            {personalInfo.linkedIn && (
              <a
                href={personalInfo.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                LinkedIn
              </a>
            )}
            {personalInfo.github && (
              <>
                <Separator condition={true} icon="|" />{" "}
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  GitHub
                </a>
              </>
            )}
            {personalInfo.leetcode && (
              <>
                <Separator condition={true} icon="|" />
                <a
                  href={personalInfo.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  LeetCode
                </a>
              </>
            )}
            {personalInfo.portfolio && (
              <>
                <Separator condition={true} icon="|" />
                <a
                  href={personalInfo.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  Portfolio
                </a>
              </>
            )}
          </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mt-5">
          <h2 className="text-base font-semibold border-b mb-1">SUMMARY</h2>
          <p className="text-gray-800 whitespace-pre-line text-sm text-justify leading-tight">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="">
          <h2 className="text-base font-semibold border-b mb-1">EDUCATION</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-1 leading-tight">
              <div className="w-full flex items-start justify-between font-medium">
                <p className="text-sm">
                  {edu.course}
                  <Separator
                    condition={!!(edu.course && edu.specialisation)}
                    icon="|"
                  />
                  {edu.specialisation}
                </p>
                <p className="text-xs whitespace-break-spaces">
                  {formatMonthYear(edu.from)}
                  <Separator
                    condition={!!edu.from && !!(edu.to || edu.inProgress)}
                    icon="-"
                  />
                  {edu.inProgress ? "Present" : formatMonthYear(edu.to)}
                </p>
              </div>

              <p className="font-normal text-sm">
                {edu.school}
                <Separator
                  condition={!!(edu.cgpa || edu.percentage)}
                  icon="|"
                />
                {edu.cgpa
                  ? "CGPA - " + edu.cgpa
                  : edu.percentage
                  ? "Percentage - " + edu.percentage
                  : null}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="">
          <h2 className="text-base font-semibold border-b mb-1">
            WORK EXPERIENCE
          </h2>
          {experience.map((exp, index) => exp.jobTitle && (
            <div key={index} className="mb-2">
              <div className="font-medium">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">{exp.jobTitle}</p>
                  <p className="flex items-center whitespace-break-spaces text-xs">
                    {formatMonthYear(exp.from)}
                    <Separator
                      condition={!!exp.from && !!(exp.to || exp.isCurrent)}
                      icon="-"
                    />
                    {exp.isCurrent ? "Present" : formatMonthYear(exp.to)}
                  </p>
                </div>
                <p className="text-xs">{exp.company}</p>
              </div>
              <ul className="list-disc pl-5 text-gray-800 space-y-1 mt-1">
                {exp.description.map((point, idx) => (
                  <li key={idx} className="leading-tight text-justify text-xs">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="">
          <h2 className="text-base font-semibold border-b mb-1">PROJECTS</h2>
          {projects.map((exp, index) => (
            <div key={index} className="mb-2">
              <div className="font-medium">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">{exp.title}</p>
                  <p className="flex items-center whitespace-break-spaces text-xs">
                    {formatMonthYear(exp.from)}
                    {exp.from !== exp.to && (
                      <>
                        {" "}
                        <Separator
                          condition={!!exp.from && !!(exp.to || exp.isCurrent)}
                          icon="-"
                        />
                        {exp.isCurrent ? "Present" : formatMonthYear(exp.to)}
                      </>
                    )}
                  </p>
                </div>
              </div>
              <ul className="list-disc pl-5 text-gray-800 ">
                {exp.description.map((point, idx) => (
                  <li key={idx} className="leading-tight text-justify text-xs">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="">
          <h2 className="text-base font-semibold border-b mb-1">SKILLS</h2>
          <ul className="list-disc ml-5 text-gray-800 leading-tight text-[0.8rem]">
            {skills.map((item, index) => (
              <li key={index}>
                <span className="font-medium">{item.title}</span>
                <Separator
                  condition={!!(item.title && item.description)}
                  icon=":"
                />
                {item.description}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <section className="">
          <h2 className="text-base font-semibold border-b mb-1">
            ACHIEVEMENTS & CERTIFICATIONS
          </h2>
          <ul className="list-disc ml-5 text-gray-800 leading-tight text-[0.8rem]">
            {achievements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
