import { observer } from "mobx-react-lite";
import { css } from "utils";
import Header from "../components/Header";
import { Profile } from "../interfaces";

interface AuthedLayoutProps extends React.PropsWithChildren {
  profile: Profile;
}

const AppLayout = observer(({ children, profile }: AuthedLayoutProps) => {
  return (
    <>
      <div className={css("p-4", "flex", "justify-center")}>
        <div className={css("max-w-6xl", "w-full")}>
          <Header profile={profile} />
        </div>
      </div>
      <div className={css("flex", "justify-center", "p-4", "grow")}>
        <div className={css("max-w-4xl", "w-full")}>{children}</div>
      </div>
    </>
  );
});

export default AppLayout;
