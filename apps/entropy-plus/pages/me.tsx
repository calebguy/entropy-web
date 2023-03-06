import { Text } from "dsl";
import { GetServerSideProps } from "next";
import { css, jsonify } from "utils";
import getAccessToken from "../helpers/auth";
import redirectToLogin from "../helpers/redirectToLogin";
import AppLayout from "../layouts/App.layout";
import { HttpForServer } from "../services/Http";

interface MeProps {
  me: any;
}

const MePage = ({ me }: MeProps) => {
  console.log("debug:: me", me);
  return (
    <AppLayout>
      <div className={css("flex", "flex-col", "h-full", "gap-4")}>
        <Text>{jsonify(me)}</Text>
      </div>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps<MeProps> = async ({
  req,
  res,
}) => {
  try {
    const accessToken = getAccessToken({ req, res });

    // @next -- do this better
    HttpForServer.accessToken = accessToken;
    const { data: me } = await HttpForServer.getMe();
    console.log("ME", me);
    return { props: { me } };
  } catch (error) {
    return redirectToLogin();
  }
};

export default MePage;
