import { Button, ButtonIntent, ButtonSize, Text } from "dsl";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { css, jsonify } from "utils";
import sleep from "utils/sleep";
import AppLayout from "../layouts/App.layout";
import { HttpForClient } from "../services/Http";
import AppStore from "../store/App.store";

interface MeProps {
  // me: Profile;
}

const MePage = observer(() => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!AppStore.auth.profile) {
      HttpForClient.getMe().then(({ data }) => {
        AppStore.auth.profile = data;
      });
    }
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
              .then(({ data }) => {
                console.log("refreshed me data", data);
                AppStore.auth.profile = data;
              })
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

// export const getServerSideProps = withAuth<MeProps>(async () => {
//   const { data: me } = await HttpForServer.getMe();
//   return {
//     props: { me },
//   };
// });

export default MePage;
