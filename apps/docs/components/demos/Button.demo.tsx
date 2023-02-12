import { Button, ButtonIntent, ButtonSize } from "ui";
import Demo from "../Demo";
import SubDemo from "../SubDemo";

const button = Object.values(ButtonIntent).map((intent) => ({
  intent,
  children: intent,
}));

const ButtonDemo = () => {
  return (
    <Demo title={"Button"}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8">
        {button.map((item, index) => (
          <div
            key={`button-demo-${item.intent}-${index}`}
            className="flex flex-col gap-2"
          >
            <SubDemo labels={{ size: ButtonSize.Sm }}>
              <Button intent={item.intent}>{item.children}</Button>
            </SubDemo>
            <SubDemo labels={{ size: ButtonSize.Sm, round: "true" }}>
              <Button size={ButtonSize.Sm} intent={item.intent} round>
                {item.children}
              </Button>
            </SubDemo>
            <SubDemo labels={{ size: ButtonSize.Lg }}>
              <Button intent={item.intent} size={ButtonSize.Lg}>
                {item.children}
              </Button>
            </SubDemo>
            <SubDemo labels={{ size: ButtonSize.Lg, round: "true" }}>
              <Button intent={item.intent} size={ButtonSize.Lg} round>
                {item.children}
              </Button>
            </SubDemo>
            <SubDemo
              labels={{ size: ButtonSize.Lg, round: "true", loading: "true" }}
            >
              <Button intent={item.intent} size={ButtonSize.Lg} round loading>
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
