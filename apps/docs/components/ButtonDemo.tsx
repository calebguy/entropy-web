import { Button, ButtonIntent, ButtonSize } from "ui";
import Demo from "./Demo";
import SubDemo from "./SubDemo";

const buttonItems: Array<{ intent: ButtonIntent; children: string }> = [
  { intent: ButtonIntent.Primary, children: "prim" },
  { intent: ButtonIntent.Secondary, children: "sec" },
  { intent: ButtonIntent.Green, children: "green" },
  { intent: ButtonIntent.Pink, children: "pink" },
  { intent: ButtonIntent.Orange, children: "orange" },
];

const ButtonDemo = () => {
  return (
    <Demo title={"Button"}>
      <div className="grid grid-cols-6">
        {buttonItems.map((item) => (
          <div>
            <SubDemo title={item.intent}>
              <Button intent={item.intent}>{item.children}</Button>
            </SubDemo>
            <SubDemo title={item.intent}>
              <Button intent={item.intent} round>
                {item.children}
              </Button>
            </SubDemo>
            <SubDemo title={item.intent}>
              <Button intent={item.intent} size={ButtonSize.Lg}>
                {item.children}
              </Button>
            </SubDemo>
          </div>
        ))}
      </div>
    </Demo>
  );
};

export default ButtonDemo;
