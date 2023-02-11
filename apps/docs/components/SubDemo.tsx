import { PropsWithChildren } from "react";
import { Text, TextIntent, TextSize } from "ui";
import { useDisplayContext } from "../state/DisplayContext";
interface SubDemoProps extends PropsWithChildren {
  labels?: { [key: string]: string };
}

const SubDemo = ({ children, labels }: SubDemoProps) => {
  const { showProps } = useDisplayContext();
  return (
    <div>
      <div className="flex flex-col gap-0.5">
        <div>{children}</div>

        <div className="flex items-center gap-2">
          {labels &&
            showProps &&
            Object.keys(labels)?.map((key) => (
              <div className="flex items-center gap-0.5">
                <Text size={TextSize.Xs} intent={TextIntent.Gray}>
                  {key}:{" "}
                </Text>
                <Text size={TextSize.Xs} bold>
                  {labels[key]}
                </Text>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SubDemo;
