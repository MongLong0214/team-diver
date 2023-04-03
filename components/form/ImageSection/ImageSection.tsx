import ImageInput from "./ImageInput";
import ImagePreview from "./ImagePreview";
import React, { useState } from "react";

import { useRecoilValue } from "recoil";
import { selectedItemsAtom } from "@/atom/selectedItemsAtom";

type props = {
  imgRef: React.RefObject<HTMLImageElement>;
};

const ImageSection = ({ imgRef }: props): JSX.Element => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const selVal = useRecoilValue(selectedItemsAtom);

  const resetImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setImageSrc("");
  };

  const onSubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (imgRef.current !== null) {
      console.log(imgRef.current.src);
      console.log(selVal);
    }
  };

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
    <div className="">
      {imageSrc.length > 0 || (
        <>
          <ImageInput onChangeHandler={onChangeHandler} />{" "}
          <div>
            <button type="button" className="py-2 px-4 text-white bg-gray-300 rounded focus:outline-none" disabled>
              Reset
            </button>
            <button type="button" className="py-2 px-4 text-white bg-gray-300 rounded focus:outline-none" disabled>
              생성하기
            </button>
          </div>
        </>
      )}
      {imageSrc.length > 0 && (
        <>
          <ImagePreview imageSrc={imageSrc} imgRef={imgRef} />
          <div>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={resetImage}>
              Reset
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" onClick={onSubmitHandler}>
              생성하기
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default ImageSection;
