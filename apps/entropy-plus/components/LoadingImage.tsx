import { AspectRatio, Icon, IconName } from "dsl";
import Image from "next/image";
import { useState } from "react";
import { css } from "utils";
import { Photo } from "../interfaces";

interface LoadingImageProps {
  photo: Photo;
}

const LoadingImage = ({ photo }: LoadingImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={css("relative", "h-full", "w-full")}>
      <AspectRatio ratio={"1/1"} className={css("rounded-md", "relative")}>
        <Image
          fill
          alt={photo.url}
          src={photo.url}
          onLoadingComplete={() => setIsLoading(false)}
          className={css(
            "w-full",
            "h-full",
            "rounded-md",
            "z-10",
            "object-cover"
          )}
        />
      </AspectRatio>
      {isLoading && <LoaderForImage />}
    </div>
  );
};

export const LoaderForImage = () => {
  return (
    <div
      className={css(
        "bg-gray-100",
        "w-full",
        "h-full",
        "rounded-md",
        "flex",
        "justify-center",
        "items-center",
        "absolute",
        "inset-0"
      )}
    >
      <Icon name={IconName.GreyLogo} size={25} />
    </div>
  );
};

export default LoadingImage;
