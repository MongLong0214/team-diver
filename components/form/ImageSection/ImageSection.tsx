import ImageInput from "./ImageInput";
import ImagePreview from "./ImagePreview";
import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import Canvas from "./Canvas";

import { useRecoilValue } from "recoil";
import { selectedItemsAtom } from "@/atom/selectedItemsAtom";

type props = {
  imgRef: React.RefObject<HTMLImageElement>;
};

type imgSize = {
  width: number;
  height: number;
};

const ImageSection = ({ imgRef }: props): JSX.Element => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [imgSize, setImgSize] = useState<imgSize>({ width: 0, height: 0 });

  const [canvasData, setCanvasData] = useState<string>("");
  const [mask, setMask] = useState<boolean>(true);
  const promptVal: string[] = useRecoilValue(selectedItemsAtom);

  const resetImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setImageSrc("");
    setCanvasData("");
    setMask(true);
  };

  const toggleMask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMask((prev) => !prev);
  };

  type uploadImageUrl = { result: boolean; initUrl?: string; maskUrl?: string };
  const uploadImage = async (): uploadImageUrl => {
    if (imgRef.current !== null) {
      const response = await fetch("/api/image/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          init_image: imgRef.current.src,
          mask_image: canvasData,
        }),
      });
      if (!response.ok) {
        console.error("Error on upload");
        return { result: false };
      }

      const { initLocation, maskLocation } = await response.json();
      return { 
        result: true, 
        initUrl: initLocation, 
        maskUrl: maskLocation,
      };
    }
  };

  const generateImage = async (initUrl: string, maskUrl: string) => {
    const response = await fetch("/api/image", {
      method: "POST",        
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        init_image: initUrl,
        mask: maskUrl,
        prompt: promptVal.join(", "),
        width: imgSize.width,
        height: imgSize.height,
      }),
    });
    if (!response.ok) {
      console.error("Error on API");
      return;
    }
    const data = await response.json();
    console.log(data);
    // setImageSrc(data.image);
  };

  const onSubmitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (imgRef.current !== null) {
      const { result, initUrl, maskUrl } = await uploadImage();
      console.log(initUrl, maskUrl);
      if (result === false || !initUrl || !maskUrl) {
        return;
      } else {      
        generateImage(initUrl, maskUrl);
      }
    }
  };

  const onChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    try {
      const file: File = e.target.files[0];
      Resizer.imageFileResizer(
        file,
        650,
        600,
        "PNG",
        100,
        0,
        (uri) => {
          setImageSrc(uri as string);
        },
        "base64"
      );
    } catch (err) {
      console.error("ERROR WAS OCCURED AT UPLOAD IMAGE", err);
    }
  };

  return (
    <div className="">
      {imageSrc.length > 0 || (
        <>
          <ImageInput onChangeHandler={onChangeHandler} />
          <div>
            <button type="button" className="py-2 px-4 text-white bg-gray-300 rounded focus:outline-none" disabled>
              Reset
            </button>
            <button type="button" className="py-2 px-4 text-white bg-gray-300 rounded focus:outline-none" disabled>
             toggle mask
            </button>
            <button type="button" className="py-2 px-4 text-white bg-gray-300 rounded focus:outline-none" disabled>
              생성하기
            </button>
          </div>
        </>
      )}
      {imageSrc.length > 0 && (
        <>
          <ImagePreview imageSrc={imageSrc} imgRef={imgRef} setImgSize={setImgSize} />
          <Canvas {...imgSize} setCanvasData={setCanvasData} isVisible={mask} />
          <div>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={resetImage}>
              Reset
            </button>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={toggleMask}>
              toggle mask
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
