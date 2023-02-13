import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";
import { css } from "utils";
import { Spinner, SpinnerSize } from "../Spinner/Spinner";
import { Text, TextIntent, TextSize } from "../Text/Text";

export enum ButtonIntent {
  Primary = "primary",
  Secondary = "secondary",
  DeepBlue = "deep-blue",
  Orange = "orange",
  Green = "green",
}

export enum ButtonSize {
  Sm = "sm",
  Lg = "lg",
}

const sizeToRadius = {
  [ButtonSize.Sm]: "rounded-md",
  [ButtonSize.Lg]: "rounded-lg",
};

const buttonStyles = cva(
  "border-[1px] border-solid inline-flex items-center justify-center relative",
  {
    variants: {
      intent: {
        [ButtonIntent.Primary]: "border-none bg-brand text-white",
        [ButtonIntent.Secondary]: "bg-white border-black",
        [ButtonIntent.Orange]: "bg-orange-neon border-black",
        [ButtonIntent.Green]: "bg-green-neon border-black",
        [ButtonIntent.DeepBlue]: "bg-white border-deep-blue text-deep-blue",
      },
      size: {
        [ButtonSize.Sm]: "px-3 py-2",
        [ButtonSize.Lg]: "px-6 py-1.5",
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
  submit?: boolean;
  disabled?: boolean;
  loading?: boolean;
  intent?: ButtonIntent;
  size?: ButtonSize;
}

const buttonSizeToTextSize = {
  [ButtonSize.Sm]: TextSize.Md,
  [ButtonSize.Lg]: TextSize.Lg,
};

const buttonSizeToSpinnerSize = {
  [ButtonSize.Sm]: SpinnerSize.Sm,
  [ButtonSize.Lg]: SpinnerSize.Lg,
};

const buttonIntentToTextIntent = {
  [ButtonIntent.Primary]: TextIntent.White,
  [ButtonIntent.Secondary]: TextIntent.Black,
  [ButtonIntent.Orange]: TextIntent.Black,
  [ButtonIntent.Green]: TextIntent.Black,
  [ButtonIntent.DeepBlue]: TextIntent.DeepBlue,
};

export const Button = ({
  intent = ButtonIntent.Primary,
  onClick,
  children,
  round,
  size = ButtonSize.Sm,
  submit,
  disabled,
  loading,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || loading}
      type={submit ? "submit" : "button"}
      onClick={onClick}
      className={css(buttonStyles({ intent, round, size }), sizeToRadius[size])}
    >
      <Text
        intent={buttonIntentToTextIntent[intent]}
        size={buttonSizeToTextSize[size]}
      >
        {children}
      </Text>
      {(loading || disabled) && (
        <>
          <div
            className={css(
              "w-full",
              "h-full",
              "absolute",
              "inset-0",
              "bg-white",
              "opacity-80",
              {
                "rounded-full": round,
                [sizeToRadius[size]]: !round,
              }
            )}
          />
          <div
            className={css(
              "w-full",
              "h-full",
              "absolute",
              "inset-0",
              "flex",
              "justify-center",
              "items-center"
            )}
          >
            <Spinner size={buttonSizeToSpinnerSize[size]} />
          </div>
        </>
      )}
    </button>
  );
};
