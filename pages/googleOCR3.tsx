import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import Webcam from 'react-webcam';
import vision from '@google-cloud/vision';
import FormData from 'form-data';

import { Box, Button, Text } from '@chakra-ui/react';

const fetcher = (url, image) => fetch(url).then((res) => res.json());

export default function GoogleOCR3() {
  const webcamRef = React.useRef(null);
  const [ocr, setOcr] = useState('Start Scanning');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');

  async function getText(image) {
    const response = await axios.post(`http://localhost:3000/api/OCR`, {
      data: image,
    });

    // setText(response.data);

    return { data: response.data };
  }

  console.log(text);
  const capture = React.useCallback(() => {
    // setURI(null);
    setOcr('Processing...');
    const imageSrc = webcamRef.current.getScreenshot();
    // setURI(imageSrc);
    // setImage(imageSrc);
    getText(imageSrc);
  }, [
    webcamRef,
    // setURI, URI
  ]);

  return (
    <Box m="10px">
      <Webcam
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
      {console.log('xxxxxxxx', text)}
    </Box>
  );
}
