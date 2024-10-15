import React from "react";
import Image from "next/image";

type PositionImageProps = {
  alt?: string;
  src: string;
};
export default function PositionImage({ alt, src }: PositionImageProps) {
  //   const [height, setHeight] = React.useState();
  const localAlt = alt || "Position image";
  return (
    <div>
      {" "}
      <Image
        key={src}
        src={src}
        alt={localAlt}
        className="object-cover w-full"
        // onLoad={({ target }) => {
        //   const { naturalWidth, naturalHeight } =
        //     target as HTMLImageElement;
        // }}
      />
    </div>
  );
}
