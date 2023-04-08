// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { useRecoilValue } from "recoil";
import { selectedItemsAtom } from "@/atom/selectedItemsAtom";

export const config = {
  api: {
      bodyParser: {
          sizeLimit: '3mb' // Set desired value here
      }
  }
}

type Data = {
  result: string;
  message: string;
  responseData?: any;
  requestData?: any;
  image?: string;
};




export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if (req.method === "POST") {

    const {
      init_image,
      mask,
      prompt,
      width,
      height,
     } = req.body;

     const widthValue = Math.floor(parseInt(width)/8)*8
     const heightValue = Math.floor(parseInt(height)/8)*8


    const bodyData = {
      key: process.env.SD_KEY,
      // todo : prompt 재설정
      prompt : prompt,
      model_id: "realistic-vision-v13",
      negative_prompt: null,
      init_image: init_image,
      mask_image: mask,
      width: widthValue,
      height: heightValue,
      samples: "1",
      scheduler : "DDPMScheduler",
      steps: "30",
      guidance_scale: 7.5,
      safety_checker:"yes",
      strength: 0.7,
      seed: null,
      webhook: null,
      track_id: null
    }
    const fetchResponse = await fetch(
        "https://stablediffusionapi.com/api/v4/dreambooth/inpaint", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData)
        }
    )
    const responseData = await fetchResponse.json();

    res.status(200).json( responseData );
  } else {
    res.status(403).json({ result: "403 error", requestData: req.body, message: "Not allowed method" });
  }
  return;
}


// 성공한 response 예시

// {
//   "status": "success",
//   "generationTime": 4.918609142303467,
//   "id": 10303550,
//   "output": [
//       "https://pub-8b49af329fae499aa563997f5d4068a4.r2.dev/generations/0d1e7182-431c-4f68-9ba0-1fa3361f2d4b-0.png"
//   ],
//   "meta": {
//       "H": 512,
//       "W": 512,
//       "file_prefix": "0d1e7182-431c-4f68-9ba0-1fa3361f2d4b",
//       "full_url": "no",
//       "guidance_scale": 7.5,
//       "init_image": "https://awsbucket39.s3.ap-northeast-2.amazonaws.com/4349917.png",
//       "mask_image": "https://awsbucket39.s3.ap-northeast-2.amazonaws.com/4349917_m.png",
//       "model_id": "realistic-vision-v13",
//       "n_samples": 1,
//       "negative_prompt": " ((out of frame)), ((extra fingers)), mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), (((tiling))), ((naked)), ((tile)), ((fleshpile)), ((ugly)), (((abstract))), blurry, ((bad anatomy)), ((bad proportions)), ((extra limbs)), cloned face, glitchy, ((extra breasts)), ((double torso)), ((extra arms)), ((extra hands)), ((mangled fingers)), ((missing breasts)), (missing lips), ((ugly face)), ((fat)), ((extra legs))",
//       "outdir": "out",
//       "prompt": " soccer player DSLR photography, sharp focus, Unreal Engine 5, Octane Render, Redshift, ((cinematic lighting)), f/1.4, ISO 200, 1/160s, 8K, RAW, unedited, symmetrical balance, in-frame",
//       "safetychecker": "yes",
//       "scheduler": "DDPMScheduler",
//       "seed": 3741974719,
//       "steps": 50,
//       "upscale": "no"
//   }
// }

//실패한 예시
// {status: 'error', message: '# 그때그때 다름'}