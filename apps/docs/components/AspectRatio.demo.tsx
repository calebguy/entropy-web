import { AspectRatio } from "ui";
import { css } from "utils";
import Demo from "./Demo";
import SubDemo from "./SubDemo";

const AspectRatioDemo = () => {
  return (
    <Demo title={"AspectRatio"}>
      <div className={css("grid", "grid-cols-4", "gap-4")}>
        <div className={css("flex", "flex-col", "gap-2")}>
          <AspectSubDemo
            ratio={"1/1"}
            imageUrl={
              "https://d2w9rnfcy7mm78.cloudfront.net/19166408/original_38d17169efe9992829d9af7059d8d45a.png?1669558317?bc=0"
            }
          />
          <AspectSubDemo
            ratio={"3/4"}
            imageUrl={
              "https://d2w9rnfcy7mm78.cloudfront.net/3135337/original_eda428c3d6672013f86876b31d6b2f18.jpg?1543775055?bc=1"
            }
          />
        </div>
        <AspectSubDemo
          ratio={"2/5"}
          imageUrl={
            "https://res.cloudinary.com/dpooqlfdf/image/upload/v1676153842/tdxbcr3ryoqz8mdcdcs5.jpg"
          }
        />
        <div className={css("col-span-2", "flex", "flex-col", "gap-2")}>
          <AspectSubDemo
            ratio={"2/1"}
            imageUrl={
              "https://d2w9rnfcy7mm78.cloudfront.net/2674148/original_945ef619894c3c853854a6fb026a59be.gif?1536508147?bc=1"
            }
          />
          <AspectSubDemo
            ratio={"3/1"}
            imageUrl={
              "https://d2w9rnfcy7mm78.cloudfront.net/653549/original_b5717bd109dba36bb021b36dc87e7d07.gif?1467998101?bc=1"
            }
          />
          <AspectSubDemo
            ratio={"4/1"}
            imageUrl={
              "https://d2w9rnfcy7mm78.cloudfront.net/2906828/original_685a799a1947f1ceade393124b45d4a6.png?1540136378?bc=1"
            }
          />
        </div>
      </div>
    </Demo>
  );
};

const AspectSubDemo = ({
  ratio,
  imageUrl,
}: {
  imageUrl: string;
  ratio: string;
}) => {
  return (
    <SubDemo labels={{ ratio }}>
      <AspectRatio
        ratio={ratio}
        className={css("bg-cover", "border-[1px]", "border-black")}
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
    </SubDemo>
  );
};

export default AspectRatioDemo;
