import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";

export enum TextSize {
  Xs = "xs",
  Sm = "sm",
  Md = "md",
  Lg = "lg",
}

const textStyles = cva("font-sans", {
  variants: {
    intent: {},
    size: {
      [TextSize.Xs]: "text-xs",
      [TextSize.Sm]: "text-sm",
      [TextSize.Md]: "text-lg",
      [TextSize.Lg]: "text-2xl",
    },
    bold: {
      true: "font-bold",
      false: "font-normal",
    },
  },
  defaultVariants: {
    size: TextSize.Sm,
    bold: false,
  },
});

interface TextProps
  extends PropsWithChildren,
    VariantProps<typeof textStyles> {}

export const Text: React.FC<TextProps> = ({ children, bold, intent, size }) => {
  return <span className={textStyles({ intent, bold, size })}>{children}</span>;
};
