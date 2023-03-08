import { Button, Text } from "dsl";
import { useCallback } from "react";
import { css, jsonify } from "utils";
import withAuth from "../helpers/auth";
import AppLayout from "../layouts/App.layout";
import { Http, HttpProxy } from "../services/Http";

interface MeProps {
  me: any;
}

const MePage = ({ me }: MeProps) => {
  const getMe = useCallback(() => {
    return HttpProxy.getMe().catch((e) => {
      return HttpProxy.refreshToken().then((data) => {
        console.log("refreshed token");
        HttpProxy.getMe();
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
  const { data: me } = await Http.getMe();
  return {
    props: { me },
  };
});

export default MePage;
