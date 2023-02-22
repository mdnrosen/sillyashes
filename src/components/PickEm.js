import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material'
import { Help } from '@mui/icons-material'


import round from '../Two.json'
import Hundreds from './Hundreds'
import Quack from './Quack'
import FiveWickets from './FiveWickets'
import BigHitters from './BigHitters'
import FullStraight from './FullStraight'
import HelpModal from './HelpModal'


const PickEm = ({ guesses, setGuesses }) => {
    const [ open, setOpen ] = useState(false)
    const toggle = () => setOpen(!open)

    const navigate = useNavigate()
    const handlePickem = (selected, questionName) => {

        setGuesses({...guesses, [questionName]: selected })
    }



    return (
        <Card>
            <HelpModal
                open={open}
                toggle={toggle}
                hints={round.hints}
            />
            <CardHeader
                sx={{ display: 'flex', justifyContent: 'center', background: '#15295e', color: 'white', borderBottom: 1}}
                title={<Typography textAlign="left" variant="h5">{round.name}</Typography>}
                subheader={<Typography textAlign="left" variant="overline">{round.marking}</Typography>}
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
                            question={round.questions.find(q => q.name === 'tons')}
                        />    
                        <Quack 
                            handlePickem={handlePickem}
                            question={round.questions.find(q => q.name === 'quack')}
                        />      
                 
                         <FiveWickets 
                            handlePickem={handlePickem}
                            question={round.questions.find(q => q.name === '5fers')}
                        />                       
                        <BigHitters 
                            handlePickem={handlePickem}
                            question={round.questions.find(q => q.name === 'bigHitters')}

                        />                      
                        <FullStraight 
                            handlePickem={handlePickem}
                            question={round.questions.find(q => q.name === 'fullStraight')}

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