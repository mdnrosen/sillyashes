import React, { useState, useEffect, useContext } from 'react'
import players from '../players.json'
import { getAvatarName, getBGColor } from '../helpers'
import { Box, Checkbox, Chip, Divider, FormControlLabel, FormGroup, Grid, Toolbar, Tooltip, Typography } from '@mui/material'
import QTitle from './QTitle' 
import { GuessContext } from '../App'

const Quack = ({ handlePickem, question }) => {
    const guesses = useContext(GuessContext) 
    const batters = players.filter(pl => pl.batter)
    const [ selected, setSelected ] = useState([])


    const handleChange = (e) => {
        const { value, checked } = e.target
        setSelected(prevState => 
            checked ? [...prevState, e.target.value] : 
            prevState.filter(val => val !== value))
    }

    useEffect(() => {
        handlePickem(selected, 'quack', 12)
    },[selected])

    useEffect(() => {
        setSelected(guesses['quack'])
    },[guesses])


    const isDisabled = (value) => { 
        if (selected.filter(s => s === value).length) {
            return false
        } else if (selected.length > 2) {
            return true
        }
    }


    return (
        <Grid item>
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <QTitle
                    title={question.title}
                    num={question.num}
                    help={question.help}
                />                
                <Typography variant="body1">{question.question}</Typography>
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
                    {batters.map(p =>
                        <Grid item xs={12} sm={6} md={4} lg={3} key={p.id}>
                            <FormGroup
                                onChange={handleChange}
                                max={3}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox 
                                            value={p.name} 
                                            checked={selected.includes(p.name)}
                                            disabled={isDisabled(p.name)}
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



export default Quack