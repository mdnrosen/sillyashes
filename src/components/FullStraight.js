import React, { useState, useEffect, useContext } from 'react'
import players from '../players.json'
import { getAvatarName, getBGColor } from '../helpers'
import { Box, Checkbox, Chip, Divider, FormControlLabel, FormControl, InputLabel, Select, MenuItem, FormGroup, Grid, Radio, RadioGroup, Toolbar, Tooltip, Typography } from '@mui/material'

import { GuessContext } from '../App'
const FullStraight = ({ handlePickem, question }) => {
    
    const bowlersAus = players.filter(p => p.team === 'Australia' && p.bowler)
    const bowlersEng = players.filter(p => p.team === 'England' && p.bowler)
    const [ selected, setSelected ] = useState({})



    const handleChange = (e) => {
        const { value  } = e.target
        setSelected({...selected, [e.target.name]: value})
    }

    useEffect(() => {
        if (!Object.values(selected).length) return
        handlePickem(Object.values(selected), 'fullStraight', 15)
    },[selected])



    return (
        <Grid item xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
                <Typography variant="h6"><b>{question.num}. {question.title}</b></Typography>
                <Typography variant="overline">{question.question}</Typography>
                <Typography variant="caption"><i>{question.explainer}</i></Typography>
                {/* <Toolbar disableGutters >
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', my: 1}}>
                        {Object.values(selected).map((player, i) => 
                            <Tooltip title={player} key={i}>
                                <Chip
                                    label={getAvatarName(player)}
                                    sx={{ m: 0.5, color: 'white',   bgcolor: getBGColor(player, players)}}
                                >    
                                </Chip>
                            </Tooltip>
                        )}
                    </Box>
                    
                </Toolbar> */}
                <Grid container spacing={2} sx={{ mt: 1}}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>England</InputLabel>
                            <Select label="England" name="engFS" onChange={handleChange} value={selected.engFS || ''}>
                                {bowlersEng.map((b, i) =>
                                    <MenuItem
                                        key={i}
                                        value={b.name}

                                    >
                                        {b.name}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>                       
                    </Grid>                   
                     <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Australia</InputLabel>
                            <Select label="Australia" name="ausFS" onChange={handleChange} value={selected.ausFS || ''}>
                                {bowlersAus.map((b, i) =>
                                    <MenuItem
                                        key={i}
                                        value={b.name}

                                    >
                                        {b.name}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>                        
                    </Grid>

                </Grid>
            </Box>
            <Divider sx={{ width: '100%', mt: 2 }} />
        </Grid>
    )
}

export default FullStraight