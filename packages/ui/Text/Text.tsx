import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";

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
}

const textStyles = cva("font-sans", {
  variants: {
    intent: {
      [TextIntent.Black]: "text-black",
      [TextIntent.White]: "text-white",
      [TextIntent.DeepBlue]: "text-deep-blue",
      [TextIntent.Gray]: "text-gray",
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

export const Text: React.FC<TextProps> = ({ children, bold, intent, size }) => {
  return <span className={textStyles({ intent, bold, size })}>{children}</span>;
};
