import { Button, Text } from "dsl";
import { useCallback } from "react";
import { css, jsonify } from "utils";
import withAuth from "../helpers/auth";
import AppLayout from "../layouts/App.layout";
import { HttpForClient, HttpForServer } from "../services/Http";

interface MeProps {
  me: any;
}

const MePage = ({ me }: MeProps) => {
  const getMe = useCallback(() => {
    return HttpForClient.getMe().catch((e) => {
      return HttpForClient.refreshToken().then((data) => {
        console.log("refreshed token");
        HttpForClient.getMe();
      });
    });
  }, []);
  return (
    <AppLayout>
      <div className={css("flex", "flex-col", "h-full", "gap-4")}>
        <Text>{jsonify(me)}</Text>
        <Button onClick={() => getMe()}>GET ME</Button>
      </div>
    </AppLayout>
  );
};

export const getServerSideProps = withAuth<MeProps>(async () => {
  const { data: me } = await HttpForServer.getMe();
  return {
    props: { me },
  };
});

export default MePage;
