import React, { useState, useEffect, useContext } from 'react'
import players from '../players.json'
import { getAvatarName, getBGColor, getRandy, sortByName } from '../helpers'
import { Box, Checkbox, Chip, Divider, FormControlLabel, FormGroup, Grid, Toolbar, Tooltip, Typography, } from '@mui/material'

import { GuessContext } from '../App'
import QTitle from './QTitle'




const FiveWickets = ({ handlePickem, question }) => {
    const guesses = useContext(GuessContext)
    const [ selected, setSelected ] = useState(guesses['5fers'])
    const bowlers = players.filter(p => p.bowler)


    const handleChange = (e) => {
        const { value, checked } = e.target
        setSelected(prevState => 
            checked ? [...prevState, e.target.value] : 
            prevState.filter(val => val !== value))
    }


    useEffect(() => {
        handlePickem(selected, '5fers')
    },[selected])


    // useEffect(() => {
    //     setSelected(guesses['5fers'])
    // },[])



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
                            {selected.map(player => 
                                <Tooltip title={player} key={getRandy()}>
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
                    {sortByName(bowlers).filter(p => p.team === 'England').map(p =>
                      renderCheckbox(p.name, p.id)
                    )}              
                    <Divider />
                    {sortByName(bowlers).filter(p => p.team === 'Australia').map(p =>
                      renderCheckbox(p.name, p.id)
                    )}
                </Grid>
            </Box>
            <Divider sx={{ mt: 2 }} />
        </Grid>
    )
}

export default FiveWickets