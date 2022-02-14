import React, { useState } from 'react';
import Webcam from 'react-webcam';
// import vision from '@google-cloud/vision';

import { Box, Button, Text } from '@chakra-ui/react';

export default function GoogleOCR() {
  const webcamRef = React.useRef(null);
  const [URI, setURI] = useState(null);
  const [ocr, setOcr] = useState('Start Scanning');

  const vision = require('react-cloud-vision-api');
  vision.init({ auth: 'AIzaSyAMwfTTvXqWoLDFDntE-q4Emnb9zhsLiYA' });

  // const client = new vision.ImageAnnotatorClient({
  // keyFilename: "AIzaSyAMwfTTvXqWoLDFDntE-q4Emnb9zhsLiYA"
  // });
  const doOCR = async (URI) => {
    if (URI) {
      const req = new vision.Request({
        image: new vision.Image({
          base64: URI,
        }),
        features: [new vision.Feature('TEXT_DETECTION', 4)],
      });
      console.log(req);

      // const [result] = await client.textDetection(URI);
      // const detections = result.textAnnotations;
      // console.log('Text: ');
      // detections.forEach((text) => console.log(text));

      // return { result };
    }
  };

  const capture = React.useCallback(() => {
    setURI(null);
    setOcr('Processing...');
    const imageSrc = webcamRef.current.getScreenshot();
    setURI(imageSrc);
    doOCR(imageSrc);
  }, [webcamRef, setURI, URI]);

  return (
    <Box m="10px">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        // LANDSCAPE SETTINGS
        videoConstraints={{
          facingMode: 'user',
          // height: 80,
          // width: 400,
        }}

        // PORTRAIT SETTINGS
        // videoConstraints={{
        //   facingMode: { exact: 'environment' },
        //   height: 400,
        //   width: 80,
        // }}
      />

      <Box>
        <Button h="150px" w="300px" onClick={capture}>
          Capture Image
        </Button>
        <Text fontSize="30px">{ocr}</Text>
      </Box>
      {/* {console.log(ocr)} */}
    </Box>
  );
}
