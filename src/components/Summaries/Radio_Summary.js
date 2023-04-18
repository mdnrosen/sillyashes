import React, { useContext, useState, useEffect } from 'react'
import { Box, Chip, Collapse, Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, Toolbar, Typography} from '@mui/material'
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
                                {q.options.map((opt, i) => {
                                    const chosen = guesses[q.name] === opt.value
                                    return (
                                        <Chip 
                                            key={`${i}${q.name}`}
                                            variant={chosen ? 'contained' : 'outlined'}
                                            color={chosen ? 'primary' : 'default'}
                                            sx={{ m: 1 }}
                                            label={opt.label} 
                                        />
                                    )}
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