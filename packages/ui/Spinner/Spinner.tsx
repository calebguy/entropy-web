import { Oval } from "react-loader-spinner";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
const config = resolveConfig(tailwindConfig);

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
      color={config.theme.colors.gray}
      secondaryColor={config.theme.colors.gray}
      height={sizeMap[size]}
      width={sizeMap[size]}
      visible={true}
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};
