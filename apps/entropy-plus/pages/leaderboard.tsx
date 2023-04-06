import { Pane, PaneSize, Text, TextSize } from "dsl";
import { GetServerSideProps } from "next";
import { css } from "utils";
import Leaderboard from "../components/Leaderboard";
import { GetLeaderboardResponse } from "../interfaces";
import AppLayout from "../layouts/App.layout";
import { observer } from "mobx-react-lite";
import { Profile } from "../interfaces";
import { useState, useEffect } from 'react'
import AppStore from "../store/App.store";
import { HttpForServer, getDashboardData, getFullDashboardLeaderboard, getRank } from "../services/Http";



interface LeaderboardPageProps extends GetLeaderboardResponse {
  profile: Profile;

}

const LeaderboardPage = observer(({ curators }: LeaderboardPageProps) => {
  const [dashboardData, setDashboardData] = useState({})
  const [profile, setProfile] = useState(AppStore.auth.profile);
  const [rank, setRank] = useState(null);
  const imgURL = "https://res.cloudinary.com/dpooqlfdf/" + AppStore.auth.profile?.profile_image;
  useEffect(() => {
    // Fetch data on the client side using an API call
    const fetchData = async () => {
      if (AppStore.auth.profile) {
        const data = await getDashboardData(AppStore.auth.profile.handle);
        const rankData = await getRank(AppStore.auth.profile.handle);
        setDashboardData(data);
        setRank(rankData?.data?.rank);
        setProfile(AppStore.auth.profile);
      }
    }
    fetchData()
  }, [])
  return (
    <AppLayout profile={AppStore.auth.profile!}>
      <div className={css("mb-2")}>
        <Text size={TextSize.Lg}>Daily Leaderboard</Text>
      </div>
      <Pane size={PaneSize.Lg} block>
        <Leaderboard curators={curators} />
      </Pane>
    </AppLayout>
  );
});


export async function getServerSideProps() {
  const curators = await getFullDashboardLeaderboard();
  return {
    props: {
      curators,
    },
  };
}


export default LeaderboardPage;
