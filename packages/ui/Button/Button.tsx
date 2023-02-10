import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";
import { Text } from "../Text/Text";

export enum ButtonIntent {
  Primary = "primary",
  Secondary = "secondary",
  Green = "green",
  Pink = "pink",
  Orange = "orange",
}

export enum ButtonSize {
  Sm = "sm",
  Lg = "lg",
}

const buttonStyles = cva("", {
  variants: {
    intent: {
      [ButtonIntent.Primary]: "bg-brand text-white",
      [ButtonIntent.Secondary]:
        "bg-white border-[1px] border-black border-solid",
      [ButtonIntent.Green]:
        "bg-green-light border-[1px] border-green-dark border-solid",
      [ButtonIntent.Pink]:
        "bg-pink-light border-[1px] border-pink-dark border-solid",
      [ButtonIntent.Orange]:
        "bg-orange-light border-[1px] border-orange-dark border-solid",
    },
    size: {
      [ButtonSize.Sm]: "px-3 py-0.5 rounded-[12px]",
      [ButtonSize.Lg]: "px-2.5 py-1.5 rounded-[12px]",
    },
    round: {
      true: "rounded-full",
    },
  },
  defaultVariants: {
    intent: ButtonIntent.Primary,
    round: false,
    size: ButtonSize.Sm,
  },
});

export interface ButtonProps
  extends PropsWithChildren,
    VariantProps<typeof buttonStyles> {
  onClick?: () => void;
  children: string;
}

export const Button = ({
  intent,
  onClick,
  children,
  round,
  size,
}: ButtonProps) => {
  return (
    <button onClick={onClick} className={buttonStyles({ intent, round, size })}>
      <Text>{children}</Text>
    </button>
  );
};
