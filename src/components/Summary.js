import { Divider, Toolbar, Typography, TextField } from '@mui/material'
import React from 'react'



import RadioSummary from './Summaries/Radio_Summary';
import CheckboxSummary from './Summaries/Checkbox_Summary'
import NumberSummary from './Summaries/NumberSummary'
import data from '../master.json'

const Summary = () => {
    return (
        <>
            <Toolbar>
                <Typography variant="h5">Summary</Typography>
            </Toolbar>
            <Divider />
            <Toolbar sx={{ p: 3}}>
                <label>Submit your answers here</label>
                <TextField />
            </Toolbar>
            <Divider />
        
            <RadioSummary 
                questions={data.filter(d => d.roundNum === 1)}
                title="Round 1 - Head to Head"
                roundPath="/head"
            />

            <CheckboxSummary 
                questions={data.filter(d => d.roundNum === 2)}
                title="Round 2 - Pick 'Em"
                roundPath="/pick"
            />

            <NumberSummary 
                questions={data.filter(d => d.roundNum === 3)}
                title="Round 3 - Numbers"
                roundPath="/numbers"
            />

            <RadioSummary 
                questions={data.filter(d => d.roundNum === 4)}
                title="Round 4 - Randoms"
                roundPath="/multi"
            />

            <RadioSummary 
                questions={data.filter(d => d.roundNum === 5)}
                title="Round 5 - True or False"
                roundPath="/truefalse"
            />

        </>

    )
}


export default Summary