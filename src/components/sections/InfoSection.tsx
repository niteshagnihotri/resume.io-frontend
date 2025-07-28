import type { Dispatch, SetStateAction } from "react";
import type { ResumeData } from "../../utils/types";
import TextInput from "../TextInput";
import { useFormContext } from "react-hook-form";

export default function InfoSection({
  setResumeData,
}: {
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ResumeData>();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Full Name */}
      <TextInput
        name="personalInfo.name"
        label="Full Name"
        register={register}
        errors={errors}
        placeholder="Enter Full Name"
        onChange={(e) =>
          setResumeData((prev) => ({
            ...prev,
            personalInfo: {
              ...prev.personalInfo,
              name: e.target.value,
            },
          }))
        }
      />

      {/* Email */}
      <TextInput
        name="personalInfo.email"
        label="Email Address"
        type="email"
        register={register}
        errors={errors}
        placeholder="Enter Email Address"
        onChange={(e) =>
          setResumeData((prev) => ({
            ...prev,
            personalInfo: {
              ...prev.personalInfo,
              email: e.target.value,
            },
          }))
        }
      />

      {/* Phone */}
      <TextInput
        name="personalInfo.phone"
        label="Phone Number"
        type="tel"
        register={register}
        errors={errors}
        placeholder="Enter Phone Number"
        onChange={(e) =>
          setResumeData((prev) => ({
            ...prev,
            personalInfo: {
              ...prev.personalInfo,
              phone: e.target.value,
            },
          }))
        }
      />

      {/* Location */}
      <TextInput
        name="personalInfo.location"
        label="Location"
        type="text"
        register={register}
        errors={errors}
        placeholder="City, State, Country"
        onChange={(e) =>
          setResumeData((prev) => ({
            ...prev,
            personalInfo: {
              ...prev.personalInfo,
              location: e.target.value,
            },
          }))
        }
      />

      <TextInput
        name="personalInfo.github"
        label="Github"
        type="text"
        register={register}
        errors={errors}
        placeholder="Github link"
        onChange={(e) =>
          setResumeData((prev) => ({
            ...prev,
            personalInfo: {
              ...prev.personalInfo,
              github: e.target.value,
            },
          }))
        }
      />

      <TextInput
        name="personalInfo.linkedIn"
        label="LinkedIn"
        type="text"
        register={register}
        errors={errors}
        placeholder="LinkedIn link"
        onChange={(e) =>
          setResumeData((prev) => ({
            ...prev,
            personalInfo: {
              ...prev.personalInfo,
              linkedIn: e.target.value,
            },
          }))
        }
      />

       <TextInput
        name="personalInfo.portfolio"
        label="Portfolio"
        type="text"
        register={register}
        errors={errors}
        placeholder="Portfolio link"
        onChange={(e) =>
          setResumeData((prev) => ({
            ...prev,
            personalInfo: {
              ...prev.personalInfo,
              portfolio: e.target.value,
            },
          }))
        }
      />

      {/* <TextInput
        name="personalInfo.other.ti"
        label="Other"
        type="text"
        register={register}
        errors={errors}
        placeholder="Other link"
        onChange={(e) =>
          setResumeData((prev) => ({
            ...prev,
            personalInfo: {
              ...prev.personalInfo,
              other: e.target.value,
            },
          }))
        }
      /> */}
    </div>
  );
}
