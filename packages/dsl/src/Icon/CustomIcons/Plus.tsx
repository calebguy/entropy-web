import { CustomIconProps } from "../Icon";

const Plus = ({ size, fill = "#342F2F" }: CustomIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="39"
        height="39"
        rx="9"
        stroke={fill}
        strokeWidth="2"
      />
      <path
        d="M28.7385 19.0672H21.9328V12.2614C21.9328 12.0644 21.7716 11.9032 21.5746 11.9032H19.4254C19.2284 11.9032 19.0672 12.0644 19.0672 12.2614V19.0672H12.2614C12.0644 19.0672 11.9032 19.2284 11.9032 19.4254V21.5746C11.9032 21.7716 12.0644 21.9328 12.2614 21.9328H19.0672V28.7386C19.0672 28.9356 19.2284 29.0968 19.4254 29.0968H21.5746C21.7716 29.0968 21.9328 28.9356 21.9328 28.7386V21.9328H28.7385C28.9356 21.9328 29.0967 21.7716 29.0967 21.5746V19.4254C29.0967 19.2284 28.9356 19.0672 28.7385 19.0672Z"
        fill={fill}
      />
    </svg>
  );
};

export default Plus;
