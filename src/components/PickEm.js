import React, { useState, useContext, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material'
import { Help } from '@mui/icons-material'


import data from '../master.json'
import Hundreds from './Hundreds'
import Quack from './Quack'
import FiveWickets from './FiveWickets'
import BigHitters from './BigHitters'
import FullStraight from './FullStraight'
import HelpModal from './HelpModal'
import { GuessContext } from '../App'


const PickEm = ({ setGuesses }) => {
    const guesses = useContext(GuessContext)
    const getRoundQs = () => data.filter(d => d.roundNum === 2)

    const [ open, setOpen ] = useState(false)
    const toggle = () => setOpen(!open)

    const navigate = useNavigate()


    const handlePickem = useCallback((selected, questionName) => {
        setGuesses({...guesses, [questionName]: selected })
    },[])

    



    return (
        <Card>  
            <HelpModal
                open={open}
                toggle={toggle}
                questions={getRoundQs().filter(q => q.help)}
            />
            <CardHeader
                sx={{ display: 'flex', justifyContent: 'center', background: '#15295e', color: 'white', borderBottom: 1}}
                title={<Typography textAlign="left" variant="h5">Round 2 - Pick 'Em</Typography>}
                subheader={<Typography textAlign="left" variant="overline">Points are different for each question</Typography>}
                action={
                <IconButton 
                    onClick={() => toggle()}
                    sx={{ color: 'white'}}>
                        <Help />
                </IconButton>
                }
            />
            <CardContent>
                <Box component="form" >
                    <Grid container spacing={3}>
                        <Hundreds 
                            handlePickem={handlePickem}
                            question={getRoundQs().find(q => q.name === 'tons')}
                        />    
                        <Quack 
                            handlePickem={handlePickem}
                            question={getRoundQs().find(q => q.name === 'quack')}
                        />      
                 
                         <FiveWickets 
                            handlePickem={handlePickem}
                            question={getRoundQs().find(q => q.name === '5fers')}
                        />                       
                        <BigHitters 
                            handlePickem={handlePickem}
                            question={getRoundQs().find(q => q.name === 'bigHitters')}

                        />                      
                        <FullStraight 
                            handlePickem={handlePickem}
                            question={getRoundQs().find(q => q.name === 'fullStraight')}

                        />

                    </Grid>
                </Box>
            </CardContent>
            <CardActions
                sx={{ justifyContent: 'flex-end', p: 2}}
            >
                <Button 
                    variant="outlined"
                    onClick={() => navigate('/head')}
                >Back</Button>  
                <Button 
                    variant='contained'
                    onClick={() => navigate('/numbers')}
                >Next</Button>
                

            </CardActions>
        </Card>
    )
}



export default PickEm