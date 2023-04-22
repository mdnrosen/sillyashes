import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, FormControl, IconButton, TextField, Typography  } from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GuessContext } from '../App'
import QTitle from './QTitle'
import data from '../master.json'

const Numbers = ({ setGuesses }) => {
    const guesses = useContext(GuessContext)
    const getRoundQs = () => data.filter(d => d.roundNum === 3)
    const navigate = useNavigate()
    const handleChange = (e) => {
        setGuesses({...guesses, [e.target.name]: e.target.value})
    }

    

    return (
        <Card sx={{ md: { m: 1 }}}>
           <CardHeader
                sx={{ display: 'flex', justifyContent: 'flex-start', background: '#15295e', color: 'white', borderBottom: 1}}
                title={<Typography textAlign="left" variant="h5">Round 3 - Numbers</Typography>}
                subheader={<Typography textAlign="left" variant="overline">+5 points (within 5%), +3 points (within 10%), +1 point (within 15%)</Typography>}
            />
            <Divider />
            <CardContent>
                <Box component="form" onChange={handleChange}>
                    <Grid container spacing={3} >
                        {getRoundQs().map((q, i) =>
                            <Grid item xs={12} sx={{ mb: 2}} key={i}>
                                <FormControl sx={{ width: { xs: '100%', sm: '50%'}}}>
                                    <QTitle
                                        title={q.title}
                                        num={q.num}
                                        help={q.help}
                                    />                                       
                                    <Typography variant="body1">{q.question}</Typography>
                                    <TextField 
                                        margin="normal"
                                        defaultValue={guesses[q.name] ? guesses[q.name] : ''}
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
            <Divider />
            <CardActions
                sx={{ justifyContent: 'space-between', p: 1}}
            >
                <Button 
                    variant='outlined'
                    onClick={() => navigate('/pick')}
                >Back</Button>          
                 <Button 
                    variant='contained'
                    onClick={() => navigate('/multi')}
                >Next</Button>
            </CardActions>
        </Card>
    )
}


export default Numbers