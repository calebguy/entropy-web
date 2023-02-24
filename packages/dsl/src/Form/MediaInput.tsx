import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { useController } from "react-hook-form";
import { bytesToSize, css, objectKeys } from "utils";
import { Button, ButtonIntent } from "../Button/Button";
import { Icon, IconName } from "../Icon/Icon";
import { FormControl, FormControlProps } from "./FormControl";

export interface FileWithPreview extends File {
  preview: string;
}

export interface MediaInputProps extends FormControlProps {
  buttonLabel?: string;
  value?: File;
  defaultValue?: File;
  onDropAccepted?: (file: File) => void;
  onClear?: () => void;
  renderIsDropActive?: () => React.ReactNode;
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
  renderIsDropActive,
  required: isRequired,
  disabled,
  noClick,
  value,
  defaultValue,
  maxSizeBytes,
  acceptedMimeToExtension,
  buttonLabel,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const minHeight = preview ? 200 : 200;
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

  return (
    <FormControl
      helperText={helperText}
      name={name}
      label={label}
      labelCenter={labelCenter}
    >
      <div className={css("relative", "inline-block", "w-full")}>
        <div
          {...getRootProps()}
          style={{ minHeight }}
          className={css(
            "border-[1px]",
            "border-solid",
            "flex",
            "flex-col",
            "relative",
            "justify-center",
            "items-center",
            "overflow-hidden",
            "rounded-sm",
            "p-7",
            "bg-gray-medium",
            {
              "border-red-700": isError && !isDragActive,
              "border-black": !isError && !isDragActive,
              "border-brand": isDragActive,
              "cursor-pointer": !noClick,
              "cursor-default": noClick,
            }
          )}
        >
          {isDragActive && (
            <>
              {renderIsDropActive && renderIsDropActive()}
              {!renderIsDropActive && <Icon name={IconName.Logo} />}
            </>
          )}
          {preview && (
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
          )}
          {!isDragActive && !preview && (
            <div
              className={css(
                "flex",
                "flex-col",
                "items-center",
                "text-neutral-700",
                "gap-3",
                "mt-3"
              )}
            >
              <div>
                <Button
                  round
                  disabled={disabled}
                  intent={ButtonIntent.Secondary}
                >
                  {buttonLabel ? buttonLabel : "Select Media"}
                </Button>
              </div>
              <div className={css("text-center", "text-neutral-600")}>
                {acceptedMimeToExtension && (
                  <div className={css("text-xs")}>
                    accepted:{" "}
                    {objectKeys(acceptedMimeToExtension).map(
                      (mime, index, arr) => {
                        if (index === arr.length - 1) {
                          return (
                            ", " + acceptedMimeToExtension[mime].join(", ")
                          );
                        } else {
                          return acceptedMimeToExtension[mime].join(", ");
                        }
                      }
                    )}
                  </div>
                )}
                {maxSizeBytes && (
                  <div className={css("mt-0.5", "text-xs")}>
                    Max Size: {bytesToSize(maxSizeBytes)}
                  </div>
                )}
              </div>
              <input {...getInputProps()} />
            </div>
          )}
        </div>
        {!isDragActive && preview && (
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
            {/* <Button
              disabled={disabled}
              onClick={() => {
                field.onChange(null);
                setPreview(null);
                if (onClear) {
                  onClear();
                }
              }}
            >
              <Icon name={IconName.Close} />
            </Button> */}
          </div>
        )}
      </div>
    </FormControl>
  );
};

export default MediaInput;
