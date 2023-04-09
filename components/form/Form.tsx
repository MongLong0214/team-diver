import ImageSection from "./ImageSection/ImageSection";
import SelectedItemsBox from "@/components/selectedItemsBox/SelectedItemsBox";

import { useRef } from "react";

const Form = (): JSX.Element => {
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <form className="h-full">
      <ImageSection imgRef={imgRef} />  
      <SelectedItemsBox />
    </form>
  );
};

export default Form;
