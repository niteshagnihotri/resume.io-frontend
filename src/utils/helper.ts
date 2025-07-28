import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ResumeData } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMonthYear = (value: string): string => {
  if (!value) return "";
  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleString("default", { month: "short", year: "numeric" }); // Jul 2025
};

const LOCAL_STORAGE_KEY = "resumeData";
const EXPIRY_HOURS = 6; // change as needed

export function loadResumeDataWithExpiry(): ResumeData | null {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored);
    const now = Date.now();
    const isExpired = now - parsed.timestamp > EXPIRY_HOURS * 60 * 60 * 1000;

    if (isExpired) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      return null;
    }

    return parsed.data;
  } catch {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return null;
  }
}

export function saveResumeDataWithExpiry(data: ResumeData) {
  const payload = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
}

export const defaultResumeData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  },
  projects: [],
  experience: [],
  education: [],
  achievements: [],
  skills: [],
}