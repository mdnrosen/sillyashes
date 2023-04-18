import React, { useContext, useState, useEffect } from 'react'
import { Box, Collapse, Chip, Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, Toolbar, Typography} from '@mui/material'
import { Edit, ExpandLess, ExpandMore } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { questionAnswered } from '../../helpers'
import { GuessContext } from '../../App'


const Radio_Summary = ({ questions, title, roundPath }) => {
    const guesses = useContext(GuessContext)
    const [ complete, setComplete ] = useState(true)
    const [ open, setOpen ] = useState(false)

    const navigate = useNavigate()


    useEffect(() => {
        // Default state is true, if ONE is false, then it overwrites the compelte state to false
        questions.forEach(q => {
            const result = questionAnswered(q, guesses)
            if (!result) setComplete(false)
        })
    },[guesses, questions])

    const renderChosen = (q) => {
        // these are an object so need to be handled separately 
        if (q.name === 'bigHitters' || q.name === 'fullStraight') {
            
            const arr = Object.values(guesses[q.name])

            return (
                <Toolbar sx={{ p: 1,  display: 'flex', flexWrap: 'wrap' }}>
                    {!arr.length ? <Typography color="error" variant="caption">You need to make a guess</Typography> : 
                        arr.length === 1 ? 
                        <>
                            <Chip     
                                label={arr[0]} 
                                color="primary"
                                sx={{ m: 1 }} 
                            />
                            <Chip     
                                label="Missing a pick"
                                color="error"
                                variant="outlined"
                                sx={{ m: 1 }} 
                            />
                        </>
                        :
                    arr.map(g =>
                            <Chip 
                            label={g} 
                            key={g}
                            color="primary"
                            sx={{ m: 1 }}
                            
                        />
                )}
                </Toolbar>
            )
        } else {
            const arr = guesses[q.name]
            // its an array, so return what was guesses
            return (
                <Toolbar sx={{ p: 1,  display: 'flex', flexWrap: 'wrap' }}>
                    {arr.length ? arr.map(g => 
                        <Chip 
                            label={g} 
                            key={g}
                            color="primary"
                            sx={{ m: 1 }}
                            
                        />
                
                ) : <Typography color="error" variant="caption">You need to make a guess</Typography>}
                </Toolbar>
            )
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
                                {renderChosen(q)}
     
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