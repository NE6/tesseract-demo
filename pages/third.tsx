import React, { useState, useEffect } from 'react';
import { createWorker } from 'tesseract.js';
import Webcam from 'react-webcam';
import { Box, Flex, Button, Image, Text } from '@chakra-ui/react';

export default function Third() {
  const webcamRef = React.useRef(null);
  const [URI, setURI] = useState('');
  const [ocr, setOcr] = useState('');
  // const [toCapture, setToCapture] = useState(false);
  let context, image;

  const worker = createWorker({
    logger: (m) => console.log(m),
  });
  const doOCR = async (URI) => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    if (URI) {
      const {
        data: { text },
      } = await worker.recognize(
        // 'https://tesseract.projectnaptha.com/img/eng_bw.png'
        // PNGImage
        URI
      );
      // .then(() => {
      console.log(URI);
      console.log(text);
      setOcr(text);
      worker.terminate();
      return { text };
      // });
    }
  };
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log(toCapture);
  //     if (toCapture) {
  //       capture();
  //     }
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, []);

  const capture = React.useCallback(() => {
    setURI('');
    const imageSrc = webcamRef.current.getScreenshot();
    setURI(imageSrc);
    // console.log(image);
    doOCR(URI);
  }, [webcamRef, setURI, URI]);

  const doubleClick = () => {
    capture();
    capture();
  };

  return (
    <Box>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={{
          facingMode: { exact: 'environment' },
        }}
      />
      <Flex>
        <Button onClick={doubleClick}>Capture Image</Button>
        <Text fontSize="30px">{ocr}</Text>
      </Flex>
      {/* <Box>{PNGImage}</Box> */}
      {console.log(ocr)}
    </Box>
  );
}
