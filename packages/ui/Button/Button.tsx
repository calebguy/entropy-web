import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";

export enum ButtonIntent {
  Primary = "primary",
}

const buttonStyles = cva("flex", {
  variants: {
    intent: {
      [ButtonIntent.Primary]:
        "bg-brand text-white px-3 py-2 rounded-[12px] hover:bg-black text-sans",
    },
    size: { small: "text-sm", large: "text-lg" },
  },
  defaultVariants: {
    intent: ButtonIntent.Primary,
    size: "large",
  },
});

interface ButtonProps
  extends PropsWithChildren,
    VariantProps<typeof buttonStyles> {
  onClick?: () => void;
}

export const Button = ({ intent, onClick, children }: ButtonProps) => {
  return (
    <button onClick={onClick} className={buttonStyles({ intent })}>
      {children}
    </button>
  );
};
