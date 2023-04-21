import { Pane, PaneSize, Text, TextSize } from "dsl";
import { observer } from "mobx-react-lite";
import { css } from "utils";
import Leaderboard from "../components/Leaderboard";
import { Profile } from "../interfaces";
import AppLayout from "../layouts/App.layout";
import { HttpForServer } from "../services/Http";

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

export async function getServerSideProps() {
  const { data: leaderBoard } = await HttpForServer.getLeaderboard();
  return {
    props: {
      leaderBoard,
    },
  };
}

export default LeaderboardPage;
