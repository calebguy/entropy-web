import { Pane, PaneSize, Text, TextSize } from "dsl";
import { GetServerSideProps } from "next";
import { css } from "utils";
import Leaderboard from "../components/Leaderboard";
import { GetLeaderboardResponse } from "../interfaces";
import AppLayout from "../layouts/App.layout";
import { observer } from "mobx-react-lite";
import { HttpForServer } from "../services/Http";
import { Profile } from "../interfaces";


interface LeaderboardPageProps extends GetLeaderboardResponse {
  profile: Profile;
}

const LeaderboardPage = observer(({ curators, profile }: LeaderboardPageProps) => {
  return (
    <AppLayout profile={profile}>
      <div className={css("mb-2")}>
        <Text size={TextSize.Lg}>Daily Leaderboard</Text>
      </div>
      <Pane size={PaneSize.Lg} block>
        <Leaderboard curators={curators} />
      </Pane>
    </AppLayout>
  );
});
export const getServerSideProps: GetServerSideProps<
  LeaderboardPageProps
> = async () => {
  const { data } = await HttpForServer.getLeaderboard();
  return {
    props: {
      ...data,
    },
  };
};

export default LeaderboardPage;
