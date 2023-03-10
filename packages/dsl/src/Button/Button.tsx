import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";
import { useFormState } from "react-hook-form";
import { css } from "utils";
import { Spinner, SpinnerSize } from "../Spinner/Spinner";
import { Text, TextIntent, TextSize } from "../Text/Text";

export enum ButtonIntent {
  Primary = "primary",
  Secondary = "secondary",
  DeepBlue = "deep-blue",
  Orange = "orange",
  Green = "green",
  Gray = "gray",
}

export enum ButtonSize {
  Sm = "sm",
  Md = "md",
  Lg = "lg",
}

const sizeToRadius = {
  [ButtonSize.Sm]: "rounded-md",
  [ButtonSize.Md]: "rounded-md",
  [ButtonSize.Lg]: "rounded-lg",
};

const buttonStyles = cva(
  "border-[1px] border-solid inline-flex items-center justify-center relative disabled:opacity-50",
  {
    variants: {
      intent: {
        [ButtonIntent.Primary]: "border-none bg-brand text-white",
        [ButtonIntent.Secondary]: "bg-white border-black",
        [ButtonIntent.Orange]: "bg-orange-neon border-black",
        [ButtonIntent.Green]: "bg-green-neon border-black",
        [ButtonIntent.DeepBlue]: "bg-white border-deep-blue text-deep-blue",
        [ButtonIntent.Gray]:
          "bg-gray-medium border-none disabled:bg-gray-light",
      },
      size: {
        [ButtonSize.Sm]: "px-3 py-1",
        [ButtonSize.Md]: "px-4 py-3",
        [ButtonSize.Lg]: "px-6 py-3.5",
      },
      round: {
        true: "!rounded-full",
      },
      block: {
        true: "w-full",
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
  onClick?: (e: any) => void;
  children: React.ReactNode;
  submit?: boolean;
  disabled?: boolean;
  loading?: boolean;
  intent?: ButtonIntent;
  size?: ButtonSize;
  bold?: boolean;
}

const buttonSizeToTextSize = {
  [ButtonSize.Sm]: TextSize.Md,
  [ButtonSize.Md]: TextSize.Md,
  [ButtonSize.Lg]: TextSize.Lg,
};

const buttonSizeToSpinnerSize = {
  [ButtonSize.Sm]: SpinnerSize.Sm,
  [ButtonSize.Md]: SpinnerSize.Sm,
  [ButtonSize.Lg]: SpinnerSize.Lg,
};

const buttonIntentToTextIntent = {
  [ButtonIntent.Primary]: TextIntent.White,
  [ButtonIntent.Secondary]: TextIntent.Black,
  [ButtonIntent.Orange]: TextIntent.Black,
  [ButtonIntent.Green]: TextIntent.Black,
  [ButtonIntent.DeepBlue]: TextIntent.DeepBlue,
  [ButtonIntent.Gray]: TextIntent.White,
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
  block,
  bold,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || loading}
      type={submit ? "submit" : "button"}
      onClick={onClick}
      className={css(
        buttonStyles({ intent, round, size, block }),
        sizeToRadius[size]
      )}
    >
      <Text
        intent={buttonIntentToTextIntent[intent]}
        size={buttonSizeToTextSize[size]}
        bold={bold}
      >
        {children}
      </Text>
      {loading && (
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

interface SubmitProps extends Omit<ButtonProps, "submit" | "children"> {
  children?: string;
}

export const Submit = ({ ...rest }: SubmitProps) => {
  const state = useFormState();
  const hasErrors = Object.keys(state.errors).length > 0;
  console.log("debug:: submitting", state.isSubmitting);
  return (
    <Button
      submit
      loading={state.isSubmitting}
      disabled={hasErrors}
      children={rest.children ? rest.children : "Submit"}
      {...rest}
    />
  );
};
