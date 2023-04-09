import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState, useContext } from 'react'
import { Help } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'


import data from '../master.json'
import HelpModal from './HelpModal'
import { GuessContext } from '../App'
const Multis = ({ setGuesses }) => {
    const [ open, setOpen ] = useState(false)
    const guesses = useContext(GuessContext)
    const getRoundQs = () => data.filter(d => d.roundNum === 4)


    const toggle = () => setOpen(!open)

    const navigate = useNavigate()



    const handleChange = (e) => {
        setGuesses({...guesses, [e.target.name]: e.target.value})
    }


    return (
        <Card sx={{ md: {m: 1} }}>
            <HelpModal
                open={open}
                toggle={toggle}
                questions={getRoundQs().filter(q => q.help)}
            />
            <CardHeader
                sx={{ display: 'flex', justifyContent: 'center', background: '#15295e', color: 'white', borderBottom: 1}}
                title={<Typography textAlign="left" variant="h5">Randoms</Typography>}
                subheader={<Typography textAlign="left" variant="overline">+5 points for each correct</Typography>}
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
                        {getRoundQs().map((q, i) =>
                            <Grid key={q.name} item xs={12}>
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
                                                    value={opt.value.toString()} 
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
            <Divider />
            <CardActions sx={{ justifyContent: 'space-between', p: 1}}>

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