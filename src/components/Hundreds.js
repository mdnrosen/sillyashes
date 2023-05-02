import React, { useState, useEffect, useContext } from 'react'
import players from '../players.json'
import { getAvatarName, getBGColor, sortByName } from '../helpers'
import { Box, Checkbox, Chip, Divider, FormControlLabel, FormGroup, Grid, Toolbar, Tooltip, Typography, } from '@mui/material'

import { GuessContext } from '../App'
import QTitle from './QTitle'




const Hundreds = ({ handlePickem, question }) => {
    const guesses = useContext(GuessContext)
    const [ selected, setSelected ] = useState([])
    const batters = players.filter(p => p.batter)


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



    const renderCheckbox = (name, id) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
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
                <QTitle
                    title={question.title}
                    num={question.num}
                    help={question.help}
                />

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
                    {sortByName(batters).filter(p => p.team === 'England').map(p =>
                      renderCheckbox(p.name, p.id)
                    )}              
                    <Divider />
                    {sortByName(batters).filter(p => p.team === 'Australia').map(p =>
                      renderCheckbox(p.name, p.id)
                    )}
                </Grid>
            </Box>
            <Divider sx={{ mt: 2 }} />
        </Grid>
    )
}

export default Hundreds