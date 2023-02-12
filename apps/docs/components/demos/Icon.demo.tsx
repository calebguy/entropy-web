import { Icon, IconName } from "ui";
import { css } from "utils";
import Demo from "../Demo";
import SubDemo from "../SubDemo";

const IconDemo = () => {
  return (
    <Demo title={"Icon"}>
      <div className={css("flex", "items-end", "gap-6")}>
        {Object.values(IconName).map((icon) => (
          <SubDemo key={`icon-demo-${icon}`} labels={{ icon }}>
            <div
              className={css("flex", "justify-center", {
                "bg-brand p-1 rounded-sm":
                  icon === IconName.Check || icon == IconName.Close,
              })}
            >
              <Icon name={icon} />
            </div>
          </SubDemo>
        ))}
      </div>
    </Demo>
  );
};

export default IconDemo;
