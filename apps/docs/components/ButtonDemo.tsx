import { Button, ButtonIntent, ButtonSize } from "ui";
import Demo from "./Demo";
import SubDemo from "./SubDemo";

const buttonItems: Array<{ intent: ButtonIntent; children: string }> = [
  { intent: ButtonIntent.Primary, children: "prim" },
  { intent: ButtonIntent.Secondary, children: "sec" },
  { intent: ButtonIntent.Green, children: "green" },
  { intent: ButtonIntent.Pink, children: "pink" },
  { intent: ButtonIntent.Orange, children: "orange" },
  { intent: ButtonIntent.NeonOrange, children: "neon-orange" },
  { intent: ButtonIntent.NeonGreen, children: "neon-green" },
];

const ButtonDemo = () => {
  return (
    <Demo title={"Button"}>
      <div className="grid grid-cols-3">
        {buttonItems.map((item, index) => (
          <div key={`button-demo-${item.intent}-${index}`}>
            <SubDemo title={`${item.intent}`}>
              <Button intent={item.intent}>{item.children}</Button>
            </SubDemo>
            <SubDemo title={`${item.intent}-round`}>
              <Button intent={item.intent} round>
                {item.children}
              </Button>
            </SubDemo>
            <SubDemo title={`${item.intent}-${ButtonSize.Lg}`}>
              <Button intent={item.intent} size={ButtonSize.Lg}>
                {item.children}
              </Button>
            </SubDemo>
            <SubDemo title={`${item.intent}-${ButtonSize.Lg}-round`}>
              <Button intent={item.intent} size={ButtonSize.Lg} round>
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
