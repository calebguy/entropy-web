import { Text, TextIntent } from "ui";
import Demo from "./Demo";

const textDemos = Object.values(TextIntent).map((intent) => ({
  intent,
  children: intent,
}));

const TextDemo = () => {
  return (
    <Demo title={"Text"}>
      <Text>I love this bar!</Text>
    </Demo>
  );
};

export default TextDemo;
