import ImageInput from "./ImageInput";
import ImagePreview from "./ImagePreview";
import React, { useState } from "react";

type props = {
  imgRef: React.RefObject<HTMLImageElement>
}

const ImageSection = ({imgRef} : props): JSX.Element => {
  const [imageSrc, setImageSrc] = useState<string>("");

  const onChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file: File = e.target.files[0];
    try {
      const base64 = (await convertBase64(file)) as string;
      setImageSrc(base64);
    } catch (err) {
      console.error("ERROR WAS OCCURED AT UPLOAD IMAGE");
    }
  };

  const convertBase64 = (file: File) => {
    return new Promise((res, rej) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        res(fileReader.result);
      };
      fileReader.onerror = (error) => {
        rej(error);
      };
    });
  };

  return (
    <>
      <ImageInput onChangeHandler={onChangeHandler} />
      <ImagePreview imageSrc={imageSrc} imgRef={imgRef} />
    </>
  );
};
export default ImageSection;
