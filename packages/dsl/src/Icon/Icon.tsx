import { PropsWithChildren } from "react";
import Close from "./CustomIcons/Close";
import FourSquare from "./CustomIcons/FourSquare";
import Heart from "./CustomIcons/Heart";
import Logo from "./CustomIcons/Logo";
import Plus from "./CustomIcons/Plus";

export enum IconSize {}

export enum IconName {
  Logo = "logo",
  Close = "close",
  Heart = "heart",
  FourSquare = "four-square",
  Plus = "plus",
}

const iconMapToComponentMap = {
  [IconName.Logo]: Logo,
  [IconName.FourSquare]: FourSquare,
  [IconName.Plus]: Plus,
  [IconName.Close]: Close,
  [IconName.Heart]: Heart,
};

interface IconProps extends PropsWithChildren {
  name: IconName;
  size?: number;
  fill?: string;
}

export interface CustomIconProps extends Pick<IconProps, "size" | "fill"> {}

export const Icon = ({ size = 32, name, fill }: IconProps) => {
  const Component = iconMapToComponentMap[name];
  return <Component size={size} fill={fill} />;
};
