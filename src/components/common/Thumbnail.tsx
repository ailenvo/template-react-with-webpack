import React from "react";
import ImageEmpty from "./../../assets/images/common/ImageEmpty.png";

type Props = {
  onClick?: () => void;
  className?: string | undefined;
  src?: string | undefined;
  alt?: string | undefined;
};

export default function Thumbnail({
  onClick,
  className,
  src,
  alt = "Thumbnail",
}: Props) {
  return (
    <img
      onClick={onClick}
      onError={(event) => {
        const target = event.target as HTMLImageElement;
        target.onerror = null;
        target.src = ImageEmpty;
      }}
      className={className}
      src={src}
      alt={alt}
    />
  );
}
