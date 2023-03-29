import { Button, ButtonIntent, ButtonSize, Text } from "dsl";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { css, jsonify } from "utils";
import sleep from "utils/sleep";
import withAuth from "../helpers/auth";
import { Profile } from "../interfaces";
import AppLayout from "../layouts/App.layout";
import { HttpForClient, HttpForServer } from "../services/Http";
import AppStore from "../store/App.store";

interface MeProps {
  me: Profile;
}

const MePage = observer(({ me }: MeProps) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    AppStore.auth.profile = me;
  }, []);
  return (
    <AppLayout>
      <Text>{jsonify(AppStore.auth.profile)}</Text>
      <div className={css("flex", "flex-col", "h-full", "gap-4", "mt-4")}>
        <Button
          round
          size={ButtonSize.Lg}
          intent={ButtonIntent.Secondary}
          onClick={async () => {
            setIsLoading(true);
            await sleep(0.5);
            HttpForClient.getMe()
              .then(({ data }) => console.log("refreshed me data", data))
              .finally(() => setIsLoading(false));
          }}
          loading={isLoading}
        >
          GET ME
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
