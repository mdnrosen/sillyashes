import './App.css';

import axios from 'axios';
import React, { useState, useEffect, createContext } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';

import { Container } from '@mui/material'

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


  // const getAllGuesses = async () => {
  //   try {
  //     const res = await axios.get(`http://localhost:7777/people`)
  //     console.log(res.data)
  //     return res.data
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // useEffect(() => {
  //   getAllGuesses()
  // },[])
  

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ m:1, mx: 'auto',  p: { xs: 0, sm: 2 }, borderRight: 5, borderRightColor: '#00843D', borderLeft: 5, borderLeftColor: '#15295e' }}>
        <BrowserRouter>
          <Navbar />
          <ScrollToTop />
          <ScrollTopButton />
          <GuessContext.Provider value={guesses}>
            <Routes>
              {/* Here i need to build a higher order component to control redirect from locked */}
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
