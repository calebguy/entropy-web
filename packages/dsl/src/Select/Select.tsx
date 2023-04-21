import * as RadixSelect from "@radix-ui/react-select";
import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";
import { css } from "utils";
import { Icon, IconName } from "../Icon/Icon";
import { Text } from "../Text/Text";

export enum SelectIntent {}

export enum SelectSize {}

export type SelectItem = { name: string; id: string };

const selectStyles = cva("", {
  variants: {
    intent: {},
    size: {},
  },
  defaultVariants: {},
});

interface SelectProps
  extends PropsWithChildren,
    VariantProps<typeof selectStyles> {
  items: SelectItem[];
  value?: string;
  onChange: (value: string) => void;
  defaultValue?: string;
  block?: boolean;
  className?: string;
}

export const Select = ({
  intent,
  size,
  onChange,
  value,
  defaultValue,
  items,
  block,
}: SelectProps) => {
  const styles = selectStyles({ intent, size });
  return (
    <RadixSelect.Root
      onValueChange={(value) => onChange(value)}
      value={value}
      defaultValue={defaultValue ? defaultValue : items[0].id}
    >
      <RadixSelect.Trigger
        className={css(
          "inline-flex",
          "items-center",
          "justify-between",
          "border-[1px]",
          "border-black",
          "py-0.5",
          "px-1",
          "outline-0",
          "rounded-md",
          {
            "w-full": block,
          },
          styles
        )}
      >
        <RadixSelect.Value />
        <RadixSelect.Icon className={css("ml-2")}>
          <Icon name={IconName.ChevronDown} size={14} fill={"black"} />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          className={css(
            "overflow-hidden",
            "text-black",
            "dark:text-white",
            "text-sm",
            "border-[1px]",
            "border-black",
            "z-20",
            "bg-white",
            "outline-0",
            "rounded-md"
          )}
        >
          <RadixSelect.Viewport className={css("p-2")}>
            <RadixSelect.Group>
              {items.map((item) => (
                <RadixSelect.Item
                  key={`select-${item.id}`}
                  value={item.id}
                  className={css(
                    "relative",
                    "cursor-pointer",
                    "hover-hover:hover:underline",
                    "outline-0",
                    "p-1",
                    "rounded-md",
                    "hover:scale-110"
                  )}
                >
                  <RadixSelect.ItemText>
                    <Text>{item.name}</Text>
                  </RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator />
                </RadixSelect.Item>
              ))}
            </RadixSelect.Group>

            <RadixSelect.Separator />
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton />
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};
