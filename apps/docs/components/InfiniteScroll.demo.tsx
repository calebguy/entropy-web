import { Button, InfiniteScroll } from "dsl";
import { useState } from "react";
import { css } from "utils";
import Demo from "./Demo";
import SubDemo from "./SubDemo";

const InfiniteScrollDemo = () => {
  const [dataLength, setDataLength] = useState(10);
  const [fullScrollHeight, setFullScrollHeight] = useState(200);
  const [height, setHeight] = useState(500);
  const [fullPageHasMoreData, setFullPageHasMoreData] = useState(false);
  return (
    <Demo title={"InfinteScroll"}>
      <div className={css("flex", "flex-col", "gap-4")}>
        <SubDemo labels={{ test: "Scroll By Container" }}>
          <InfiniteScroll
            dataLength={dataLength}
            height={250}
            next={() => {
              setTimeout(() => {
                setDataLength(dataLength + 1);
                setHeight(height + 500);
              }, 500);
            }}
            hasMore={true}
          >
            <div
              className={css("border-[1px]", "border-dashed", "border-brand")}
              style={{
                height,
                backgroundSize: "15px 15px",
                backgroundImage:
                  "linear-gradient(to right, #afafaf 1px, transparent 1px), linear-gradient(to bottom, #afafaf 1px, transparent 1px)",
              }}
            />
          </InfiniteScroll>
        </SubDemo>
        <SubDemo labels={{ test: "Scroll By Document" }}>
          <div className={css("flex", "justify-center", "mb-4")}>
            <Button
              onClick={() => {
                setFullPageHasMoreData(!fullPageHasMoreData);
                setTimeout(() => {
                  setDataLength(0);
                  setFullScrollHeight(200);
                }, 500);
              }}
            >
              {fullPageHasMoreData
                ? "stop infinite scroll"
                : "enable infinite scroll"}
            </Button>
          </div>
          <InfiniteScroll
            dataLength={dataLength}
            next={() => {
              setTimeout(() => {
                setDataLength(dataLength + 1);
                setFullScrollHeight(fullScrollHeight + 100);
              }, 500);
            }}
            hasMore={fullPageHasMoreData}
            endDataMessage={"🤗 that's all 🤗"}
          >
            <div
              className={css("border-[1px]", "border-dashed", "border-brand")}
              style={{
                height: fullScrollHeight,
                backgroundSize: "15px 15px",
                backgroundImage:
                  "linear-gradient(to right, #afafaf 1px, transparent 1px), linear-gradient(to bottom, #afafaf 1px, transparent 1px)",
              }}
            />
          </InfiniteScroll>
        </SubDemo>
      </div>
    </Demo>
  );
};

export default InfiniteScrollDemo;
