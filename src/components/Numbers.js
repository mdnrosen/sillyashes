import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, FormControl,FormGroup, FormLabel, IconButton, TextField, Tooltip, Typography  } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HelpModal from './HelpModal'
import { Help } from '@mui/icons-material'

import round from '../Three.json'

const Numbers = ({ guesses, setGuesses }) => {
    const [ open, setOpen ] = useState(false)
    const toggle = () => setOpen(!open)

    const navigate = useNavigate()



    const handleChange = (e) => {
        setGuesses({...guesses, [e.target.name]: e.target.value})
    }

    return (
        <Card sx={{ md: { m: 1 }}}>
            <HelpModal 
                open={open}
                toggle={toggle}
                hints={round.hints}
            />
           <CardHeader
                sx={{ display: 'flex', justifyContent: 'flex-start', background: '#15295e', color: 'white', borderBottom: 1}}
                title={<Typography textAlign="left" variant="h5">{round.name}</Typography>}
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
                        {round.questions.map((q, i) =>
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
                    onClick={() => navigate('/multis')}
                >Next</Button>
            </CardActions>
        </Card>
    )
}


export default Numbers