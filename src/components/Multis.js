import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Help } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

import data from '../master.json'
import round from '../multis.json'

import HelpModal from './HelpModal'

const Multis = ({ guesses, setGuesses }) => {
    const [ open, setOpen ] = useState(false)

    const questions = data.filter(d => d.round === 'Multis')
    const navigate = useNavigate()
    const handleChange = (e) => {

        setGuesses({...guesses, [e.target.name]: e.target.value})

    }

    const toggle = () => setOpen(!open)

    return (
        <Card sx={{ m: 1}}>
            <HelpModal
                open={open}
                toggle={toggle}
                data={data.filter(d => d.round === 'Multis')}
                roundTitle="Randoms"
            />
            <CardHeader
                sx={{ display: 'flex', justifyContent: 'center', background: '#15295e', color: 'white', borderBottom: 1}}
                title={<Typography textAlign="left" variant="h5">Round 4 - Randoms</Typography>}
                subheader={<Typography textAlign="left" variant="overline">+5 points for each correct answer</Typography>}
                action={
                <IconButton 
                    onClick={() => toggle()}
                    sx={{ color: 'white'}}>
                        <Help />
                </IconButton>
                }
            />          
            <Divider />

            <CardContent>
                <Box component="form" onChange={handleChange}>
                    <Grid container spacing={3}>
                        {questions.map((q, i) =>
                            <Grid key={i} item xs={12}>
                                <RadioGroup>
                                    <Typography variant="h6"><b>{q.num}. {q.title}</b></Typography>
                                    <Typography variant="overline">{q.question}</Typography>
                                    {q.options.map((opt, i) =>
                                        <FormControlLabel
                                            key={i}
                                            name={q.name}
                                            control={
                                                <Radio 
                                                    id={q.num} 
                                                    value={opt.value} 
                                                    checked={guesses[q.name] && guesses[q.name].includes(opt.value)}
                                                />
                                            }
                                            label={opt.label}
                                        ></FormControlLabel>   
                                    )}
                                </RadioGroup>
                            </Grid> 
                        )}
                    </Grid>
                </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', p: 2}}>

                <Button 
                    variant='outlined'
                    onClick={() => navigate('/pick')}
                >Back</Button>                
                <Button 
                    variant='contained'
                    onClick={() => navigate('/truefalse')}
                >Next</Button>
            </CardActions>
        </Card>
    )
}


export default Multis