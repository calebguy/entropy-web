import { useCallback, useEffect, useMemo, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { useController } from "react-hook-form";
import { bytesToSize, css, objectKeys } from "utils";
import { Button, ButtonIntent } from "../Button/Button";
import { Icon, IconName } from "../Icon/Icon";
import { Text, TextIntent, TextSize } from "../Text/Text";
import { FormControl, FormControlProps } from "./FormControl";

export enum MediaInputIntent {
  Primary = "primary",
  Secondary = "secondary",
}

export interface FileWithPreview extends File {
  preview: string;
}

export interface MediaInputProps extends FormControlProps {
  intent?: MediaInputIntent;
  buttonLabel?: string;
  value?: File;
  defaultValue?: File;
  onDropAccepted?: (file: File) => void;
  onClear?: () => void;
  required?: boolean;
  disabled?: boolean;
  noClick?: boolean;
  maxSizeBytes?: number;
  acceptedMimeToExtension?: { [key: string]: string[] };
}

const MediaInput: React.FC<MediaInputProps> = ({
  name,
  label,
  helperText,
  labelCenter,
  onDropAccepted,
  onClear,
  required: isRequired,
  disabled,
  noClick,
  value,
  defaultValue,
  maxSizeBytes,
  acceptedMimeToExtension,
  buttonLabel,
  intent = MediaInputIntent.Primary,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const maxFiles = 1;

  const {
    field,
    formState: { errors },
  } = useController({
    name,
    rules: isRequired ? { required: true } : undefined,
    defaultValue: value && !defaultValue ? value : defaultValue,
  });

  const isError = errors[name];
  const onDrop = useCallback((acceptedFiles: any) => {
    field.onChange(acceptedFiles);
  }, []);
  const isPrimary = useMemo(
    () => intent === MediaInputIntent.Primary,
    [intent]
  );
  const isSecondary = useMemo(
    () => intent === MediaInputIntent.Secondary,
    [intent]
  );
  const primaryStyles = css(
    "flex",
    "flex-col",
    "relative",
    "justify-center",
    "items-center",
    "p-7",
    "rounded-sm",
    "bg-gray-medium"
  );
  const secondaryStyles = css(
    "rounded-full",
    "bg-white",
    "flex",
    "justify-center",
    "items-center"
  );
  const primaryStyle = { minHeight: 200 };
  const secondaryStyle = { height: 85, width: 85 };

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    fileRejections.forEach((file) => {
      file.errors.forEach((error) => {
        if (error.code === "file-too-large") {
          if (maxSizeBytes) {
            alert(`File must be smaller than ${bytesToSize(maxSizeBytes)}`);
          }
        } else {
          alert(error.message);
        }
      });
    });
  }, []);

  const _onDropAccepted = useCallback((files: File[]) => {
    if (files.length > maxFiles) {
      throw Error("Only 1 file is allowed");
    }
    const file = files[0];
    setPreview(URL.createObjectURL(file));
    if (onDropAccepted) {
      onDropAccepted(file);
    }
  }, []);

  useEffect(() => {
    field.onChange(value);
  }, [value]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDropRejected,
    maxFiles,
    onDropAccepted: _onDropAccepted,
    maxSize: maxSizeBytes,
    disabled: disabled,
    accept: acceptedMimeToExtension,
    multiple: false,
    onDrop: onDrop,
    noClick: noClick,
  });

  const rootProps = getRootProps();

  const renderExitButton = useCallback(() => {
    return (
      <div className={css("absolute", "top-3", "right-3")}>
        <button
          onClick={() => {
            field.onChange(null);
            setPreview(null);
            onClear && onClear();
          }}
        >
          <Icon name={IconName.Close} />
        </button>
      </div>
    );
  }, [field, setPreview, onClear]);

  const renderPreview = useCallback(() => {
    return (
      <div
        className={css(
          "!bg-contain",
          "!bg-center",
          "!bg-no-repeat",
          "w-full",
          "h-full",
          "grow"
        )}
        style={{ background: `url(${preview})` }}
      />
    );
  }, [preview]);

  const renderButton = useCallback(
    () => (
      <Button
        round
        disabled={disabled}
        intent={ButtonIntent.Secondary}
        onClick={(e) =>
          isSecondary && rootProps.onClick ? rootProps.onClick(e) : undefined
        }
      >
        {buttonLabel ? buttonLabel : "Select Media"}
      </Button>
    ),
    [disabled, buttonLabel, isSecondary, rootProps.onClick]
  );

  const renderMimeHelper = () => {
    return (
      acceptedMimeToExtension && (
        <Text intent={TextIntent.Gray} size={TextSize.Sm}>
          accepted:{" "}
          {objectKeys(acceptedMimeToExtension).map((mime, index, arr) => {
            const extensions = acceptedMimeToExtension[mime];
            if (index === 0 || arr.length === 1) {
              return extensions.join(", ");
            }
            return ", " + extensions.join(", ");
          })}
        </Text>
      )
    );
  };

  const renderMaxSizeHelper = () => {
    return (
      maxSizeBytes && (
        <Text intent={TextIntent.Gray} size={TextSize.Sm}>
          Max Size: {bytesToSize(maxSizeBytes)}
        </Text>
      )
    );
  };
  return (
    <FormControl
      helperText={helperText}
      name={name}
      label={label}
      labelCenter={labelCenter}
    >
      <div
        className={css("relative", "inline-block", "w-full", {
          "flex flex-col items-center gap-4": isSecondary,
        })}
      >
        <div
          {...rootProps}
          style={isPrimary ? primaryStyle : secondaryStyle}
          className={css("border-[1px]", "border-solid", "overflow-hidden", {
            "border-red-700": isError && !isDragActive,
            "border-black": !isError && !isDragActive,
            "border-brand": isDragActive,
            "cursor-pointer hover:border-brand": !noClick,
            "cursor-default": noClick,
            [secondaryStyles]: isSecondary,
            [primaryStyles]: isPrimary,
          })}
        >
          {isDragActive && <Icon name={IconName.Logo} />}
          {preview && renderPreview()}
          {!isDragActive && !preview && isPrimary && (
            <>
              {renderButton()}
              <div
                className={css(
                  "mt-2",
                  "flex",
                  "flex-col",
                  "items-center",
                  "gap-1"
                )}
              >
                {renderMaxSizeHelper()}
                {renderMimeHelper()}
              </div>
            </>
          )}
          {<input {...getInputProps()} />}
        </div>

        {isSecondary && (
          <>
            {renderButton()}
            <div className={css("flex", "flex-col", "items-center", "gap-1")}>
              {renderMaxSizeHelper()}
              {renderMimeHelper()}
            </div>
          </>
        )}

        {!isDragActive && preview && renderExitButton()}
      </div>
    </FormControl>
  );
};

export default MediaInput;
