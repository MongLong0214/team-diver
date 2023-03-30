import ImageSection from "./ImageSection/ImageSection";

import Prompts from "./Prompts";
import { useRef } from "react";

type promptTypes = {
  selectedPrompts: string[];
};

const Form = (): JSX.Element => {
  const imgRef = useRef<HTMLImageElement>(null);
  const promptRef = useRef<promptTypes>({
    selectedPrompts: [],
  });

  const onSubmitHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (imgRef.current !== null) {
      // base64 이미지
      console.log(imgRef.current.src);
      // 선택된 프롬포트
      console.log(promptRef.current.selectedPrompts);
    }
  };

  return (
    <form>
      <ImageSection imgRef={imgRef} />
      <Prompts ref={promptRef} />
      <input type="submit" onClick={onSubmitHandler} value="생성하기" />
    </form>
  );
};

export default Form;
