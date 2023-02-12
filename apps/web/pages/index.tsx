import { Button, Text, TextSize } from "ui";

export default function Web() {
  return (
    <div className="p-3">
      <div className="flex justify-center">
        <Text size={TextSize.Lg} bold>
          WEB
        </Text>
      </div>
      <Button>yeet</Button>
    </div>
  );
}
