import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";
import { Text } from "../Text/Text";

export enum PillIntent {
  Primary = "primary",
  Green = "green",
  Pink = "pink",
  Orange = "orange",
}

export enum PillSize {}

const pillStyles = cva(
  "rounded-full px-3 py-0.5 text-sm border-[1px] inline-block",
  {
    variants: {
      intent: {
        [PillIntent.Primary]: "bg-white border-black",
        [PillIntent.Green]: "bg-green-light border-green-dark",
        [PillIntent.Pink]: "bg-pink-light border-pink-dark",
        [PillIntent.Orange]: "bg-orange-light border-orange-dark",
      },
      size: {},
    },
    defaultVariants: {
      intent: PillIntent.Primary,
    },
  }
);

interface PillProps
  extends PropsWithChildren,
    VariantProps<typeof pillStyles> {}

export const Pill = ({ intent, size, children }: PillProps) => {
  const styles = pillStyles({ intent, size });
  return (
    <div className={styles}>
      <Text>{children}</Text>
    </div>
  );
};
