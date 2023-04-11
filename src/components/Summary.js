import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Item, List, ListItem, ListItemAvatar, Paper, ListItemIcon, ListItemText, Toolbar, Typography, Stack, TextField } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom'


import Radio_Summary from './Summaries/Radio_Summary';
import TwoSummary from './Summaries/Two_Summary';
import ThreeSummary from './Summaries/Three_Summary';
import FourSummary from './Summaries/Four_Summary';
import FiveSummary from './Summaries/Five_Summary';

import { Edit, Close, Check } from '@mui/icons-material'
import data from '../master.json'
import { checkRoundComplete } from '../helpers'

const Summary = () => {
    return (
        <>
            {/* <Card>
                <CardHeader
                    sx={{ display: 'flex', justifyContent: 'center', background: '#15295e', color: 'white'}}
                    title={<Typography textAlign="left" variant="h5">Summary</Typography>}
                    subheader={<Typography textAlign="left" variant="overline">Review and submit your answers</Typography>}
                /> 
            </Card> */}
            <Toolbar>
                <Typography variant="h5">Summary</Typography>
            </Toolbar>
            <Divider />
            <Toolbar sx={{ m: 1}}>
                <label>Submit your answers here</label>
                <TextField />
            </Toolbar>
            <Divider />
        
            <Radio_Summary 
                questions={data.filter(d => d.roundNum === 1)}
                title="Round 1 - Head to Head"
                roundPath="/head"

            />
            <Radio_Summary 
                questions={data.filter(d => d.roundNum === 4)}
                title="Round 4 - Randoms"
                roundPath="/multi"

            />
            <Radio_Summary 
                questions={data.filter(d => d.roundNum === 5)}
                title="Round 5 - True or False"
                roundPath="/truefalse"

            />

        </>

    )
}


export default Summary