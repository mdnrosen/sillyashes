import React, { useState, useEffect, useContext } from 'react'
import players from '../players.json'
import { Box, Divider, FormControl, InputLabel, Select, MenuItem, Grid, Typography } from '@mui/material'

import { GuessContext } from '../App'

const FullStraight = ({ handlePickem, question }) => {
    const guesses = useContext(GuessContext)
    const bowlersAus = players.filter(p => p.team === 'Australia' && p.bowler)
    const bowlersEng = players.filter(p => p.team === 'England' && p.bowler)
    const [ selected, setSelected ] = useState({})



    const handleChange = (e) => {
        const { value, name  } = e.target
        setSelected({...selected, [name]: value})
    }

    useEffect(() => {
        if (!Object.values(selected).length) return
        handlePickem(selected, 'fullStraight')
    },[selected])


    useEffect(() => {
        setSelected(guesses['fullStraight'])
    },[])


    return (
        <Grid item xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
                <Typography variant="h6"><b>{question.num}. {question.title}</b></Typography>
                <Typography variant="overline">{question.question}</Typography>
                <Typography variant="caption"><i>{question.marks}</i></Typography>

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