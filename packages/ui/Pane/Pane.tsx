import { cva } from "class-variance-authority";

export enum PaneSize {
  Sm = "sm",
  Lg = "lg",
}

export enum PaneIntent {
  Primary = "primary",
  Secondary = "secondary",
}

const paneStyles = cva("border-[1px] border-solid border-black", {
  variants: {
    intent: {
      [PaneIntent.Primary]: "bg-white",
      [PaneIntent.Secondary]: "bg-gray",
    },
  },
});

const Pane = () => {
  return <div></div>;
};

export default Pane;
