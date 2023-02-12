import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";

const textfieldStyles = cva(
  "border-[1px] border-solid border-black outline-none text-black font-sans px-2 py-2 rounded-sm text-base placeholder:text-gray",
  {
    variants: {
      intent: {},
      block: {
        true: "w-full",
      },
    },
    defaultVariants: {},
  }
);

interface HTMLInputProps
  extends Pick<
    React.HTMLProps<HTMLInputElement>,
    "value" | "placeholder" | "defaultValue" | "type" | "name"
  > {}

export interface TextFieldProps
  extends PropsWithChildren,
    VariantProps<typeof textfieldStyles>,
    HTMLInputProps {
  onChange?: (value: string) => any;
  type?: "text" | "password" | "email";
}

export const TextField = ({
  intent,
  children,
  block,
  type = "text",
  onChange,
  ...rest
}: TextFieldProps) => {
  const styles = textfieldStyles({ intent, block });
  return (
    <input
      type={type}
      className={styles}
      onChange={(e) => {
        //@ts-ignore
        onChange && onChange((e.target as HTMLInputElement).value);
      }}
      {...rest}
    >
      {children}
    </input>
  );
};
