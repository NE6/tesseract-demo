// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const fs = require("fs");
const path = require("path");

const bucketName = 'C:/Users/pcrav/Documents/NE6/tesseract/public';
const pathName = 'handwriting.jpg';

export default async function googleOCR(req, res) {
  const data = req.body.data.replace(/^data:image\/png;base64,/, '');
  try {
    const [result] = await client.textDetection(Buffer.from(data, "base64"));
    const detections = result.textAnnotations;
    // console.log(result.textAnnotations);
    // detections.forEach(text => console.log(text))
    console.log(result.fullTextAnnotation.text);
  } catch (error) {
    console.error(error);
  }
  res.status(200).json('')
}

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }
