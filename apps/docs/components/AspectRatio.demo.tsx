import { AspectRatio } from "ui";
import { css } from "utils";
import Demo from "./Demo";
import SubDemo from "./SubDemo";

const AspectRatioDemo = () => {
  return (
    <Demo title={"AspectRatio"}>
      <div className={css("grid", "grid-cols-2")}>
        <SubDemo labels={{ ratio: "1:1" }}>
          <AspectRatio
            ratio={1}
            className={css(
              "bg-cover",
              "max-w-[300px]",
              "border-[1px]",
              "border-black"
            )}
            style={{
              backgroundImage: `url(https://d2w9rnfcy7mm78.cloudfront.net/19166408/original_38d17169efe9992829d9af7059d8d45a.png?1669558317?bc=0)`,
            }}
          />
        </SubDemo>
        <SubDemo labels={{ ratio: "3:4" }}>
          <AspectRatio
            ratio={"3/4"}
            className={css(
              "bg-cover",
              "max-w-[300px]",
              "border-[1px]",
              "border-black"
            )}
            style={{
              backgroundImage: `url(https://d2w9rnfcy7mm78.cloudfront.net/3135337/original_eda428c3d6672013f86876b31d6b2f18.jpg?1543775055?bc=1)`,
            }}
          />
        </SubDemo>
      </div>
    </Demo>
  );
};

export default AspectRatioDemo;
