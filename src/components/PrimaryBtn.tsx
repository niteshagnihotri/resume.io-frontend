import { cn } from "../utils/helper";

export default function PrimaryBtn({
  type = "button",
  isDisabled = false,
  value,
  onClick,
  variant = "outlined",
  className = "",
  iconSrc,
  iconClassName = "",
  loading = false,
}: {
  type?: "button" | "submit" | "reset" | undefined;
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  value: string;
  variant?: "outlined" | "filled";
  className?: string;
  iconClassName?: string;
  iconSrc?: string;
  loading?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        "cursor-pointer hover:opacity-80 px-8 text-base py-2 bg-gray-200 rounded shadow-sm",
        variant === "outlined" && "border border-primary text-primary bg-white",
        variant === "filled" && "bg-primary border-primary text-white",
        isDisabled && "opacity-50 hover:shadow-none",
        iconSrc && "flex items-center px-5 py-[10px] gap-2",
        loading && "animate-bounce",
        className,
      )}
    >
      {iconSrc && (
        <img
          src={iconSrc}
          className={cn(iconClassName, "")}
          alt="resumeio"
          width={8}
          height={8}
        />
      )}
      {value}
    </button>
  );
}
