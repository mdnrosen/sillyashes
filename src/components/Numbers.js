import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, FormControl, IconButton, TextField, Typography  } from '@mui/material'
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import HelpModal from './HelpModal'
import { Help } from '@mui/icons-material'
import { GuessContext } from '../App'
import data from '../master.json'

const Numbers = ({ setGuesses }) => {
    const [ open, setOpen ] = useState(false)
    const guesses = useContext(GuessContext)
    const toggle = () => setOpen(!open)
    const getRoundQs = () => data.filter(d => d.roundNum === 3)
    const navigate = useNavigate()
    const handleChange = (e) => {
        setGuesses({...guesses, [e.target.name]: e.target.value})
    }

    

    return (
        <Card sx={{ md: { m: 1 }}}>
            <HelpModal 
                open={open}
                toggle={toggle}
                questions={getRoundQs().filter(q => q.help)}
            />
           <CardHeader
                sx={{ display: 'flex', justifyContent: 'flex-start', background: '#15295e', color: 'white', borderBottom: 1}}
                title={<Typography textAlign="left" variant="h5">Round 3 - Numbers</Typography>}
                subheader={<Typography textAlign="left" variant="overline">+5 points (within 5%), +3 points (within 10%), +1 point (within 15%)</Typography>}
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
                    <Grid container spacing={3} >
                        {getRoundQs().map((q, i) =>
                            <Grid item xs={12} sx={{ mb: 2}} key={i}>
                                <FormControl sx={{ width: { xs: '100%', sm: '50%'}}}>
                                    <Typography variant="h6"><b>{q.num}. {q.title}</b></Typography>
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