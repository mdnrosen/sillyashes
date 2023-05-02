import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, IconButton, Typography } from '@mui/material'


import data from '../master.json'
import Hundreds from './Hundreds'
import Quack from './Quack'
import FiveWickets from './FiveWickets'
import BigHitters from './BigHitters'
import FullStraight from './FullStraight'
import { GuessContext } from '../App'


const PickEm = ({ setGuesses }) => {
    const guesses = useContext(GuessContext)
    const getRoundQs = () => data.filter(d => d.roundNum === 2)

    const navigate = useNavigate()


    const handlePickem = (selected, questionName) => {
        setGuesses({...guesses, [questionName]: selected })
    }


    
    return (
        <Card sx={{ md: {m: 1} }}>
            <CardHeader
                sx={{ display: 'flex', justifyContent: 'center', background: '#15295e', color: 'white', borderBottom: 1}}
                title={<Typography textAlign="left" variant="h5">Round 2 - Pick 'Em</Typography>}
                subheader={<Typography textAlign="left" variant="overline">Points are different for each question</Typography>}
            />
            <CardContent sx={{ mb: 3}}>
                <Box component="div" >
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
                 
                         {/* <FiveWickets 
                            handlePickem={handlePickem}
                            question={getRoundQs().find(q => q.name === '5fers')}
                        />                        */}
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
            <Divider />
            <CardActions
                sx={{ justifyContent: 'space-between', p: 1}}
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