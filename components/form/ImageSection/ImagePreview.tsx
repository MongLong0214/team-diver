type props = {
  imageSrc: string;
  imgRef: React.RefObject<HTMLImageElement>;
};

const ImagePreview = ({ imageSrc, imgRef }: props): JSX.Element => {
  return (
    <div>
      <img src={imageSrc} ref={imgRef} />
    </div>
  );
};

export default ImagePreview;
