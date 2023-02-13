import { Button, ButtonIntent, Text, TextSize } from "dsl";

export default function Web() {
  return (
    <div className="p-3">
      <div className="flex justify-center">
        <Text size={TextSize.Lg} bold>
          WEB
        </Text>
      </div>
      <Button>yeet</Button>
      <Button intent={ButtonIntent.Secondary}>suck it</Button>
    </div>
  );
}
