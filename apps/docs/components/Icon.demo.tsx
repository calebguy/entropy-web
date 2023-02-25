import { Icon, IconName } from "dsl";
import { css } from "utils";
import Demo from "./Demo";
import SubDemo from "./SubDemo";

const IconDemo = () => {
  const iconsToAddBrandBackground = [IconName.Heart, IconName.Close];
  return (
    <Demo title={"Icon"}>
      <div className={css("flex", "items-end", "gap-6", "flex-wrap")}>
        {Object.values(IconName).map((icon) => (
          <SubDemo key={`icon-demo-${icon}`} labels={{ icon }}>
            <div
              className={css("flex", "justify-center", "p-1", {
                "bg-brand rounded-sm": iconsToAddBrandBackground.includes(icon),
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
