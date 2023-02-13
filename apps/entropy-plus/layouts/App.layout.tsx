import { css } from "utils";

interface AppLayoutProps extends React.PropsWithChildren {}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className={css("flex", "justify-center", "p-4")}>
      <div className={css("max-w-2xl", "w-full")}>{children}</div>
    </div>
  );
};

export default AppLayout;
