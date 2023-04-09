import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){

  if(req.method !== "POST") {
    res.status(400).json({ message: "Bad Request" });
    return;
  }
  const AWS = require("aws-sdk");

  // DANGER ZONE!!
  AWS.config.update({
    region: process.env.S3_REGION,
    accessKeyId: process.env.S3_ACCESS_KID,
    secretAccessKey: process.env.S3_ACCESS_SECRET,
  })

  const s3 = new AWS.S3();
  const initImage:string = req.body.init_image || "";
  const base64Data = Buffer.from(initImage.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  const type = req.body.init_image.split(';')[0].split('/')[1];
  const maskImage:string = req.body.mask_image || "";
  const maskBase64Data = Buffer.from(maskImage.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  const mtype = req.body.mask_image.split(';')[0].split('/')[1];

  try {
    const fileId = Math.ceil(Math.random() * 10000000);
    const fileParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${fileId}.${type}`,
      Expires: 600,
      Body: base64Data,
      ContentEncoding: 'base64',
      ContentType: `image/${type}`,
    };
    const maskFileParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${fileId}_m.${mtype}`,
      Expires: 600,
      Body: maskBase64Data,
      ContentEncoding: 'base64',
      ContentType: `image/${mtype}`,
    };

    const { Location:initLocation } = await s3.upload(fileParams).promise();
    const { Location:maskLocation } = await s3.upload(maskFileParams).promise();

    res.status(200).json({ initLocation, maskLocation });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb", // Set desired value here
    },
  },
};