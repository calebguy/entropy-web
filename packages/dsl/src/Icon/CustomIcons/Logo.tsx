import resolveConfig from "tailwindcss/resolveConfig";
//@ts-ignore
import tailwindConfig from "../../../tailwind.config.js";
import { CustomIconProps } from "../Icon";
const config = resolveConfig(tailwindConfig);

const Logo = ({
  size,
  fill = config!.theme!.colors!.brand as string,
}: CustomIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M41 20.5C41 31.8218 31.8218 41 20.5 41C9.17816 41 0 31.8218 0 20.5C0 9.17816 9.17816 0 20.5 0C31.8218 0 41 9.17816 41 20.5ZM37.094 20.6053C37.094 27.9587 33.1119 33.9198 28.1998 33.9198C23.2877 33.9198 19.3056 27.9587 19.3056 20.6053C19.3056 13.252 23.2877 7.29089 28.1998 7.29089C33.1119 7.29089 37.094 13.252 37.094 20.6053ZM11.3341 17.5415C12.9216 17.5415 14.2085 15.176 14.2085 12.258C14.2085 9.34002 12.9216 6.97451 11.3341 6.97451C9.74669 6.97451 8.45981 9.34002 8.45981 12.258C8.45981 15.176 9.74669 17.5415 11.3341 17.5415Z"
        fill={fill}
      ></path>
    </svg>
  );
};

export default Logo;
