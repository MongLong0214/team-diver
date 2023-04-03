import ImageSection from "./ImageSection/ImageSection";

// import Prompts from "./Prompts";
import { useRef } from "react";

type promptTypes = {
  selectedPrompts: string[];
};

const Form = (): JSX.Element => {
  const imgRef = useRef<HTMLImageElement>(null);
  
  const promptRef = useRef<promptTypes>({
    selectedPrompts: [],
  });

  return (
    <form className="h-2/3">
      <ImageSection imgRef={imgRef} />  
    </form>
  );
};

export default Form;
