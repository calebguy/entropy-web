import { Button, ButtonIntent, ButtonSize } from "dsl";
import { useState } from "react";
import Demo from "./Demo";
import SubDemo from "./SubDemo";

const button = Object.values(ButtonIntent).map((intent) => ({
  intent,
  children: intent,
}));

const ButtonDemo = () => {
  const [loading, setLoading] = useState(false);
  return (
    <Demo
      title={"Button"}
      nextToTitle={
        <Button
          round
          intent={ButtonIntent.Secondary}
          onClick={() => setLoading(!loading)}
        >
          {loading ? "- load" : "+ load"}
        </Button>
      }
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8">
        {button.map((item, index) => (
          <div
            key={`button-demo-${item.intent}-${index}`}
            className="flex flex-col gap-2"
          >
            <SubDemo labels={{ size: ButtonSize.Sm, loading }}>
              <Button loading={loading} intent={item.intent}>
                {item.children}
              </Button>
            </SubDemo>
            <SubDemo labels={{ size: ButtonSize.Sm, round: true, loading }}>
              <Button
                loading={loading}
                size={ButtonSize.Sm}
                intent={item.intent}
                round
              >
                {item.children}
              </Button>
            </SubDemo>
            <SubDemo labels={{ size: ButtonSize.Lg, loading }}>
              <Button
                loading={loading}
                intent={item.intent}
                size={ButtonSize.Lg}
              >
                {item.children}
              </Button>
            </SubDemo>
            <SubDemo labels={{ size: ButtonSize.Lg, round: true, loading }}>
              <Button
                loading={loading}
                intent={item.intent}
                size={ButtonSize.Lg}
                round
              >
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
