import { PropsWithChildren } from "react";
import { Text, TextSize } from "ui";

interface DemoProps extends PropsWithChildren {
  title?: string;
}

const Demo = ({ title, children }: DemoProps) => {
  return (
    <div className={"font-bold border-[1px] border-black p-2 rounded-[4px]"}>
      {title && (
        <div>
          <Text size={TextSize.Md} bold>
            {title}
          </Text>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default Demo;
