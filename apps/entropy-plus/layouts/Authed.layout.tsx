import { css } from "utils";
import Header from "../components/Header/Header";
import AppLayout from "./App.layout";

interface AuthedLayoutProps extends React.PropsWithChildren {}

const AuthedLayout = ({ children }: AuthedLayoutProps) => {
  return (
    <>
      <div className={css("p-4", "flex", "justify-center")}>
        <div className={css("max-w-6xl", "w-full")}>
          <Header />
        </div>
      </div>
      <AppLayout>{children}</AppLayout>
    </>
  );
};

export default AuthedLayout;
