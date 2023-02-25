import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";
import { css } from "utils";

export enum DividerIntent {
  Vertical = "vertical",
  Horizontal = "horizontal",
}

const dividerStyles = cva("border-gray-dark border-solid opacity-25", {
  variants: {
    intent: {
      [DividerIntent.Vertical]: css("w-1", "border-l-[1px]"),
      [DividerIntent.Horizontal]: css("w-full", "border-t-[1px]"),
    },
  },
  defaultVariants: {
    intent: DividerIntent.Horizontal,
  },
});

interface DividerProps
  extends PropsWithChildren,
    VariantProps<typeof dividerStyles> {}

export const Divider = ({ intent, children }: DividerProps) => {
  const styles = dividerStyles({ intent });
  return <div className={styles}>{children}</div>;
};
