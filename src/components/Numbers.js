import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, FormControl,FormGroup, FormLabel, TextField, Tooltip, Typography  } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import data from '../master.json'


const Numbers = ({ guesses, setGuesses }) => {
    const navigate = useNavigate()
    const questions = data.filter(d => d.round === 'Numbers')
    const handleChange = (e) => {

        setGuesses({...guesses, [e.target.name]: e.target.value})

    }

    return (
        <Card sx={{ md: { m: 1 }}}>
           <CardHeader
                sx={{ display: 'flex', justifyContent: 'flex-start', background: '#15295e', color: 'white', borderBottom: 1}}
                title={<Typography textAlign="left" variant="h5">Round 2 - Numbers</Typography>}
                subheader={<Typography textAlign="left" variant="overline">+5 points (within 5%), +3 points (within 10%), +1 point (within 15%)</Typography>}
            />
            <Divider />
            <CardContent>
                <Box component="form" onChange={handleChange}>
                    <Grid container spacing={3} >
                        {questions.map((q, i) =>
                            <Grid item xs={12} sx={{ mb: 2}} key={i}>
                                <FormControl sx={{ width: { xs: '100%', sm: '50%'}}}>
                                    <Typography variant="h6"><b>{q.num}. {q.title}</b></Typography>
                                    <Typography variant="overline">{q.question}</Typography>
                                    <TextField 
                                        value={guesses[q.name] ? guesses[q.name] : ''}
                                        name={q.name} 
                                        id={q.num.toString()} 
                                        type="number" 
                                        variant="outlined" />
                                </FormControl>
                            </Grid>
                            
                        )}
                    </Grid>
                </Box>
            </CardContent>
            <CardActions
                sx={{ justifyContent: 'flex-end', p: 2}}
            >
                <Button 
                    variant='outlined'
                    onClick={() => navigate('/head')}
                >Back</Button>          
                 <Button 
                    variant='contained'
                    onClick={() => navigate('/pick')}
                >Next</Button>
            </CardActions>
        </Card>
    )
}


export default Numbers