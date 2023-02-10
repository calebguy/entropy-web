import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";

export enum ButtonIntent {
  Primary = "primary",
  Secondary = "secondary",
}

const buttonStyles = cva("px-3 py-2 rounded-[12px]", {
  variants: {
    intent: {
      [ButtonIntent.Primary]: "bg-brand text-white",
      [ButtonIntent.Secondary]:
        "bg-white border-[1px] border-black border-solid",
    },
    round: {
      true: "rounded-full",
    },
  },
  defaultVariants: {
    intent: ButtonIntent.Primary,
    round: false,
  },
});

interface ButtonProps
  extends PropsWithChildren,
    VariantProps<typeof buttonStyles> {
  onClick?: () => void;
}

export const Button = ({ intent, onClick, children, round }: ButtonProps) => {
  return (
    <button onClick={onClick} className={buttonStyles({ intent, round })}>
      {children}
    </button>
  );
};
