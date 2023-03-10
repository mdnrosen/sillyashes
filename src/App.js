import './App.css';
import React, { useState, useEffect, useCallback } from 'react'


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Logo_Ashes from './assets/ashesLogo.png'
import Logo_ECB from './assets/ecbLogo.png'
import Logo_CA from './assets/ausLogo.png'
import { ThemeProvider, createTheme } from '@mui/material/styles';


import { Box, Container, Divider, LinearProgress, Toolbar } from '@mui/material'

import Home from './components/Home'
import Navbar from './components/Navbar';
import HeadtoHead from './components/HeadtoHead';
import Numbers from './components/Numbers'
import PickEm from './components/PickEm'
import TrueFalse from './components/TrueFalse'
import Multis from './components/Multis';
import Summary from './components/Summary'
import Results from './components/Results'
import NotFound from './components/NotFound';
import theme from './theme'

import dummyAnswers from './dummyAnswers.json'
import ScrollToTop from './components/ScrollToTop'


function App() {

  
  function useStickyState(defaultVal, key) {
    const [ value, setValue ] = useState(() => {
      const stickyVal = window.localStorage.getItem(key)
      return stickyVal !== null ? JSON.parse(stickyVal) : defaultVal
    })



    const handleProgress = useCallback(() => {
      setProgress((p => p))
    })

    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [ value, setValue ]
  }
  
  const [ guesses, setGuesses ] = useStickyState({}, 'sillyAshes')
  const [ progress, setProgress]  = useState(4)
  const [ step, setStep] = useState(1)

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ m:1, mx: 'auto',  p: { sx: 1, sm: 2 }, borderRight: 5, borderRightColor: '#00843D', borderLeft: 5, borderLeftColor: '#15295e' }}>
        <Toolbar sx={{ justifyContent: 'space-between', p: { xs: 1, sm: 2 }}} >
          <Box component="img" src={Logo_ECB} height={50} />
          {/* <Box component="img" src={Logo_Ashes} height={50} /> */}
          <Box component="img" src={Logo_CA} height={50} />
          {/* <Typography variant="h5">Silly Ashes</Typography> */}
    
        </Toolbar>
          <Navbar />

        <BrowserRouter>
          <ScrollToTop />
          {/* <Progress current={step} /> */}
          <Routes>

            <Route path="/head" element={<HeadtoHead guesses={guesses} setGuesses={setGuesses} setProgress={setProgress} />} />
            <Route path="/pick" element={<PickEm guesses={guesses} setGuesses={setGuesses}  />} />
            <Route path="/numbers" element={<Numbers guesses={guesses} setGuesses={setGuesses} />} />
            <Route path="/multi" element={<Multis guesses={guesses} setGuesses={setGuesses} />} />
            <Route path="/truefalse" element={<TrueFalse guesses={guesses} setGuesses={setGuesses}  />} />
            <Route path="/summary" element={<Summary guesses={guesses}/>} />
            <Route path="/results" element={<Results guesses={guesses}/>} />
            <Route exact path="/" element={<Home />} />
            <Route path="/*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>

      </Container>
    </ThemeProvider>

  )
}

export default App;
