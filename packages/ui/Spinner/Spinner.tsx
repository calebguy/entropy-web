import { Oval } from "react-loader-spinner";
import resolveConfig from "tailwindcss/resolveConfig";
// @ts-ignore
import tailwindConfig from "../tailwind.config.js";
const config = resolveConfig(tailwindConfig);

const gray = config?.theme?.colors?.gray as string;

export enum SpinnerSize {
  Sm = "sm",
  Lg = "lg",
}

const sizeMap = {
  [SpinnerSize.Sm]: 16,
  [SpinnerSize.Lg]: 22,
};

interface SpinnerProps {
  size?: SpinnerSize;
}

export const Spinner = ({ size = SpinnerSize.Sm }: SpinnerProps) => {
  return (
    <Oval
      color={gray}
      secondaryColor={gray}
      height={sizeMap[size]}
      width={sizeMap[size]}
      visible={true}
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};
