import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import QTitle from './QTitle'
import data from '../master.json'
import { GuessContext } from '../App'
const Multis = ({ setGuesses }) => {
    const guesses = useContext(GuessContext)
    const getRoundQs = () => data.filter(d => d.roundNum === 4)



    const navigate = useNavigate()



    const handleChange = (e) => {
        setGuesses({...guesses, [e.target.name]: e.target.value})
    }


    return (
        <Card sx={{ md: {m: 1} }}>
            <CardHeader
                sx={{ display: 'flex', justifyContent: 'center', background: '#15295e', color: 'white', borderBottom: 1}}
                title={<Typography textAlign="left" variant="h5">Randoms</Typography>}
                subheader={<Typography textAlign="left" variant="overline">+5 points for each correct</Typography>}

            />          
            <Divider />

            <CardContent sx={{ mb: 3 }}>
                <Box component="form" onChange={handleChange}>
                    <Grid container spacing={3}>
                        {getRoundQs().map((q, i) =>
                            <Grid key={q.name} item xs={12}>
                                <RadioGroup>
                                    <QTitle
                                        title={q.title}
                                        num={q.num}
                                        help={q.help}
                                    />   
                                    <Typography sx={{ mb: 1}}variant="body1">{q.question}</Typography>
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