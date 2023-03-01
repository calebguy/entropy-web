import { Pane, PaneSize, Text, TextSize } from "dsl";
import { GetServerSideProps } from "next";
import { css } from "utils";
import Leaderboard from "../components/Leaderboard";
import { GetLeaderboardResponse } from "../interfaces";
import AppLayout from "../layouts/App.layout";
import Http from "../services/Http";

interface LeaderboardPageProps extends GetLeaderboardResponse {}

const LeaderboardPage = ({ curators }: LeaderboardPageProps) => {
  return (
    <AppLayout>
      <div className={css("mb-2")}>
        <Text size={TextSize.Lg}>Daily Leaderboard</Text>
      </div>
      <Pane size={PaneSize.Lg} block>
        <Leaderboard curators={curators} />
      </Pane>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps<
  LeaderboardPageProps
> = async () => {
  const { data } = await Http.getLeaderboard();
  return {
    props: {
      ...data,
    },
  };
};

export default LeaderboardPage;
