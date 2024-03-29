import { PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";
import { css } from "utils";
import { Text, TextIntent } from "../Text/Text";

export interface FormControlProps extends PropsWithChildren {
  name: string;
  label?: string;
  helperText?: string;
  labelCenter?: boolean;
}

const getErrorMessage = (type: any, name: string) => {
  switch (type) {
    case "required":
      return `${name} is required`;
    case "maxLength":
      return `${name} is too long`;
    case "minLength":
      return `${name} is too short`;
    default:
      return `${name} is invalid`;
  }
};

export const FormControl = ({
  label: inputLabel,
  children,
  helperText,
  name,
  labelCenter,
}: FormControlProps) => {
  const {
    formState: { errors },
  } = useFormContext();
  const error = errors[name];
  return (
    <div className={css("w-full")}>
      {inputLabel && (
        <label
          htmlFor={name}
          className={css({ "block w-full text-center": labelCenter })}
        >
          <Text>{inputLabel}</Text>
        </label>
      )}
      {children}
      {helperText && <Text>{helperText}</Text>}
      {error && (
        <div className={css("mt-0.5")}>
          <Text intent={TextIntent.Error}>
            {getErrorMessage(error.type, name)}
          </Text>
        </div>
      )}
    </div>
  );
};
