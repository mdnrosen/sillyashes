import React, { useState, useEffect, useContext } from 'react'
import players from '../players.json'
import { getAvatarName, getBGColor } from '../helpers'
import { Box, Checkbox, Chip, Divider, FormControlLabel, FormGroup, Grid, Toolbar, Tooltip, Typography, } from '@mui/material'

import { GuessContext } from '../App'




const Hundreds = ({ handlePickem, question }) => {
    const guesses = useContext(GuessContext)
    const [ selected, setSelected ] = useState([])



    const handleChange = (e) => {
        const { value, checked } = e.target
        setSelected(prevState => 
            checked ? [...prevState, e.target.value] : 
            prevState.filter(val => val !== value))
    }


    useEffect(() => {
        handlePickem(selected, 'tons')
    },[selected])


    useEffect(() => {
        setSelected(guesses['tons'])
    },[])




    const renderCheckbox = (name, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <FormGroup
                    onChange={handleChange}
                >
                    <FormControlLabel
                        control={
                            <Checkbox 
                                checked={selected.includes(name)}
                                value={name} 
                            />
                        }
                        label={name}
                    />
                </FormGroup>
            </Grid>
        )
    

    return (
        <Grid item >
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                    <Typography variant="h6"><b>{question.num}. {question.title}</b></Typography>
                    <Typography variant="body1">{question.question}</Typography>
                    <Typography variant="caption"><i>{question.marks}</i></Typography>
                    <Toolbar disableGutters >
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', my: 1 }}>
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
                <Grid container spacing={2} justifyContent="flex-start">
                    {players.filter(p => p.team === 'England').map((p, i) =>
                      renderCheckbox(p.name, i)
                    )}              
                    <Divider />
                    {players.filter(p => p.team === 'Australia').map((p, i) =>
                      renderCheckbox(p.name, i)
                    )}
                </Grid>
            </Box>
            <Divider sx={{ mt: 2 }} />
        </Grid>
    )
}

export default Hundreds