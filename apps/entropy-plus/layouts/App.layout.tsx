import { Divider } from "dsl";
import { css } from "utils";
import Header from "../components/Header";

interface AuthedLayoutProps extends React.PropsWithChildren {}

const AppLayout = ({ children }: AuthedLayoutProps) => {
  return (
    <>
      <div className={css("p-4", "flex", "justify-center")}>
        <div className={css("max-w-6xl", "w-full")}>
          <Header />
        </div>
      </div>
      <div>
        <Divider />
      </div>
      <div className={css("flex", "justify-center", "p-4", "grow")}>
        <div className={css("max-w-2xl", "w-full")}>{children}</div>
      </div>
    </>
  );
};

export default AppLayout;
