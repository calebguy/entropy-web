import { useEffect } from "react";
import { useController, useFormContext } from "react-hook-form";
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
  defaultValue = "",
}: TextInputProps) => {
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: value && !defaultValue ? value : defaultValue,
  });

  useEffect(() => {
    if (value) {
      field.onChange(value);
      console.log("running");
    }
  }, [value]);
  return (
    <FormControl name={field.name} label={label} helperText={helperText}>
      <TextField
        placeholder={placeholder}
        block={block}
        name={field.name}
        value={field.value}
        onChange={(value) => {
          field.onChange(value);
          onChange && onChange(value);
        }}
      />
    </FormControl>
  );
};
