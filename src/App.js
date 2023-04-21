import './App.css';
import React, { useState, useEffect, createContext } from 'react'

import Logo from './assets/sillashesLogo.png'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Logo_ECB from './assets/ecbLogo.png'
import Logo_CA from './assets/ausLogo.png'
import { ThemeProvider } from '@mui/material/styles';


import { Box, Container, Toolbar } from '@mui/material'

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

import defaultState from './defaultState.json'
import ScrollToTop from './components/ScrollToTop'
import ScrollTopButton from './components/ScrollTopButton';
export const GuessContext = createContext([])

function App() {
  const [ guesses, setGuesses ] = useStickyState(defaultState, 'sillyAshes')


  function useStickyState(defaultVal, key) {
    const [ value, setValue ] = useState(() => {
      const stickyVal = window.localStorage.getItem(key)
        return stickyVal !== null ? JSON.parse(stickyVal) : defaultVal
      })

    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    return [ value, setValue ]
  }
  
 

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ m:1, mx: 'auto',  p: { sx: 1, sm: 2 }, borderRight: 5, borderRightColor: '#00843D', borderLeft: 5, borderLeftColor: '#15295e' }}>
        <Toolbar sx={{ borderBottom: '2px solid black',justifyContent: 'space-between', p: { xs: 1, sm: 1 }}} >
          <Box component="img" src={Logo_ECB} height={60} />
          <Box component="img" src={Logo} height={50} />
          {/* <Box component="img" src={Logo_Ashes} height={50} /> */}
          <Box component="img" src={Logo_CA} height={60} />
          {/* <Typography variant="h5">Silly Ashes</Typography> */}
    
        </Toolbar>

        <BrowserRouter>
          <Navbar />
          <ScrollToTop />
          <ScrollTopButton />
          <GuessContext.Provider value={guesses}>
          {/* <Progress current={step} /> */}
            <Routes>

              <Route path="/head" element={<HeadtoHead setGuesses={setGuesses} />} />
              <Route path="/pick" element={<PickEm setGuesses={setGuesses}  />} />
              <Route path="/numbers" element={<Numbers setGuesses={setGuesses} />} />
              <Route path="/multi" element={<Multis setGuesses={setGuesses} />} />
              <Route path="/truefalse" element={<TrueFalse setGuesses={setGuesses}  />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="/results" element={<Results />} />
              <Route exact path="/" element={<Home />} />
              <Route path="/*" element={<NotFound />} />

            </Routes>
          </GuessContext.Provider>
        </BrowserRouter>

      </Container>
    </ThemeProvider>

  )
}

export default App;
