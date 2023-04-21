import React, { useState, useContext } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Typography } from '@mui/material'
import { Help } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import HelpModal from './HelpModal'
import data from '../master.json'
import { GuessContext } from '../App'


const TrueFalse = ({ setGuesses }) => {
    const guesses = useContext(GuessContext)
    const [ open, setOpen ] = useState(false)
    const toggle = () => setOpen(!open)
    const getRoundQs = () => data.filter(d => d.roundNum === 5)

    const options = [{ value: true, label: 'True' },{ value: false, label: 'False'}]
    const navigate = useNavigate()

    const handleChange = (e) => {
        setGuesses({...guesses, [e.target.name]: e.target.value })
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
                title={<Typography textAlign="left" variant="h5">True or False</Typography>}
                subheader={<Typography textAlign="left" variant="overline">+5 for each correct</Typography>}
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
                            <Grid key={i} item xs={12}>
                                <RadioGroup>
                                    <Typography variant="h6"><b>{q.num}. {q.title}</b></Typography>
                                    <Typography sx={{ mb: 1}}variant="body1">{q.question}</Typography>
                                    {q.options.map((opt, i) =>
                                        <FormControlLabel
                                            key={i}
                                            name={q.name}
                                            control={
                                                <Radio 
                                                checked={guesses[q.name] && opt.value.toString() === guesses[q.name]}
                                                name={q.name} 
                                                    id={q.num.toString()} 
                                                    value={opt.value} 
                                                />}
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
            <CardActions sx={{ justifyContent: 'space-between', p: 1}}
            > 
                <Button 
                    variant="outlined"
                    onClick={() => navigate('/multi')}
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