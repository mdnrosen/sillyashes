import { Divider, Toolbar, Typography, TextField } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'



import RadioSummary from './Summaries/Radio_Summary';
import CheckboxSummary from './Summaries/Checkbox_Summary'
import NumberSummary from './Summaries/NumberSummary'
import questions from '../master.json'
import { questionAnswered } from '../helpers'

import { GuessContext } from '../App';


// change data to questions in this file
const Summary = () => {
    const guesses = useContext(GuessContext)
    const [complete, setComplete] = useState(true)


    useEffect(() => {
        questions.forEach(q => {
            const result = questionAnswered(q, guesses)
            if (!result) setComplete(false)
        })
    },[guesses])


    return (
        <>
            <Toolbar>
                <Typography variant="h5">Summary</Typography>
            </Toolbar>
            <Divider />
            <Toolbar sx={{ p: 3, background: '#add8e680', display: 'flex', justifyContent: 'center' }}>
                {complete ? 
                
                    
                <TextField />
                
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