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
    "value" | "onChange" | "placeholder" | "defaultValue" | "type"
  > {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
  type?: "text" | "password" | "email";
}

interface TextFieldProps
  extends PropsWithChildren,
    VariantProps<typeof textfieldStyles>,
    HTMLInputProps {}

export const TextField = ({
  intent,
  children,
  block,
  type = "text",
  ...rest
}: TextFieldProps) => {
  const styles = textfieldStyles({ intent, block });
  return (
    <input type={type} className={styles} {...rest}>
      {children}
    </input>
  );
};
