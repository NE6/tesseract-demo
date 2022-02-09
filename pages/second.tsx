import React, { useEffect } from 'react';
import { createWorker } from 'tesseract.js';
import { Box, Button, Text } from '@chakra-ui/react';

export default function Second() {
  let video = <video id="videoElement" autoPlay={true}></video>;
  let canvas, ctx, worker;
  let running = false;
  let output = '';

  const start = async () => {
    try {
      // let video: any;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      console.log('video = ', video, 'stream = ', stream);
      video.srcObject = stream;
      video.play();
      video.onresize = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        running = true;
      };
    } catch (error) {
      console.log('Error: ', error);
    }

    // initialize Tesseract worker
    worker = createWorker({
      logger: (m) => console.log(m),
    });
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
  };

  // Capture an process image
  const capture = async () => {
    ctx = canvas.getCountext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const img = canvas.toDataURL('image/png');
    const {
      data: { text },
    } = await worker.recognize(img);
    output = text;
  };

  useEffect(() => {
    // start the webcam
    start();
  }, []);

  return (
    <Box>
      <video id="videoElement" autoPlay={true}></video>
      <canvas />
      {running ? (
        <Box>
          <Button onClick={capture}>Capture</Button>
          <Text>output: {output}</Text>
        </Box>
      ) : (
        <Text>Loading</Text>
      )}
    </Box>
  );
}
