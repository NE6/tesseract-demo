import React, { useState, useEffect } from 'react';
import { createWorker, createScheduler } from 'tesseract.js';
import Webcam from 'react-webcam';
import { Box, Flex, Button, Image, Text } from '@chakra-ui/react';
import { m } from 'framer-motion';

export default function Third() {
  const webcamRef = React.useRef(null);
  const [URI, setURI] = useState(null);
  const [ocr, setOcr] = useState('Start Scanning');
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
      } = await worker.recognize(URI);

      const matchedText = text.match(
        /[a-zA-Z]+-[a-zA-Z]+\d\d[a-zA-Z]\/[a-zA-Z]\d[a-zA-Z]\d-[a-zA-Z]/
      );
      if (matchedText) {
        console.log(matchedText[0]);
        setOcr(matchedText[0]);
      } else {
        setOcr('Please try again');
        return;
      }
      await worker.terminate();
      return { text };
    }
  };
  // useEffect(() => {
  //   doOCR('');
  // }, []);

  const capture = React.useCallback(() => {
    // setURI(null);
    setOcr('Processing...');
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
          facingMode:
            // 'user',
            { exact: 'environment' },
          height: 250,
          width: 80,
        }}
      />
      <Flex>
        <Button onClick={capture}>Capture Image</Button>
        <Text fontSize="30px">{ocr}</Text>
      </Flex>
      {/* {console.log(ocr)} */}
    </Box>
  );
}
