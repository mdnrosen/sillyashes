import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Help } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

// import data from '../master.json'

import round from '../One.json'
import HelpModal from './HelpModal'


const HeadtoHead = ({ guesses, setGuesses, setProgress }) => {
    const [ open, setOpen ] = useState(false)


    const toggle = () => setOpen(!open)
    const navigate = useNavigate()
    const handleChange = (e) => {
       setGuesses({...guesses, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        setProgress(0)
    })
    


    return (
        <Card sx={{ md: {m: 1} }}>
            <HelpModal
                open={open}
                toggle={toggle}
                hints={round.hints}
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
            <CardActions
                sx={{ justifyContent: 'flex-end', p: 2}}
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