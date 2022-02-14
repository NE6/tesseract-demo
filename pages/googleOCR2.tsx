import React, { useState } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import vision from '@google-cloud/vision';

import { Box, Button, Text } from '@chakra-ui/react';

export default function GoogleOCR2() {
  // const webcamRef = React.useRef(null);
  // const [URI, setURI] = useState(null);
  // const [ocr, setOcr] = useState('Start Scanning');
  // const [text, setText] = useState('');

  // async function getText(URI) {
  //   const response = await axios.get(`localhost:3000/api/OCR`);
  //   setText(response.data);
  //   return response.data;
  // }

  // const client = new vision.ImageAnnotatorClient({
  //   keyFilename: 'AIzaSyAMwfTTvXqWoLDFDntE-q4Emnb9zhsLiYA',
  // });
  // const doOCR = async (URI) => {
  //   if (URI) {
  //     const [result] = await client.textDetection(URI);
  //     const detections = result.textAnnotations;
  //     console.log('Text: ');
  //     detections.forEach((text) => console.log(text));

  //     return { result };
  //   }
  // };

  // const capture = React.useCallback(() => {
  //   setURI(null);
  //   setOcr('Processing...');
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   setURI(imageSrc);
  //   getText(imageSrc);
  // }, [webcamRef, setURI, URI]);

  return (
    <Box m="10px">
      {/* <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={{
          facingMode: 'user',
        }}
      />

      <Box>
        <Button h="150px" w="300px" onClick={capture}>
          Capture Image
        </Button>
        <Text fontSize="30px">{text}</Text>
      </Box>
      {console.log(text)} */}
    </Box>
  );
}
