import { Spinner, SpinnerSize } from "dsl";
import { css } from "utils";
import Demo from "../Demo";
import SubDemo from "../SubDemo";

const SpinnerDemo = () => {
  return (
    <Demo title="Spinner">
      <div className={css("flex", "items-end", "gap-4")}>
        {Object.values(SpinnerSize).map((size) => (
          <SubDemo key={`spinner-${size}`} labels={{ size }}>
            <Spinner size={size} />
          </SubDemo>
        ))}
      </div>
    </Demo>
  );
};

export default SpinnerDemo;
