import { useEffect } from "react";
import {
  useController,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";
import { TextField, TextFieldProps } from "../TextField/TextField";
import { FormControl } from "./FormControl";

interface BaseInputProps
  extends Pick<React.HTMLProps<HTMLInputElement>, "name"> {
  name: string;
  placeholder?: string;
  helperText?: string;
  label?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  rules?: UseControllerProps["rules"];
}

interface TextInputProps
  extends BaseInputProps,
    Pick<TextFieldProps, "block"> {}

export const TextInput = ({
  name,
  block,
  label,
  helperText,
  placeholder,
  value,
  onChange,
  rules,
  defaultValue = "",
}: TextInputProps) => {
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
    rules,
    defaultValue: value && !defaultValue ? value : defaultValue,
  });

  useEffect(() => {
    if (value) {
      field.onChange(value);
    }
  }, [value]);
  return (
    <FormControl name={field.name} label={label} helperText={helperText}>
      <TextField
        ref={field.ref}
        placeholder={placeholder}
        block={block}
        name={field.name}
        value={field.value}
        onChange={(value: string) => {
          field.onChange(value);
          onChange && onChange(value);
        }}
        onBlur={field.onBlur}
      />
    </FormControl>
  );
};
