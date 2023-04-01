type props = {
  imageSrc: string;
  imgRef: React.RefObject<HTMLImageElement>;
};

const ImagePreview = ({ imageSrc, imgRef }: props): JSX.Element => {
  return (
      <div className="w-2/3 mx-auto">
        <img src={imageSrc} ref={imgRef} className="object-contain w-full h-auto max-h-80" />
      </div>
  );
};

export default ImagePreview;
