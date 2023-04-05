import { Button, ButtonIntent, Text, TextIntent, TextSize } from "dsl";
import Link from "next/link";
import { css } from "utils";
import AppLayout from "../layouts/App.layout";
import { Profile } from "../interfaces";


interface FourOhFourProps {
  profile: Profile;
}

const FourOhFour = ({ profile }: FourOhFourProps) => {
  return (
    <AppLayout profile={profile}>
      <div className={css("flex", "justify-center", "h-full", "items-center")}>
        <div className={css("flex", "flex-col", "items-center", "gap-1")}>
          <Text size={TextSize.Xxl} intent={TextIntent.Outline}>
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
