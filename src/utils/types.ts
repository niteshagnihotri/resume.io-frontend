export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  github?: string;
  linkedIn?: string;
  leetcode?: string;
  portfolio?: string;
  summary: string; 
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  achievements: string[];
  skills: SkillItem[];
}

export interface SkillItem {
  title: string;
  description: string;
}

export interface ExperienceItem {
  jobTitle: string;
  company: string;
  from: string; 
  to: string;
  isCurrent: boolean;
  description: string[];
}

export interface ProjectItem {
  title: string;
  from: string; 
  to: string;
  isCurrent: boolean;
  description: string[];
}

export interface EducationItem {
  school: string;
  from: string;
  to: string;
  course: string;
  specialisation: string;
  cgpa?: string;
  percentage?: string;
  inProgress: boolean;
}