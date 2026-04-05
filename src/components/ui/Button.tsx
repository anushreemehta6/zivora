import { buttonStyles } from "@/lib/ui";
import clsx from "clsx";

type Props = {
  variant?: keyof typeof buttonStyles;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

export default function Button({
  variant = "primary",
  children,
  className,
  type = "button",
  onClick,
  disabled
}: Props) {
  return (
    <button 
      type={type}
      className={clsx(buttonStyles[variant], className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
