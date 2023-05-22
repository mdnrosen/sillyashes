import React, { useContext } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Button, IconButton, ListItemIcon, Stack, Toolbar, ListItem, ListItemText, Typography } from '@mui/material'
import { ExpandMore, Close, Check } from '@mui/icons-material'
import { GuessContext } from '../../App'
const H2H_Results = ({ q }) => {
    const guesses = useContext(GuessContext)
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore />}
            >
                <Typography variant="h5">Head to head</Typography>
            </AccordionSummary>
                <AccordionDetails>
                    <ListItem
                        secondaryAction={
                            <Stack direction="row">
                                {guesses[q.name] === q.answer ?
                                    <>
                                        <IconButton
                                            disableFocusRipple
                                        >
                                            <Close color="danger" />
                                        </IconButton>
                                        <Button>
                                            0 pts
                                        </Button>
                                    </>
                                    :
                                    <>
                                        <IconButton 
                                            disableFocusRipple
                                        >
                                            <Check color="success" />
                                        </IconButton>
                                        <Button>
                                            +5 pts
                                        </Button>
                                    </>                      
                                }           
                            </Stack>
                        }>
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
                            {/* {q.options.map((opt, i) =>
                                <Button
                                    size="small"
                                    sx={{ color: 'white'}}
                                    color={opt.team === 'aus' ? 'australia' : 'england'}
                                    disabled={opt.value !== guesses[q.name]}
                                    variant={opt.value === guesses[q.name] ? 'contained' : 'outlined'}
                                    
                                >{opt.label}</Button>
                            )} */}
                        </Stack>
                    </Toolbar>
                </AccordionDetails>
        </Accordion>
    )
}



export default H2H_Results