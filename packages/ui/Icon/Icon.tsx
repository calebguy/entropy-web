import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";
import LogoInverted from "./CustomIcons/ LogoInverted";
import Check from "./CustomIcons/Check";
import Close from "./CustomIcons/Close";
import FourSquare from "./CustomIcons/FourSquare";
import Logo from "./CustomIcons/Logo";
import Plus from "./CustomIcons/Plus";

export enum IconSize {}

const iconStyles = cva("", {
  variants: {
    intent: {},
    size: {},
  },
  defaultVariants: {},
});

export enum IconName {
  Logo = "logo",
  Close = "close",
  Check = "check",
  FourSquare = "four-square",
  Plus = "plus",
  LogoInverted = "logo-inverted",
}

const iconMapToComponentMap = {
  [IconName.Logo]: Logo,
  [IconName.FourSquare]: FourSquare,
  [IconName.Plus]: Plus,
  [IconName.Close]: Close,
  [IconName.Check]: Check,
  [IconName.LogoInverted]: LogoInverted,
};

interface IconProps extends PropsWithChildren, VariantProps<typeof iconStyles> {
  name: IconName;
}

export const Icon = ({ intent, size, children, name }: IconProps) => {
  const styles = iconStyles({ intent, size });
  const Component = iconMapToComponentMap[name];
  return <Component />;
};
