import React, { useContext, useState, useEffect } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box,Button, Chip, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Stack, Toolbar, Typography} from '@mui/material'
import { Edit, ExpandMore } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { roundComplete } from '../../helpers'
import { GuessContext } from '../../App'




const One_Summary = ({ round }) => {
    const guesses = useContext(GuessContext)
    const [ complete, setComplete ] = useState(false)
    
    useEffect(() => {
        setComplete(roundComplete(round.questions, guesses))
    },[guesses])


    const navigate = useNavigate()

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore />}
            >
                <Typography variant="h6" style={{ width: '33%'}}>{round.name}</Typography>
                <Typography variant="overline" style={{ color: complete ? 'green' : 'red'}}>
                    {complete ? 
                       'Complete'
                        :
                        'Not Complete'
                
                    }
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {round.questions.map((q, i) =>
                    <Box key={i}>
                        <ListItem
                            
                            secondaryAction={<IconButton onClick={() => navigate('/head')}><Edit /></IconButton>}
                        >
                            <ListItemIcon>
                                <Typography variant="h6">{`Q${q.num}`}</Typography>
                            </ListItemIcon>
                            <ListItemText 
                                primary={<Typography variant="h6">{q.title}</Typography>}
                                secondary={<Typography variant="overline">{q.question}</Typography>}
                            />
                        </ListItem>
                        <Toolbar>
                            <Stack direction="row" spacing={2}>
                                {q.options.map((opt, i) => 
                                    <Chip
                                        key={i + q.name}
                                        label={opt.value}
                                        variant={opt.value === guesses[q.name] ? 'conatined' : 'outlined'}
                                        color={opt.value === guesses[q.name] ? 'primary' : 'default'}

                                    // sx={{ opacity: {opt.value === guesses[q.name] ? 1 : 0}}}
                                    >

                                    </Chip>
                                    // <Button
                                    //     key={i}
                                    //     size="small"
                                    //     sx={{ color: 'white'}}
                                    //     disabled={opt.value !== guesses[q.name]}
                                    //     variant={opt.value === guesses[q.name] ? 'contained' : 'outlined'}
                                        
                                    // >{opt.label}</Button>
                                )}
                            </Stack>
                        </Toolbar>
                            <Divider />
                    </Box>
                )}

            </AccordionDetails>
        </Accordion>
    )
}


export default One_Summary