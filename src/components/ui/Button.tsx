import { buttonStyles } from "../../../lib/ui";
import clsx from "clsx";

type Props = {
  variant?: keyof typeof buttonStyles;
  children: React.ReactNode;
  className?: string;
  type?:string;
};

export default function Button({
  variant = "primary",
  children,
  className,
  type,
}: Props) {
  return (
    <button className={clsx(buttonStyles[variant], className,type)}>
      {children}
    </button>
  );
}