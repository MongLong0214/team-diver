// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

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
    //  console.log(init_image, mask)

    const bodyData = {
      key: process.env.SD_KEY,
      prompt : "baseball player",
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
