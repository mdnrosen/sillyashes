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
    const [ locked, setLocked ] = useState(false)
    
    const [ name, setName ] = useState('')
    const [ submitted, setSubmitted ] = useState(false)


    const handleSubmit = () => {
        complete ? saveGuesses() : window.alert('Please finish answering all questions before submitting')
    }

    const saveGuesses = async () => {
        setLoading(true)
        try {

            const res = await axios.post('http://localhost:7777/add', {
                name,
                guesses
            })
            
            // need to set cookie to know if this device has submitted answers 
            window.localStorage.setItem('sillyAshes_locked', true)
            
            console.log(res)
            setLoading(false)
            window.location.reload()
        
        } catch(err) {
            setLoading(false)
            console.log(err)
        }
    }


    const checkAllAnswered = () => {
        questions.forEach(q => {
            const result = questionAnswered(q, guesses)
            if (!result) setComplete(false)
        })
    }


    useEffect(() => {
        const res = window.localStorage.getItem('sillyAshes_locked')
        setLocked(res)
    },[])

    useEffect(() => {
        checkAllAnswered()
    },[guesses])




    const handleSummaryContent = () => {
        if (!complete && !locked) {
            <Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body1">
                    Finish answering all questions before submitting
                </Typography>
            </Box>
        } else if (complete && !locked) {
            return (
                <Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="body2">Review your answers before submitting</Typography>
                    <Typography variant="body2">Once you've submitted, you cannot change your answers</Typography>
                    <Typography variant="body2">Fill in your name or a nickname below (please do not use your email)</Typography>
                    <TextField 
                        placeholder='Enter your name or a nickname'
                        fullWidth 
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Button
                        fullWidth 
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
                    <p>Current Score: <strong>0</strong></p>
                </Box>
            )
        }
        // 1. Unfinished and unlocked
            // Needs 'please complete anwwers message'

        // 2. Finished and unlocked
            // needs input to complete 

        // 3. Finished and locked
            // Needs input to see other peoples answers maybe, if not, just a thank you
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
                {/* {complete ? 
                    <Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="body2">Review your answers before submitting</Typography>
                        <Typography variant="body2">Once you've submitted, you cannot change your answers</Typography>
                        <Typography variant="body2">Fill in your name or a nickname below (please do not use your email)</Typography>
                        <TextField 
                            placeholder='Enter your name or a nickname'
                            fullWidth 
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Button
                            fullWidth 
                            variant="contained" 
                            onClick={handleSubmit}
                            color="primary">Submit Answers</Button>


                    </Box>
                
                    
                
                : <Typography variant="body1">
                    Finish answering all questions before submitting
                </Typography>
} */}
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