import { Box, Divider, Toolbar, Typography, TextField, Button, Dialog, CircularProgress, DialogContent } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import axios  from 'axios'
import { useNavigate } from 'react-router-dom';


import RadioSummary from './Summaries/Radio_Summary';
import CheckboxSummary from './Summaries/Checkbox_Summary'
import NumberSummary from './Summaries/NumberSummary'
import questions from '../master.json'
import { questionAnswered } from '../helpers'

import { GuessContext } from '../App';


// change data to questions in this file
const Summary = () => {
    const guesses = useContext(GuessContext)

    
    const navigate = useNavigate()
    const [ loading, setLoading ] = useState(false)
    const [ complete, setComplete ] = useState(true)
    const [ people, setPeople] = useState([])
    const [ dupName, setDupName] = useState(false)
    const [ locked, setLocked ] = useState(false)
    
    const [ name, setName ] = useState('')


    const handleSubmit = () => {
        complete ? saveGuesses() : window.alert('Please finish answering all questions before submitting')
    }


    const saveGuesses = async () => {
        if (dupName) return
        if (!name) {
            setDupName(true)
            // handle this shit
            window.alert('You need a')
        }
        setLoading(true)
        try {

            const res = await axios.post('https://p1g54m69yb.execute-api.eu-west-1.amazonaws.com/prod/people', {
                name,
                guesses
            })

            console.log(res)
            
            // need to set cookie to know if this device has submitted answers 
            window.localStorage.setItem('sillyAshes_locked', true)
            
            setLoading(false)
            window.location.reload()
        
        } catch(err) {
            setLoading(false)
            window.alert('Oops. Something went wrong, try again later')
        }
    }


    const checkAllAnswered = () => {
        questions.forEach(q => {
            const result = questionAnswered(q, guesses)
            if (!result) setComplete(false)
        })
    }


    useEffect(() => {
        const match = people.filter(p => p.name === name)
        if (match.length) {
            setDupName(true)
        } else {
            setDupName(false)
        }
    },[name])


    useEffect(() => {
        const res = window.localStorage.getItem('sillyAshes_locked')
        setLocked(res)
    },[])


    const getPeople = async () => {
        try {
            const { data } = await axios('https://p1g54m69yb.execute-api.eu-west-1.amazonaws.com/prod/people')
            setPeople(data.body)
        } catch (err) {
            window.alert('Something went wrong. Please try again later')
        }
    }

  useEffect(() => {
    // get all submitted people so far....
    if (window.localStorage.getItem('sillyAshes_locked')) return
    getPeople()
},[])

    useEffect(() => {
        checkAllAnswered()
    },[guesses])




    const handleSummaryContent = () => {
        if (!complete && !locked) {
            return (
                <Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="body1">
                        Finish answering all questions before submitting
                    </Typography>
                </Box>

            )
        } else if (complete && !locked) {
            return (
                <Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <Typography variant="h6">You have answered all questions</Typography>
                    <hr />
                    <Typography variant="body1">You can review your answered below</Typography>
                    <Typography variant="body2">Once you've submitted you cannot change your answers</Typography>
                    <Typography variant="body2">Fill in your name or a nickname below (please do not use your email)</Typography>
                    <TextField 
                        error={dupName}
                        placeholder='Enter your name or a nickname'
                        fullWidth 
                        sx={{ m: 2}}
                        required    
                        onChange={(e) => setName(e.target.value)}
                        helperText={dupName ? `${name} is already taken` : null}
                    />
                    <Button
                        fullWidth 
                        disabled={dupName}
                        variant="contained" 
                        onClick={handleSubmit}
                        color="primary">
                            Submit Answers
                    </Button>
                </Box>
            )
        } else {
            return (
                <Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    Your answers are locked and submitted
                    <p>Check back after the Ashes to see how you did</p>
                </Box>
            )
        }
    }



    return (
        <>
            {loading ? 
                <Dialog
                open={loading}
                >
                    <DialogContent>
                    <CircularProgress />

                    </DialogContent>
                </Dialog> 
            :null}
            <Toolbar>
                <Typography variant="h5">Summary</Typography>
            </Toolbar>
            <Divider />
            <Toolbar sx={{ p: 3, background: '#add8e680', display: 'flex', justifyContent: 'center' }}>
                {handleSummaryContent()}

            </Toolbar>
            <Divider />
        
            <RadioSummary 
                questions={questions.filter(d => d.roundNum === 1)}
                title="Round 1 - Head to Head"
                roundPath="/head"
            />

            <CheckboxSummary 
                questions={questions.filter(d => d.roundNum === 2)}
                title="Round 2 - Pick 'Em"
                roundPath="/pick"
            />

            <NumberSummary 
                questions={questions.filter(d => d.roundNum === 3)}
                title="Round 3 - Numbers"
                roundPath="/numbers"
            />

            <RadioSummary 
                questions={questions.filter(d => d.roundNum === 4)}
                title="Round 4 - Randoms"
                roundPath="/multi"
            />

            <RadioSummary 
                questions={questions.filter(d => d.roundNum === 5)}
                title="Round 5 - True or False"
                roundPath="/truefalse"
            />

        </>

    )
}


export default Summary