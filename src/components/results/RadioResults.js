import React, { useState, useEffect } from 'react'
import { Chip, Paper, Divider, Box, Toolbar, IconButton, ListItem, ListItemText, ListItemSecondaryAction, Typography, Collapse, List } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'


const RadioResults = ({ questions, title, guesses }) => {
    const [ score, setScore ] = useState(0)
    const [open, setOpen] = useState(false)



    const mark = () => {

        const points = questions
            .map(q => {
                return guesses[q.name] === q.answer ? 5 : 0
            })
            .reduce((cv, pv) => cv + pv)

            setScore(points)
    }

    useEffect(() => {
        mark()
    },[guesses])


    return (
        <Paper elevation={1} sx={{ my: 1}}>
            <Box component="div">
                <Toolbar sx={{ p: 1, display: 'flex', justifyContent: 'space-between'}}>
                    <ListItemText 
                        primary={
                            <Typography variant="h6">{title}</Typography>
                        } 
                        secondary={
                            <Typography color="primary" variant="overline">{`ROUND SCORE: ${score}`}</Typography>
                        }
                    />
                    <IconButton onClick={() => setOpen(!open)}>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </Toolbar>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List>
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
                                        {guesses[q.name] === q.answer ? 
                                            <Typography color="green" variant="h6">+5</Typography>
                                            :
                                            <Typography color="red" variant="h6">0</Typography>
                                        }
                                        
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Toolbar sx={{ p: 1,  display: 'flex', flexWrap: 'wrap' }}>
                                    {q.options.map((opt, i) => {
                                        const chosen = guesses[q.name] === opt.value
                                        const correct = q.answer === opt.value
                                        return (
                                            <Chip 
                                                key={`${i}${q.name}`}
                                                variant={chosen ? 'contained' : 'outlined'}
                                                color={correct ? 'success' : 'error'}
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

            </Box>

        </Paper> 
    )
}


export default RadioResults