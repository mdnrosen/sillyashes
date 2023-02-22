import React, { useState, useEffect } from 'react'
import players from '../players.json'
import { getAvatarName, getBGColor } from '../helpers'
import { Box, Checkbox, Chip, Divider, FormControlLabel, FormGroup, Grid, Toolbar, Tooltip, Typography } from '@mui/material'


const FiveWickets = ({ handlePickem, question }) => {
    const bowlers = players.filter(p => p.bowler)
    const [ selected, setSelected ] = useState([])



    const handleChange = (e) => {
        const { value, checked } = e.target
        setSelected(prevState => 
            checked ? [...prevState, e.target.value] : 
            prevState.filter(val => val !== value))
    }

    useEffect(() => {
        if (!selected.length) return
        handlePickem(selected, 'tenWickets', 13)
    },[selected])



    return (
        <Grid item >
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h6"><b>{question.num}. {question.title}</b></Typography>
                <Typography variant="overline">{question.question}</Typography>
                <Typography variant="caption"><i>{question.explainer}</i></Typography>
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
                    {bowlers.reverse().map((p, i) =>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={i}>
                            <FormGroup
                                onChange={handleChange}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox value={p.name} />
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