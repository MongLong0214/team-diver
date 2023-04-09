import React, { forwardRef, useImperativeHandle, useState } from "react";
import classes from "./Prompt.module.css";

const allPrompts = ["suit", "casual", "policeman", "hiphop"];

const Prompts = forwardRef(({}, ref:React.ForwardedRef<object>): JSX.Element => {
  const [selectedPrompts, setSelectedPrompts] = useState<string[]>([]);

  useImperativeHandle(ref, () => ({    
    selectedPrompts
  }), [selectedPrompts]);

  const togglePrompts = (prompt: string) => {
    setSelectedPrompts((prevState) => {
      if (prevState.includes(prompt)) {
        const newPrompts = prevState.filter((i) => i !== prompt);
        return newPrompts;
      } else {
        const newPrompts = [...prevState, prompt];
        return newPrompts;
      }
    });
  };

  return (
    <div>
      {allPrompts.map((prompt) => {
        const style = selectedPrompts.includes(prompt) ? classes.selected : "";
        return (
          <input
            type="button"
            key={prompt}
            value={prompt}
            className={style}
            onClick={(e: React.MouseEvent<HTMLInputElement>) => {
              e.preventDefault();
              togglePrompts(prompt);
            }}
          />
        );
      })}
    </div>
  );
});

export default Prompts;
