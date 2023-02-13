import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, PropsWithChildren } from "react";

const textfieldStyles = cva(
  "border-[1px] border-solid border-black outline-none text-black font-sans px-2 py-2 rounded-sm text-base placeholder:text-gray font-normal",
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
    "value" | "placeholder" | "defaultValue" | "type" | "name" | "onBlur"
  > {}

export interface TextFieldProps
  extends PropsWithChildren,
    VariantProps<typeof textfieldStyles>,
    HTMLInputProps {
  onChange?: (value: string) => any;
  type?: "text" | "password" | "email";
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ intent, children, block, type = "text", onChange, ...rest }, ref) => {
    const styles = textfieldStyles({ intent, block });
    return (
      <input
        ref={ref}
        type={type}
        className={styles}
        onChange={({ target: { value } }) => {
          onChange && onChange(value);
        }}
        {...rest}
      >
        {children}
      </input>
    );
  }
);
