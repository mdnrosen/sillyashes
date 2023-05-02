import { Box, Divider, Toolbar, Typography, TextField, Button } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import axios  from 'axios'


import RadioSummary from './Summaries/Radio_Summary';
import CheckboxSummary from './Summaries/Checkbox_Summary'
import NumberSummary from './Summaries/NumberSummary'
import questions from '../master.json'
import { questionAnswered } from '../helpers'

import { GuessContext } from '../App';


// change data to questions in this file
const Summary = () => {
    const guesses = useContext(GuessContext)
    const [ complete, setComplete ] = useState(true)
    const [ name, setName ] = useState('')
    const [ submitted, setSubmitted ] = useState(false)


    const handleSubmit = () => {
        complete ? saveGuesses() : window.alert('Please finish answering all questions before submitting')
    }

    const saveGuesses = async () => {
        try {
            const res = await axios.post('http://localhost:7777/add', {
                name,
                guesses
            })

            // need to set cookie to know if this device has submitted answers 
            window.localStorage.setItem('YYESYESYESY', true)
            
            console.log(res)
            window.alert(`Answers submitted for ${name}`)
        
        } catch(err) {
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
        checkAllAnswered()
    },[guesses])


    return (
        <>
            <Toolbar>
                <Typography variant="h5">Summary</Typography>
            </Toolbar>
            <Divider />
            <Toolbar sx={{ p: 3, background: '#add8e680', display: 'flex', justifyContent: 'center' }}>
                {complete ? 
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
}
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