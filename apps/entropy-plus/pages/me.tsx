import {
  Button,
  ButtonIntent,
  ButtonSize,
  Text,
  TextIntent,
  TextSize,
} from "dsl";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { css, objectKeys } from "utils";
import sleep from "utils/sleep";
import withAuth from "../helpers/auth";
import { Profile } from "../interfaces";
import AppLayout from "../layouts/App.layout";
import { HttpForServer } from "../services/Http";
import AppStore from "../store/App.store";
interface MeProps {
  me: Profile;
}

const MePage = observer(({ me }: MeProps) => {
  const [isLoading, setIsLoading] = useState(false);
  // update global store
  useEffect(() => {
    AppStore.auth.profile = me;
  }, []);
  return (
    <AppLayout>
      <div className={css("flex", "flex-col", "h-full")}>
        <div className={css("grow", "flex", "flex-col")}>
          {!isLoading &&
            objectKeys(AppStore.auth.profile).map((key) => (
              <div className={css("flex", "gap-1", "items-baseline")}>
                <Text intent={TextIntent.Gray}>{key}:</Text>
                <Text size={TextSize.Lg}>{AppStore.auth.profile![key]}</Text>
              </div>
            ))}
        </div>
        <Button
          round
          block
          size={ButtonSize.Lg}
          intent={ButtonIntent.Secondary}
          onClick={async () => {
            setIsLoading(true);
            await sleep(0.5);
            AppStore.auth.getProfile().finally(() => setIsLoading(false));
          }}
          loading={isLoading}
        >
          🔄
        </Button>
      </div>
    </AppLayout>
  );
});

export const getServerSideProps = withAuth<MeProps>(async () => {
  const { data: me } = await HttpForServer.getMe();
  return {
    props: { me },
  };
});

export default MePage;
