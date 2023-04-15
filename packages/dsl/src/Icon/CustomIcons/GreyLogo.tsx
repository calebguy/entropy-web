import { CustomIconProps } from "../Icon";
import Logo from "./Logo";

import resolveConfig from "tailwindcss/resolveConfig";
//@ts-ignore
import tailwindConfig from "../../../tailwind.config.js";
const config = resolveConfig(tailwindConfig);

const GreyLogo = (props: CustomIconProps) => {
  return <Logo fill={config.theme.colors.gray.medium} size={props.size} />;
};

export default GreyLogo;
