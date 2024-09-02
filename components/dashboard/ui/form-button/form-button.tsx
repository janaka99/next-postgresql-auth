import { styleHelper } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from "react";
import { ImSpinner2 } from "react-icons/im";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isProcessing?: boolean;
  classes?: string;
  variant?: "default" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  align?: "default" | "right" | "left" | "center";
  className?: string;
  children: ReactNode;
}

const FormButton = ({
  isProcessing = false,
  variant = "default",
  size = "default",
  align = "default",
  className = "",
  children,
  ...props
}: Props) => {
  const buttonVariants = cva(
    `w-full text-sm text-center flex items-center  transition-all duration-200 text-white rounded-md shadow-inners `,
    {
      variants: {
        variant: {
          default: ` ${
            isProcessing ? "bg-blue-400" : "bg-blue-500  hover:bg-blue-600"
          }`,
          destructive: ` ${
            isProcessing ? "bg-red-400" : "bg-red-500  hover:bg-red-600"
          }`,
        },
        size: {
          default: "py-4 h-12 px-4",
          sm: "h-10 rounded-md px-3 py-4",
          lg: "h-16 rounded-md px-8 py-4",
          icon: "h-10 w-10",
        },
        align: {
          default: "justify-center",
          center: "justify-center",
          left: "justify-start",
          right: "justify-end",
        },
      },
    }
  );

  return (
    <button
      className={styleHelper(
        buttonVariants({ variant, size, className, align })
      )}
      {...props}
    >
      {isProcessing ? (
        <ImSpinner2 className="animate-spin mx-auto text-base" />
      ) : (
        `${children}`
      )}
    </button>
  );
};

export default FormButton;
