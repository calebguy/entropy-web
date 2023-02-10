import { PropsWithChildren } from "react";
import { Text, TextSize } from "ui";
interface SubDemoProps extends PropsWithChildren {
  title?: string;
}

const SubDemo = ({ children, title }: SubDemoProps) => {
  return (
    <div>
      <Text size={TextSize.Xs}>{title}</Text>
      <div>{children}</div>
    </div>
  );
};

export default SubDemo;
