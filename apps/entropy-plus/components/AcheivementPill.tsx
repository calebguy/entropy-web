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
    case "isJuiced":
      return <Pill intent={PillIntent.Pink}>Juic3d</Pill>;
    case "isArchivist":
      return <Pill intent={PillIntent.Orange}>Archivist</Pill>;
    default:
      return null;
  }
};

export default AcheivementPill;
