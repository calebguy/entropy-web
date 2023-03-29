import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";
import { css } from "utils";

export enum DropdownIntent {
  Primary = "primary",
}

export enum DropdownSize {}

const dropdownStyles = cva("", {
  variants: {
    intent: {
      [DropdownIntent.Primary]: css(
        "w-full",
        "px-2",
        "py-1",
        "border-[1px]",
        "rounded-md",
        "text-sm",
        "bg-white",
        "border-black",
        "mt-1"
      ),
    },
    size: {},
  },
  defaultVariants: {
    intent: DropdownIntent.Primary,
  },
});

interface DropdownProps
  extends PropsWithChildren,
    VariantProps<typeof dropdownStyles>,
    Pick<DropdownMenuContentProps, "align"> {
  trigger: JSX.Element;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
}

export const Dropdown = ({
  intent,
  size,
  children,
  onOpenChange,
  open,
  trigger,
  align = "end",
}: DropdownProps) => {
  const styles = dropdownStyles({ intent, size });
  return (
    <RadixDropdown.Root open={open} onOpenChange={onOpenChange}>
      <RadixDropdown.Trigger asChild className={css("cursor-pointer")}>
        <div className={css("inline-block")}>{trigger}</div>
      </RadixDropdown.Trigger>
      <RadixDropdown.Content
        style={{ minWidth: "100px" }}
        collisionPadding={4}
        align={align}
        className={css(styles, { "text-right": align === "end" })}
      >
        {children}
      </RadixDropdown.Content>
    </RadixDropdown.Root>
  );
};

interface ItemProps {
  className?: string;
}

export const DropdownItem: React.FC<PropsWithChildren<ItemProps>> = ({
  children,
  className,
}) => {
  return (
    <RadixDropdown.Item
      className={css(className, "outline-0", "text-sm")}
      style={{ boxShadow: "none" }}
    >
      {children}
    </RadixDropdown.Item>
  );
};

export default Dropdown;
