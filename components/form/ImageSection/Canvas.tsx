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
        context.fillStyle = "black";
        context.fillRect(0,0, canvas.width, canvas.height);

        context.strokeStyle = "white";
        context.lineWidth = 20;
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
    // png 로 하는 이유는, 안 그린 영역을 자동으로 흰색으로 칠하기 때문입니다. 
    // 참고로 jpeg 는 검정색이므로 항상 검은 이미지만 나오게됩니다.
    setCanvasData(canvasRef.current?.toDataURL("image/png")|| "");
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
