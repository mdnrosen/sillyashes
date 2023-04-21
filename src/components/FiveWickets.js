import React, { useState, useEffect, useContext } from 'react'
import players from '../players.json'
import { getAvatarName, getBGColor } from '../helpers'
import { Box, Checkbox, Chip, Divider, FormControlLabel, FormGroup, Grid, Toolbar, Tooltip, Typography } from '@mui/material'

import { GuessContext } from '../App'


const FiveWickets = ({ handlePickem, question }) => {
    const guesses = useContext(GuessContext)
    const bowlers = players.filter(p => p.bowler)
    const [ selected, setSelected ] = useState([])



    const handleChange = (e) => {
        const { value, checked } = e.target
        setSelected(prevState => 
            checked ? [...prevState, e.target.value] : 
            prevState.filter(val => val !== value))
    }

    useEffect(() => {
        handlePickem(selected, '5fers')
    },[selected])


    useEffect(() => {
        setSelected(guesses['5fers'])
    },[])


    return (
        <Grid item >
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h6"><b>{question.num}. {question.title}</b></Typography>
                <Typography variant="body2">{question.question}</Typography>
                <Typography variant="caption"><i>{question.marks}</i></Typography>
                <Toolbar disableGutters >
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', my: 1}}>
                        {selected.map((player, i) => 
                            <Tooltip title={player} key={i}>
                                <Chip
                                    label={getAvatarName(player)}
                                    sx={{ m: 0.5, color: 'white',   bgcolor: getBGColor(player, players)}}
                                >
                                        
                                </Chip>
                            </Tooltip>
                        )}
                    </Box>
                    
                </Toolbar>
                <Grid container spacing={2}>
                    {bowlers.map((p, i) =>
                        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                            <FormGroup
                                onChange={handleChange}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox 
                                            value={p.name} 
                                            checked={selected.includes(p.name)}    
                                        />
                                    }
                                    label={p.name}
                                />
                            </FormGroup>
                        </Grid>
                    )}
                </Grid>
            </Box>
            <Divider sx={{ mt: 2 }} />
        </Grid>
    )
}

export default FiveWickets