import { Pane, PaneSize, Text, TextSize } from "dsl";
import { observer } from "mobx-react-lite";
import { css } from "utils";
import Leaderboard from "../components/Leaderboard";
import withAuth from "../helpers/auth";
import { Profile } from "../interfaces";
import AppLayout from "../layouts/App.layout";

interface LeaderboardPageProps {
  leaderBoard: Profile[];
}

const LeaderboardPage = observer(({ leaderBoard }: LeaderboardPageProps) => {
  return (
    <AppLayout>
      <div className={css("mb-2", "text-center")}>
        <Text size={TextSize.Lg}>Leaderboard</Text>
      </div>
      <Pane size={PaneSize.Lg} block>
        <Leaderboard leaderBoard={leaderBoard.slice(0, 10)} />
      </Pane>
    </AppLayout>
  );
});

export const getServerSideProps = withAuth<LeaderboardPageProps>(
  async (_, Http) => {
    const { data: leaderBoard } = await Http.getLeaderboard();
    return {
      props: {
        leaderBoard,
      },
    };
  }
);

export default LeaderboardPage;
