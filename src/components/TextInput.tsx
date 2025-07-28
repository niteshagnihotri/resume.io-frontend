import React, { useEffect } from "react";
import type { FieldErrors, FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import { cn } from "../utils/helper";
import InputError from "./InputError";

interface TextInputComponentProps<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  type?: string;
  required?: boolean;
  defaultVal?: string | number;
  placeholder?: string;
  icon?: string;
  className?: string;
  labelClassName?: string;
  isLabelVisible?: boolean;
  options?: RegisterOptions<T, Path<T>>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  isDisabled?: boolean;
  variant?: "filled" | "outline";
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  manualOnKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  minVal?: number;
  maxVal?: number;
  minimize?: boolean;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const getNestedProperty = (obj: any, path: string) => {
  const keys = path.replace(/\[(\d+)]/g, ".$1").split(".");
  return keys.reduce((acc, key) => acc && acc[key], obj);
};
/* eslint-enable @typescript-eslint/no-explicit-any */
const TextInput = <T extends FieldValues>({
  label,
  name,
  placeholder,
  icon,
  type = "text",
  required = false,
  defaultVal = "",
  className = "",
  labelClassName = "",
  isLabelVisible = true,
  register,
  errors,
  options = {},
  isDisabled = false,
  variant = "outline",
  onChange,
  manualOnKeyDown,
  minVal,
  maxVal,
  minimize,
}: TextInputComponentProps<T>) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (manualOnKeyDown) {
        manualOnKeyDown(event);
      }
    }
    if (minVal !== undefined && minVal >= 0 && event.key == "-") {
      event.preventDefault();
    }
  };

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (type === "number") {
        event.preventDefault();
      }
    };
    const inputElement = document.getElementById(name) as HTMLInputElement;
    if (type === "number" && inputElement) {
      inputElement.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        inputElement.removeEventListener("wheel", handleWheel);
      };
    }
  }, [type, name]);

  return (
    <div className={cn("", minimize ? "w-max" : "w-full")}>
      <label
        htmlFor={name}
        className={cn(
          `text-sm`,
          isLabelVisible ? "block mb-1" : "hidden",
          labelClassName,
        )}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute -translate-y-1/2 pointer-events-none right-2 top-1/2">
            <img src={icon} alt="icon" width={21} height={21} />
          </span>
        )}
        <input
          id={name}
          {...register(name, {
            required: required
              ? `${label || "This field"} is required!`
              : false,
            ...options,
          })}
          type={type}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className={cn(
            `w-full rounded-md px-2.5 py-2 text-sm focus:outline-none bg-white`,
            variant === "outline"
              ? "border"
              : "border border-transparent bg-gray-100",
            className,
          )}
          defaultValue={defaultVal}
          onChange={onChange}
          min={minVal}
          max={maxVal}
          disabled={isDisabled}
        />
      </div>

      {getNestedProperty(errors, name) && (
        <InputError message={getNestedProperty(errors, name)?.message} />
      )}
    </div>
  );
};

export default TextInput;
