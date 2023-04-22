import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import data from '../master.json'

import { GuessContext } from '../App'
import QTitle from './QTitle'

const HeadtoHead = ({ setGuesses }) => {
    const guesses = useContext(GuessContext)
    const getRoundQs = () => data.filter(d => d.roundNum === 1)
    const navigate = useNavigate()



    const handleChange = (e) => {
       setGuesses({...guesses, [e.target.name]: e.target.value})
    }


    return (
        <Card sx={{ md: {my: 1} }}>
            <CardHeader
                sx={{ display: 'flex', justifyContent: 'center', background: '#15295e', color: 'white', borderBottom: 1}}
                title={<Typography textAlign="left" variant="h5">Head to Head</Typography>}
                subheader={<Typography textAlign="left" variant="overline">+5 points for each correct</Typography>}
            />          
            <Divider />

            <CardContent sx={{ mb: 3 }}>
                <Box component="form" onChange={handleChange}>
                    <Grid container spacing={3}>
                        {getRoundQs().map((q, i) =>
                            <Grid key={i} item xs={12}>
                                <RadioGroup sx={{ mb: 1}}> 
                                    <QTitle
                                        title={q.title}
                                        num={q.num}
                                        help={q.help}
                                    />   
                                    <Typography variant="body2">{q.question}</Typography>
                                    {q.options.map((opt, i) => {
                                        return (
                                            
                                        <FormControlLabel
                                            key={i}
                                            name={q.name}
                                            control={
                                                <Radio
                                                    id={q.num.toString()} 
                                                    value={opt.value} 
                                                    checked={guesses[q.name] && opt.value === guesses[q.name]}
                                                />
                                            }
                                            label={opt.label}
                                        /> 
                                        ) 
                                    })}
                                </RadioGroup>

                            </Grid>
                            
                        )}
                    </Grid>
                </Box>
            </CardContent>
            <Divider />
            <CardActions
                sx={{ justifyContent: 'flex-end', p: 1}}
            >
                <Button 
                    variant='contained'
                    onClick={() => navigate('/pick')}
                >Next</Button>
            </CardActions>

        </Card>
    )
}


export default HeadtoHead