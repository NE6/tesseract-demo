import React, { useState, useEffect } from 'react';
import { createWorker } from 'tesseract.js';
import Webcam from 'react-webcam';
import { Box, Flex, Button, Image, Text } from '@chakra-ui/react';

export default function Third() {
  const webcamRef = React.useRef(null);
  const [URI, setURI] = useState(null);
  const [ocr, setOcr] = useState('Start Scanning');

  const worker = createWorker();
  // {
  // logger: (m) => console.log(m),
  // }
  const doOCR = async (URI) => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    if (URI) {
      const {
        data: { text },
      } = await worker.recognize(URI);
      console.log(text);
      setOcr(text);
      worker.terminate();
      return { text };
    }
  };
  // useEffect(() => {
  //   doOCR('');
  // }, []);

  const capture = React.useCallback(() => {
    // setURI(null);
    const imageSrc = webcamRef.current.getScreenshot();
    setURI(imageSrc);
    doOCR(imageSrc);
  }, [webcamRef, setURI, URI]);

  return (
    <Box>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={{
          facingMode: 'user',
          // { exact: 'environment' }
        }}
      />
      <Flex>
        <Button onClick={capture}>Capture Image</Button>
        <Text fontSize="30px">{ocr}</Text>
      </Flex>
      {console.log(ocr)}
    </Box>
  );
}
