import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const fetchId = req.body.fetchId;

    const fetchResponse = await fetch(`https://stablediffusionapi.com/api/v3/fetch/${fetchId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: process.env.SD_KEY
      })
    });

  // 응답 예시
  // 완료됨
  //   {
  //     "status": "success",
  //     "id": 10294250,
  //     "output": [
  //         "https://pub-8b49af329fae499aa563997f5d4068a4.r2.dev/generations/dc6df0fa-26cc-4135-8dc8-83ff945cb77b-0.png"
  //     ]
  // }
  // 진행중
  // {
  //   "status": "processing",
  //   "id": "",
  //   "messege": "Request processing",
  //   "output": ""
  // } 
  // 실패함


    const data = fetchResponse.json();

  }
}
