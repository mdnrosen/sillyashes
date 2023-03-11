import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box,Button, Chip, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Stack, Toolbar, Typography} from '@mui/material'
import { Edit, ExpandMore } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { roundComplete } from '../../helpers'


const Two_Summary = ({ round, guesses }) => {

    const complete = roundComplete(round.questions, guesses)
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
                            secondaryAction={<IconButton onClick={() => navigate('/pickem')}><Edit /></IconButton>}
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
                                <Stack direction="row" spacing={1}>
                                    {guesses[q.name] ? guesses[q.name].map((guess, i) => 
                                        <Chip
                                            label={guess}
                
                                        ></Chip>
                                    ) : null}
                                </Stack>
                        
                            </Toolbar>
                        <Divider />
                    </Box>
                
                )}
            </AccordionDetails>

        </Accordion>
    )
}


export default Two_Summary