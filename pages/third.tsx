import React, { useState, useEffect } from 'react';
import { createWorker } from 'tesseract.js';
import Webcam from 'react-webcam';
import { Box, Button, Image } from '@chakra-ui/react';

export default function Third() {
  const webcamRef = React.useRef(null);
  const [image, setImage] = useState('');

  // initialize Tesseract worker
  useEffect(() => {
    start();
  }, []);
  const start = async () => {
    const worker = createWorker({
      logger: (m) => console.log(m),
    });
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  return (
    <Box>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <Button onClick={capture}>Capture Image</Button>
      {image ? <Image src={image} alt="image"></Image> : null}
    </Box>
  );
}
