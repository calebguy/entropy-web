import { PropsWithChildren } from "react";
import { Text, TextSize } from "ui";
import { css } from "utils";

interface DemoProps extends PropsWithChildren {
  title?: string;
}

const Demo = ({ title, children }: DemoProps) => {
  return (
    <div className={"font-bold border-[1px] border-black p-2 rounded-[4px]"}>
      {title && (
        <div className={css("mb-2")}>
          <Text size={TextSize.Lg} bold>
            {title}
          </Text>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default Demo;
