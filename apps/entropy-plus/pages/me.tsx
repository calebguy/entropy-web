import { Button, Text } from "dsl";
import { css, jsonify } from "utils";
import withAuth from "../helpers/auth";
import { Me } from "../interfaces";
import AppLayout from "../layouts/App.layout";
import { HttpForClient, HttpForServer } from "../services/Http";

interface MeProps {
  me: Me;
}

const MePage = ({ me }: MeProps) => {
  return (
    <AppLayout>
      <div className={css("flex", "flex-col", "h-full", "gap-4")}>
        <Text>{jsonify(me)}</Text>
        <Button
          onClick={() =>
            HttpForClient.getMe().then(({ data }) =>
              console.log("refreshed me data", data)
            )
          }
        >
          GET ME
        </Button>
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
