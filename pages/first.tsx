import React, { useEffect } from 'react';
import { createWorker } from 'tesseract.js';
import { AlertDescription, Box } from '@chakra-ui/react';

export default function first() {
  let prompt1, screenshot, clear, img, video;
  let enable = false;
  const canvas = document.createElement('canvas');
  let format = '.png';

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    hasGetUserMedia();
    if (enable) {
      prompt1 = document.getElementById('prompt1');
      screenshot = document.getElementById('screenshot');
      clear = document.getElementById('clear');
      img = document.getElementsByTagName('img')[0];
      video = document.getElementsByTagName('video')[0];
      // download
      // capture
    }
  };
  const hasGetUserMedia = () => {
    if (!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia) {
      alert('Unable to enable camera.');
    } else {
      enable = true;
    }
  };

  const onCapture = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        screenshot.disabled = false;
        clear.disabled = false;
      })
      .catch((err) => alert('Error occurred: ' + err));
  };

  const onScreenshot = () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    img.src = canvas.toDataURL('image/png');
    // download.disabled = false;
  };

  const clearAll = () => {
    video.srcObject.getVideoTracks().forEach((track) => track.stop());
    document.getElementsByClassName('container')[0].removeChild(video);
    video = document.createElement('video');
    video.autoplay = true;
    document
      .getElementsByClassName('container')[0]
      .insertBefore(video, prompt1);

    if (img) {
      img.style.display = 'none';
    }

    screenshot.disabled = true;
    clear.disabled = true;
  };

  // init Tesseract
  const worker = createWorker({
    logger: (m) => console.log(m),
  });

  (async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const {
      data: { text },
    } = await worker.recognize(
      'https://tesseract.projectnaptha.com/img/eng_bw.png'
    );
    console.log(text);
    await worker.terminate();
  })();
  return <div>first</div>;
}
