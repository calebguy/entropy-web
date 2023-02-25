import { Pill, PillIntent } from "dsl";
import { Acheivement } from "../interfaces";

interface AcheivementPillProps {
  acheivement: keyof Acheivement;
}

const AcheivementPill = ({ acheivement }: AcheivementPillProps) => {
  switch (acheivement) {
    case "isCoreCurator":
      return <Pill>Core Curator</Pill>;
    case "isTopFivePercent":
      return <Pill intent={PillIntent.Green}>Top 5%</Pill>;
    default:
      return null;
  }
};

export default AcheivementPill;
