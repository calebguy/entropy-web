import { Button, ButtonIntent, Text, TextSize } from "dsl";
import Link from "next/link";
import { css } from "utils";
import { Profile } from "../interfaces";
import AppLayout from "../layouts/App.layout";

interface FourOhFourProps {
  profile: Profile;
}

const FourOhFour = ({ profile }: FourOhFourProps) => {
  return (
    <AppLayout profile={profile}>
      <div className={css("flex", "justify-center", "h-full", "items-center")}>
        <div className={css("flex", "flex-col", "items-center", "gap-3")}>
          <Text size={TextSize.Xxl}>errrrrr</Text>
          <Link href={"/sort"}>
            <Button intent={ButtonIntent.Secondary} round>
              go to sort
            </Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default FourOhFour;
