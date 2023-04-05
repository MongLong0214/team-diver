import React, { useEffect, useState, useRef, SetStateAction } from "react";
import classes from "./Canvas.module.css";

type CanvasProps = {
  width: number;
  height: number;
  setCanvasData: React.Dispatch<SetStateAction<string>>;
  isVisible: boolean;
};

const Canvas = ({ width, height, setCanvasData, isVisible }: CanvasProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D>();

  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");

      if (context) {
        context.strokeStyle = "black";
        context.lineWidth = 30;
        contextRef.current = context;

        setCtx(context);
      }
    }
  }, [width, height]);

  const startDrawing = () => {
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
    setCanvasData(canvasRef.current?.toDataURL("image/jpeg")|| "");
  };

  const drawing = ({ nativeEvent }: any) => {
    const { offsetX, offsetY } = nativeEvent;
    if (ctx) {
      if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      } else {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
        
      }
    }
  };

  const visible = isVisible ? classes.visible : classes.hidden;

  return (
    <div>
      <canvas 
        ref={canvasRef}
        className={`${classes.canvas} ${visible}`}
        onMouseDown={startDrawing} 
        onMouseUp={finishDrawing} 
        onMouseMove={drawing} 
        onMouseLeave={finishDrawing}
      ></canvas>
    </div>
  );
  //<canvas style={{backgroundImage:`url(${base64url})`}}
};
export default Canvas;
