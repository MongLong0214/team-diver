// import Image from "next/image";
import React, { SetStateAction } from "react";
import { maxHeight, maxWidth} from "../../globalVal";

type imgSize = {
  width: number;
  height: number;
};

type props = {
  imageSrc: string;
  imgRef: React.RefObject<HTMLImageElement>;
  setImgSize: React.Dispatch<SetStateAction<imgSize>>;
  setLoadingOverlay: React.Dispatch<SetStateAction<boolean>>;
};

const ImagePreview = ({ imageSrc, imgRef, setImgSize, setLoadingOverlay }: props): JSX.Element => {
  
  const onChangeHandler = (e: any) => {
    setImgSize({
      width: e.target.width,
      height: e.target.height,
    })
  }
  const handleImageLoad = (e: any) => {
    onChangeHandler(e);
    setLoadingOverlay(false);
  };

  return (
      <div className={`mx-auto min-w-[${maxWidth}px] min-h-[${maxHeight}px]`}>
        {/* <Image src={imageSrc} ref={imgRef} width={650} height={600} alt="preview" className="object-contain w-full max-h-[600px]" /> */}
        <img onLoad={handleImageLoad} src={imageSrc} ref={imgRef} className={`object-contain w-full h-full max-h-[${maxHeight}px] max-w-[${maxWidth}px]`} />
      </div>
  );
};

export default ImagePreview;
