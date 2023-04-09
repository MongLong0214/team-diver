import ImageInput from "./ImageInput";
import ImagePreview from "./ImagePreview";
import React, {useEffect, useState} from "react";
import Resizer from "react-image-file-resizer";
import Canvas from "./Canvas";
import { maxHeight, maxWidth} from "../../globalVal";
import LoadingOverlay from "@/components/common/LoadingOverlay";

import {useRecoilState, useRecoilValue} from "recoil";
import { selectedItemsAtom } from "@/atom/selectedItemsAtom";

import {convertPrompt} from "@/components/common/utils";
import Swal from "sweetalert2";

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
  // const promptVal: string[] = useRecoilValue(selectedItemsAtom);
  const [promptVal, setPromptVal] = useRecoilState(selectedItemsAtom);
  const [loadingOverlay, setLoadingOverlay] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);



  const resetImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setImageSrc("");
    setCanvasData("");
    setIsFinished(false)
    setMask(true);
    setPromptVal([]);
  };

  const toggleMask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMask((prev) => !prev);
  };

  type uploadImageUrl = { result: boolean; initUrl?: string; maskUrl?: string };

  const englishPrompts = convertPrompt(promptVal);

  const uploadImage = async (): Promise<uploadImageUrl> => {
    setLoadingOverlay(true);

    try {
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
    } catch (error) {
      console.error("Error in uploadImage:", error);
    } finally {
      console.log("uploadImage finished");
    }

    // Add a return statement outside the try block
    return { result: false };
  };




  const generateImage = async (initUrl: string, maskUrl: string) => {

    try {
      console.log("data upload...");
      const response = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          init_image: initUrl,
          mask: maskUrl,
          prompt: englishPrompts.join(", ") + ", simplistic, fashion design, clothing concept, clothing design, photoshoot, illustration, trending on artstation",
          width: imgSize.width,
          height: imgSize.height,
        }),
      });

      if (!response.ok) {
        console.error("Error on API");
        return;
      }

      const data = await response.json();
      if(data.output[0] === undefined) {
        setImageSrc("");
        setCanvasData("");
        setIsFinished(false)
        setMask(true);
        setPromptVal([]);
        Swal.fire('이미지를 생성하지 못했습니다. 이미지를 다시 생성해주세요.', '', 'warning').then(() => {
          console.log("fail")
        },
        )
        return;
      }

      console.log("data ::", data.output[0]);
      setImageSrc(data.output[0]);
      setMask(false);
      setIsFinished(true);

    } catch (error) {
      console.error("Error in generateImage:", error);
      setLoadingOverlay(false);
    } finally {
      console.log("generateImage finished");
      // setLoadingOverlay(false);
    }
  };


  const onSubmitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (imgRef.current !== null) {
      const { result, initUrl, maskUrl } = await uploadImage();
      console.log(initUrl, maskUrl);
      if (!result || !initUrl || !maskUrl) {
        return;
      } else {      
        await generateImage(initUrl, maskUrl);
      }
    }
  };

  const onChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    try {
      const file: File = e.target.files[0];
      // if image size is smaller than 300 * 300, swal alert
      if (e.target.files[0].size < 300 * 300) {
        Swal.fire({
          title: "이미지 사이즈가 너무 작습니다.",
          text: "300 * 300 이상의 이미지를 업로드해주세요.",
          icon: "warning",
          confirmButtonText: "확인",
        }).then(()=> {
          e.target.value = "";
        }) ;
        return;
      }
      Resizer.imageFileResizer(
        file,
        maxWidth,
        maxHeight,
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
      <div className='max-w-fit'>
      {loadingOverlay && <LoadingOverlay />}
      {imageSrc?.length > 0 ? (
        <>
          <ImagePreview imageSrc={imageSrc} imgRef={imgRef} setImgSize={setImgSize}  setLoadingOverlay={setLoadingOverlay} />
          <Canvas {...imgSize} setCanvasData={setCanvasData} isVisible={mask} />
          <div className='flex justify-center'>
            <button className="px-4 py-2 text-sm font-medium
              text-gray-900 bg-gray-400 border border-gray-900 rounded-l-lg
              hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500
              focus:bg-gray-900 focus:text-white dark:border-white dark:text-white
              dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700" onClick={resetImage}>
              새로 만들기
            </button>
            {!isFinished && (
                <>
                  <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-400
               border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2
               focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white
                dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                          onClick={toggleMask}>
                    마스킹 편집
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-400
              border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2
               focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white
                dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                          type="submit"
                          onClick={onSubmitHandler}>
                    이미지 생성
                  </button>
                </>
            )}
          </div>
        </>
      ) : (
          <>
            <ImageInput onChangeHandler={onChangeHandler} />
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button type="button" className="px-4 py-2 text-sm font-medium
              text-gray-900 bg-gray-400 border border-gray-900 rounded-l-lg
              hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500
              focus:bg-gray-900 focus:text-white dark:border-white dark:text-white
              dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                새로 만들기
              </button>
              <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-400
               border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2
               focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white
                dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                마스킹 편집
              </button>
              <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-400
              border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2
               focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white
                dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                이미지 생성
              </button>
            </div>
          </>
      )}
    </div>
  );
};
export default ImageSection;
