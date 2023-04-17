import {
  Button,
  ButtonIntent,
  ButtonSize,
  Pane,
  PaneSize,
  Text,
  TextSize,
} from "dsl";
import Link from "next/link";
import { css } from "utils";
import { Profile } from "../../interfaces";
import ProfileIcon from "../ProfileIcon";

interface UserPreviewProps {
  profile: Profile;
}

const UserPreview = ({ profile }: UserPreviewProps) => {
  return (
    <Pane size={PaneSize.Sm} block>
      <div className={css("flex", "justify-between", "items-center")}>
        <div className={css("flex", "items-center", "gap-2")}>
          <ProfileIcon profile={profile} />
          <Text size={TextSize.Lg}>@{profile.name}</Text>
        </div>
        <Link href={`/curator/${profile.slug}`}>
          <Button size={ButtonSize.Sm} intent={ButtonIntent.Secondary} round>
            view profile
          </Button>
        </Link>
      </div>
    </Pane>
  );
};

export default UserPreview;
