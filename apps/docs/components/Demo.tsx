import { Text, TextSize } from "dsl";
import { PropsWithChildren } from "react";
import { css } from "utils";

interface DemoProps extends PropsWithChildren {
  title?: string;
  nextToTitle?: React.ReactNode;
}

const Demo = ({ title, children, nextToTitle }: DemoProps) => {
  return (
    <div className={"font-bold border-[1px] border-black p-2 rounded-[4px]"}>
      {title && (
        <div className={css("mb-2", "flex", "items-center", "gap-2")}>
          <Text size={TextSize.Lg} bold>
            {title}
          </Text>
          {nextToTitle && nextToTitle}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default Demo;
