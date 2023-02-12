import { PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";
import { css } from "utils";
import { Text } from "../Text/Text";

export interface FormControlProps extends PropsWithChildren {
  name: string;
  label?: string;
  helperText?: string;
}

export const FormControl = ({
  label: inputLabel,
  children,
  helperText,
  name,
}: FormControlProps) => {
  const {
    formState: { errors },
  } = useFormContext();
  const error = errors[name];
  return (
    <div>
      {inputLabel && (
        <label htmlFor={name}>
          <Text>{inputLabel}</Text>
        </label>
      )}
      {children}
      {helperText && <Text>{helperText}</Text>}
      {error && <div className={css("text-red-500")}>{error.message}</div>}
    </div>
  );
};
