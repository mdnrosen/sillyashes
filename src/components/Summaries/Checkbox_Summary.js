import React, { useContext, useState, useEffect } from 'react'
import { Box, Collapse, Chip, Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, Toolbar, Typography} from '@mui/material'
import { Edit, ExpandLess, ExpandMore } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { questionAnswered } from '../../helpers'
import { GuessContext } from '../../App'

import players from '../../players.json'




const Radio_Summary = ({ questions, title, roundPath }) => {
    const guesses = useContext(GuessContext)
    const [ complete, setComplete ] = useState(true)
    const [ open, setOpen ] = useState(false)

    const navigate = useNavigate()

    const getOptions = (key) => {
        if (key === 'all') {
            return players
        } else {
            return players.filter(p => p[key])
        }

    }

    useEffect(() => {
        // Default state is true, if ONE is false, then it overwrites the compelte state to false
        questions.forEach(q => {
            const result = questionAnswered(q, guesses)
            if (!result) setComplete(false)
        })
    },[guesses])


    console.log('QUESTIONS', questions)


    const renderChosen = (q) => {
        // these are an object so need to be handled separately 
        if (q.name === 'bigHitters' || q.name === 'fullStraight') {
            return (
                <p>Hello dererere</p>
            )
        } else {
            // its an array, so return what was guesses
            // if theres no guesses yet, just reutn a p tag of 'You have nothing here yet'
        }

    
    }



    return (
        <Paper elevation={2}>
            <Box component="div">
                <Toolbar sx={{ p: 1, display: 'flex', justifyContent: 'space-between'}}>
                    <ListItemText 
                        primary={
                            <Typography variant="h6">
                                {title}
                            </Typography>}
                        secondary={
                            <Typography variant="overline" color={complete ? 'green' : 'error'}>
                                {complete ? '√ Completed' : 'X Not Completed'}

                            </Typography>
                        }
                    />
                    <IconButton onClick={() => setOpen(!open)}>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
        
                </Toolbar>

                <Collapse
                    in={open}
                    
                > 
                    <List  >
                        {questions.map(q => 
                            <>
                                <ListItem className="summaryListItem" key={q.name}>
            
                                    <ListItemText 
                                        primary={
                                            <Typography variant="h6">
                                                {`${q.num}. ${q.title}`}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography variant="body2">
                                                {q.question}
                                            </Typography>
                                        }  
                    
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton onClick={() => navigate(roundPath)}>
                                            <Edit />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
            
                            <Toolbar sx={{ p: 1,  display: 'flex', flexWrap: 'wrap' }}>
                            {/* MIGHT NEED TO ADD A SEPARATE CATCH FOR THE BIG HITTERS AND FULL STRAIGHT QUESTIONS */}
                                {renderChosen(q)}
                                {getOptions(q.options).map(opt => { 
                                    const chosen = guesses[q.name] === opt.name


                                    if (q.name === 'bigHitters' || q.name === 'fullStraight') {
                                        return (
                                            <Chip label={q.name}/>
                                        )
                                    } else {
                                        return guesses[q.name].length ?
                                            <p>You haven't completed this question yet</p>
                                            :
                                      
                                            <Chip 
                                                key={opt.value}
                                                variant={chosen ? 'contained' : 'outlined'}
                                                color={chosen ? 'primary' : 'default'}
                                                sx={{ m: 1 }}
                                                label={opt.name} 
            
                                            />
    
                                        
                                    }
                                }
                                )}
                            </Toolbar>
                            <Divider />
                            </>
                        )}  
                    </List>
                    
                </Collapse>
                <Divider />
            </Box>
        </Paper>
    )

}


export default Radio_Summary