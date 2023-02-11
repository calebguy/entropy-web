import { PropsWithChildren } from "react";
import { css } from "utils";
import "./AspectRatio.css";

const CUSTOM_PROPERTY_NAME = "--aspect-ratio";

interface AspectRatioProps extends PropsWithChildren {
  className?: string;
  ratio: number | string;
  style?: React.CSSProperties;
}

export const AspectRatio = ({
  children,
  className,
  ratio = 1,
  style = {},
}: AspectRatioProps) => {
  const computedStyle = {
    [CUSTOM_PROPERTY_NAME]: `(${ratio})`,
    ...style,
  } as React.CSSProperties;
  return (
    <div className={css(className)} style={computedStyle}>
      {children}
    </div>
  );
};
