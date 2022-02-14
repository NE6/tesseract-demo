import react, { useEffect } from 'react'

import { Box } from '@chakra-ui/react'
import Tesseract from './tesseract.tsx'
import GoogleOCR3 from './googleOCR3'

export default function Home() {
  
  return (
    <Box>
      
      {/* <Tesseract /> */}
      <GoogleOCR3 />
    </Box>
  )
}
