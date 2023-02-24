import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";

export enum PaneSize {
  Sm = "sm",
  Lg = "lg",
}

export enum PaneIntent {
  Primary = "primary",
  Secondary = "secondary",
}

const paneStyles = cva("border-[1px] border-solid border-black", {
  variants: {
    intent: {
      [PaneIntent.Primary]: "bg-white",
      [PaneIntent.Secondary]: "bg-gray-dark",
    },
    size: {
      [PaneSize.Sm]: "rounded-sm p-1",
      [PaneSize.Lg]: "rounded-md p-3",
    },
    block: {
      true: "w-full",
      false: "inline-block",
    },
  },
  defaultVariants: {
    intent: PaneIntent.Primary,
    size: PaneSize.Sm,
    block: false,
  },
});

interface PaneProps
  extends PropsWithChildren,
    VariantProps<typeof paneStyles> {}

export const Pane = ({ children, intent, size, block }: PaneProps) => {
  return <div className={paneStyles({ intent, size, block })}>{children}</div>;
};
