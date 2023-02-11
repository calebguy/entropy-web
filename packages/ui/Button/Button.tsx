import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";
import { Text, TextSize } from "../Text/Text";

export enum ButtonIntent {
  Primary = "primary",
  Secondary = "secondary",
  Green = "green",
  Pink = "pink",
  Orange = "orange",
  NeonOrange = "neon-orange",
  NeonGreen = "neon-green",
}

export enum ButtonSize {
  Sm = "sm",
  Lg = "lg",
}

const buttonStyles = cva(
  "border-[1px] border-solid inline-flex items-center justify-center",
  {
    variants: {
      intent: {
        [ButtonIntent.Primary]: "border-none bg-brand text-white",
        [ButtonIntent.Secondary]: "bg-white border-black",
        [ButtonIntent.Green]: "bg-green-light border-green-dark",
        [ButtonIntent.Pink]: "bg-pink-light border-pink-dark",
        [ButtonIntent.Orange]: "bg-orange-light border-orange-dark",
        [ButtonIntent.NeonOrange]: "bg-orange-neon border-black",
        [ButtonIntent.NeonGreen]: "bg-green-neon border-black",
      },
      size: {
        [ButtonSize.Sm]: "px-4 py-0.25 rounded-md",
        [ButtonSize.Lg]: "px-4 py-1.5 rounded-lg",
      },
      round: {
        true: "!rounded-full",
      },
    },
    defaultVariants: {
      intent: ButtonIntent.Primary,
      round: false,
      size: ButtonSize.Sm,
    },
  }
);

export interface ButtonProps
  extends PropsWithChildren,
    VariantProps<typeof buttonStyles> {
  onClick?: () => void;
  children: string;
}

const buttonSizeToTextSize = {
  [ButtonSize.Sm]: TextSize.Sm,
  [ButtonSize.Lg]: TextSize.Lg,
};

export const Button = ({
  intent,
  onClick,
  children,
  round,
  size,
}: ButtonProps) => {
  return (
    <button onClick={onClick} className={buttonStyles({ intent, round, size })}>
      <Text size={buttonSizeToTextSize[size as ButtonSize]}>{children}</Text>
    </button>
  );
};
