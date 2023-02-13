import { Button, ButtonIntent, Text, TextIntent, TextSize } from "dsl";
import Link from "next/link";
import { css } from "utils";
import AppLayout from "../layouts/App.layout";

const FourOhFour = () => {
  return (
    <AppLayout>
      <div className={css("flex", "justify-center", "h-full", "items-center")}>
        <div className={css("flex", "flex-col", "items-center", "gap-1")}>
          <Text size={TextSize.Xl} intent={TextIntent.Outline}>
            ...error...
          </Text>
          <Link href={"/"}>
            <Button intent={ButtonIntent.Secondary} round>
              go home
            </Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default FourOhFour;
