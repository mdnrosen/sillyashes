import React from 'react'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Typography } from '@mui/material'
import { Help } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

import data from '../master.json'

const TrueFalse = ({ guesses, setGuesses }) => {
    const options = [{ value: true, label: 'True' },{ value: false, label: 'False'}]
    const navigate = useNavigate()
    const questions = data.filter(d => d.round === 'True or False')

    const handleChange = (e) => {
        setGuesses({...guesses, [e.target.name]: e.target.value })
    }

    return (
        <Card>
            <CardHeader
                sx={{ display: 'flex', justifyContent: 'center', background: '#15295e', color: 'white', borderBottom: 1}}
                title={<Typography textAlign="left" variant="h5">True or False</Typography>}
                subheader={<Typography textAlign="left" variant="overline">+5 points for each correct</Typography>}
                action={
                <IconButton 
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
                                    {options.map((opt, i) =>
                                        <FormControlLabel
                                            key={i}
                                            name={q.name}
                                            control={<Radio name={q.name} id={q.num} value={opt.value} />}
                                            label={opt.label}
                                        ></FormControlLabel>   
                                    )}
                                </RadioGroup>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', p: 2}}
            > 
                <Button 
                    variant="outlined"
                    onClick={() => navigate('/pick')}
                >Back</Button>  
                    <Button 
                        variant='contained'
                        onClick={() => navigate('/summary')}
                    >Summary</Button>
            </CardActions>
        </Card>

    )
}

export default TrueFalse