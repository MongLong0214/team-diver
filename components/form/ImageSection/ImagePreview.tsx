import Image from "next/image";

type props = {
  imageSrc: string;
  imgRef: React.RefObject<HTMLImageElement>;
};

const ImagePreview = ({ imageSrc, imgRef }: props): JSX.Element => {
  return (
      <div className="mx-auto min-w-[600px] min-h-[600px]">
        {/* <Image src={imageSrc} ref={imgRef} width={650} height={600} alt="preview" className="object-contain w-full max-h-[600px]" /> */}
        <img src={imageSrc} ref={imgRef} className="object-contain w-full h-full max-h-[600px] max-w-[650px]" />
      </div>
  );
};

export default ImagePreview;
