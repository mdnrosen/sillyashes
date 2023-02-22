import React, { useState, useEffect } from 'react'
import players from '../players.json'
import { getAvatarName, getBGColor } from '../helpers'
import { Box, Chip, Divider,FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'


const BigHitters = ({ handlePickem, question }) => {
    const battersAus = players.filter(p => p.team === 'Australia')
    const battersEng = players.filter(p => p.team === 'England')
    const [ selected, setSelected ] = useState({})



    const handleChange = (e) => {
        const { value  } = e.target
        setSelected({...selected, [e.target.name]: value})
    }

    useEffect(() => {
        if (!Object.values(selected).length) return
        handlePickem(Object.values(selected), 'bigHitters', 14)
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
                                    label={player}
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
                            <Select label="England" name="engSixes" onChange={handleChange} value={selected.engSixes || ''}>
                                {battersEng.map((b, i) =>
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
                            <Select label="Australia" name="ausSixes" onChange={handleChange} value={selected.ausSixes ?? ''}>
                                {battersAus.map((b, i) =>
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
            <Divider sx={{  mt: 2 }} />
        </Grid>
    )
}

export default BigHitters