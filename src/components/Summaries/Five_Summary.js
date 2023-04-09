import React, { useContext, useState, useEffect } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box,Button, Chip, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Stack, Toolbar, Typography} from '@mui/material'
import { Edit, ExpandMore } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { roundComplete } from '../../helpers'
import { GuessContext } from '../../App'




const Five_Summary = ({ round }) => {
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
                            
                            secondaryAction={<IconButton onClick={() => navigate('/truefalse')}><Edit /></IconButton>}
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
                            <Stack direction="row" spacing={2} sx={{ p: 2}}>
                                <Chip
                                    variant={guesses[q.name] === 'true' ? 'conatined' : 'outlined'}
                                    color={guesses[q.name] === 'true' ? 'primary' : 'default'}   
                                    label="True"
                                />
                                <Chip
                                    variant={guesses[q.name] === 'false' ? 'conatined' : 'outlined'}
                                    color={guesses[q.name] === 'false' ? 'primary' : 'default'} 
                                    label="False"
                                />
                                    
                            </Stack>
                        </Toolbar>
                            <Divider />
                    </Box>
                )}

            </AccordionDetails>
        </Accordion>
    )
}


export default Five_Summary