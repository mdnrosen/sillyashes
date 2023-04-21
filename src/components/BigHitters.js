import React, { useState, useEffect, useContext } from 'react'
import players from '../players.json'
import { Box, Divider,FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { GuessContext } from '../App'

const BigHitters = ({ handlePickem, question }) => {
    const guesses = useContext(GuessContext)
    const battersAus = players.filter(p => p.team === 'Australia')
    const battersEng = players.filter(p => p.team === 'England')
    const [ selected, setSelected ] = useState({})



    const handleChange = (e) => {
        const { value, name  } = e.target
        setSelected({...selected, [name]: value})
    }

    useEffect(() => {
        if (!Object.values(selected).length) return
        handlePickem(selected, 'bigHitters')
    },[selected])


    useEffect(() => {
        setSelected(guesses['bigHitters'])
    },[])

    return (
        <Grid item xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
                <Typography variant="h6"><b>{question.num}. {question.title}</b></Typography>
                <Typography variant="body2">{question.question}</Typography>
                <Typography variant="caption"><i>{question.marks}</i></Typography>
                
                <Grid container spacing={2} sx={{ mt: 1}}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>England</InputLabel>
                            <Select label="England" name="engSixes" onChange={handleChange} value={selected.engSixes|| ''}>
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
                            <Select label="Australia" name="ausSixes" onChange={handleChange} value={selected.ausSixes || ''}>
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