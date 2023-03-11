import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Item, List, ListItem, ListItemAvatar, Paper, ListItemIcon, ListItemText, Toolbar, Typography, Stack } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom'
import roundOne from '../One.json'
import roundTwo from '../Two.json'

import One_Summary from './Summaries/One_Summary';
import Two_Summary from './Summaries/Two_Summary';

import { Edit, Close, Check } from '@mui/icons-material'
import data from '../master.json'
import { checkRoundComplete } from '../helpers'

const Summary = ({ guesses }) => {
    return (
        <Card>

            <CardHeader
                sx={{ display: 'flex', justifyContent: 'center', background: '#15295e', color: 'white', borderBottom: 1}}
                title={<Typography textAlign="left" variant="h5">Summary</Typography>}
            />
            <CardContent>
                <Toolbar>
                    if all answers are answered, show the name input and save button
                    <br></br>
                    if not say 'there are some answers missing'
                </Toolbar>
                <One_Summary 
                    round={roundOne} 
                    guesses={guesses} 
                />
                <Two_Summary
                    round={roundTwo}
                    guesses={guesses}
                />
       


            </CardContent>
            <CardActions>
                <Button> Lock Answers</Button>
            </CardActions>
        </Card>
    )
}


export default Summary