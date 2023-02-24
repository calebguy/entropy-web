import { AspectRatio, Button, ButtonSize, Icon, IconName } from "dsl";
import { css } from "utils";
import AppLayout from "../layouts/App.layout";
const SortPage = () => {
  return (
    <AppLayout>
      <div className={css("flex", "flex-col", "h-full")}>
        <div className={css("grow")}>
          <AspectRatio
            ratio={"2/3"}
            className={css("max-w-[200px]", "mx-auto")}
          >
            <div className={css("bg-brand")} />
          </AspectRatio>
        </div>
        <div className={css("flex", "justify-around", "gap-4", "md:gap-24")}>
          <Button size={ButtonSize.Lg} block>
            <Icon name={IconName.Check} />
          </Button>
          <Button size={ButtonSize.Lg} block>
            <Icon name={IconName.Close} />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default SortPage;
