import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import Webcam from 'react-webcam';
import vision from '@google-cloud/vision';
import FormData from 'form-data';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Button, Text, Select, Flex } from '@chakra-ui/react';

type formValues = {
  selectedString: string;
};
const schema: yup.SchemaOf<formValues> = yup.object().shape({
  selectedString: yup.string(),
});

export default function GoogleOCR3() {
  const webcamRef = React.useRef(null);
  const [ocr, setOcr] = useState('Start Scanning');
  const [text, setText] = useState([]);
  const [string, setString] = useState('');
  const [showResult, setShowResult] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<formValues>({
    resolver: yupResolver(schema),
  });

  async function getText(image) {
    const response = await axios.post(`http://localhost:3000/api/OCR`, {
      data: image,
    });

    const stringArr = response.data.result.split('\n');
    setText(stringArr);
    console.log(stringArr);
  }

  console.log(text);
  const capture = React.useCallback(() => {
    setOcr('Processing...');
    const imageSrc = webcamRef.current.getScreenshot();
    getText(imageSrc);
  }, [webcamRef]);

  const onSubmit = (data: formValues) => {
    if (data) {
      // setString(data.selectedString);
      console.log(data);
      setShowResult(true);
    }
  };

  useEffect(() => {
    console.log(string);
  }, [string]);

  return (
    <Box m="10px">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={{
          facingMode: 'environment',
        }}
      />

      <Box>
        <Flex>
          <Button h="150px" w="300px" onClick={capture}>
            Capture Image
          </Button>
          {showResult ? (
            <Box ml="30px">
              <Text>Your Selection: </Text>
              <Text>{string}</Text>
            </Box>
          ) : null}
        </Flex>
        {/* <Text fontSize="30px">{text}</Text> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {text[0] ? (
            <Box>
              <Text>Select code</Text>
              <Select
                {...register('selectedString')}
                name="selectedString"
                onChange={(e) => setString(e.target.value)}
              >
                {text.map((string) => (
                  <option key={string} value={string}>
                    {string}
                  </option>
                ))}
              </Select>
              {}
            </Box>
          ) : null}
          <Button type="submit" disabled={!string}>
            Validate
          </Button>
        </form>
      </Box>
    </Box>
  );
}
