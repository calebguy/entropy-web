import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";
import { css } from "utils";
import styles from "./Text.module.css";

export enum TextSize {
  Xs = "xs",
  Sm = "sm",
  Md = "md",
  Lg = "lg",
  Xl = "xl",
}

export enum TextIntent {
  Black = "black",
  White = "white",
  DeepBlue = "deep-blue",
  Gray = "gray",
  Outline = "outline",
  Error = "error",
}

const textStyles = cva("font-sans", {
  variants: {
    intent: {
      [TextIntent.Black]: "text-black",
      [TextIntent.White]: "text-white",
      [TextIntent.DeepBlue]: "text-deep-blue",
      [TextIntent.Gray]: "text-gray",
      [TextIntent.Outline]: css("text-white", styles["text-stroke"]),
      [TextIntent.Error]: "text-red-600",
    },
    size: {
      [TextSize.Xs]: "text-xs",
      [TextSize.Sm]: "text-sm",
      [TextSize.Md]: "text-base",
      [TextSize.Lg]: "text-lg",
      [TextSize.Xl]: "text-xl",
    },
    bold: {
      true: "font-bold",
      false: "font-normal",
    },
    block: {
      true: "block",
    },
  },
  defaultVariants: {
    intent: TextIntent.Black,
    size: TextSize.Md,
    bold: false,
  },
});

interface TextProps
  extends PropsWithChildren,
    VariantProps<typeof textStyles> {}

export const Text = ({ children, bold, intent, size, block }: TextProps) => {
  return (
    <span className={textStyles({ intent, bold, size, block })}>
      {children}
    </span>
  );
};
