import { MdErrorOutline } from "react-icons/md";
import { cn } from "../utils/helper";

type Props = {
  message: string;
  className?: string;
};

const InputError = ({ message, className }: Props) => {
  return (
    <div
      className={cn(
        "text-red-500 font-medium flex text-sm items-center gap-1",
        className,
      )}
    >
      <MdErrorOutline className="text-base flex-none" />
      <span>{message}</span>
    </div>
  );
};

export default InputError;
