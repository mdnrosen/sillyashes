import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState, useContext } from 'react'
import { Help } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

import round from '../Four.json'

import HelpModal from './HelpModal'
import { GuessContext } from '../App'
const Multis = ({ setGuesses }) => {
    const [ open, setOpen ] = useState(false)
    const guesses = useContext(GuessContext)


    const toggle = () => setOpen(!open)

    const navigate = useNavigate()



    const handleChange = (e) => {
        setGuesses({...guesses, [e.target.name]: e.target.value})
    }


    return (
        <Card sx={{ m: 1}}>
            <HelpModal
                open={open}
                toggle={toggle}
                hints={round.hints}
                roundTitle="Randoms"
            />
            <CardHeader
                sx={{ display: 'flex', justifyContent: 'center', background: '#15295e', color: 'white', borderBottom: 1}}
                title={<Typography textAlign="left" variant="h5">{round.name}</Typography>}
                subheader={<Typography textAlign="left" variant="overline">{round.marking}</Typography>}
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
                        {round.questions.map((q, i) =>
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
                    onClick={() => navigate('/numbers')}
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