import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";

const buttonStyles = cva("flex", {
  variants: {
    intent: { primary: "bg-blue-500 border-[5px] border-black" },
  },
  defaultVariants: {
    intent: "primary",
  },
});

interface ButtonProps extends VariantProps<typeof buttonStyles> {}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  intent,
}) => {
  return <button className={buttonStyles({ intent })}>nooop</button>;
};
