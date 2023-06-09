import React, { useState, useEffect, useContext } from 'react'
import players from '../players.json'
import { Box, FormControl, InputLabel, Select, MenuItem, Grid, Typography } from '@mui/material'
import { GuessContext } from '../App'
import QTitle from './QTitle'
import { sortByName } from '../helpers'
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
                <QTitle
                    title={question.title}
                    num={question.num}
                    help={question.help}
                />                   <Typography variant="body2">{question.question}</Typography>
                <Typography variant="caption"><i>{question.marks}</i></Typography>

                <Grid container spacing={2} sx={{ mt: 1}}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>England</InputLabel>
                            <Select label="England" name="engFS" onChange={handleChange} value={selected.engFS || ''}>
                                {sortByName(bowlersEng).map((b, i) =>
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
                                {sortByName(bowlersAus).map((b, i) =>
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
        </Grid>
    )
}

export default FullStraight