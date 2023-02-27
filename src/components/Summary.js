import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Item, List, ListItem, ListItemAvatar, Paper, ListItemIcon, ListItemText, Toolbar, Typography, Stack } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom'


import { Edit, Close, Check } from '@mui/icons-material'
import data from '../master.json'
import { checkRoundComplete } from '../helpers'

const Summary = ({ guesses }) => {

    const head2head = data.filter(d => d.slug === 'head')


    checkRoundComplete(guesses, data, 'head')

    // const h2h_qs = head2head.map()
    const navigate = useNavigate()

    const getGuess = (q) => {
        // console.log('GUESSES',guesses)
        const result = guesses[q.name]
        console.log(result)
        if (!result) return
        if (result) {
            if (typeof result === 'string') {
                return result
            } else {
                console.log('result',result.join(' - '))
                return result.join(' - ')
            }
        }
    }

    const renderH2h = (q) => {
        return (
            <>
            <Accordion>
                <AccordionSummary>
                    <ListItemIcon>
                        <Typography variant="h6">{`Q${q.round}`}</Typography>
                    </ListItemIcon>
                </AccordionSummary>
            </Accordion>
            <ListItem
            secondaryAction={
                // THIS BIT WILL BE USED FOR THE MARKING BIT
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
                // <IconButton onClick={() => navigate(`/${q.slug}`)}>
                //     <Edit />
                // </IconButton>
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
                    {q.options.map((opt, i) =>
                        <Button
                            size="small"
                            sx={{ color: 'white'}}
                            disabled={opt.value !== guesses[q.name]}
                            variant={opt.value === guesses[q.name] ? 'contained' : 'outlined'}
                            
                        >{opt.label}</Button>
                    )}
                </Stack>
            </Toolbar>
            <Divider />
            </>
        )
    }

    return (
        <Card>
            <CardHeader
                sx={{ display: 'flex', justifyContent: 'center', background: '#15295e', color: 'white', borderBottom: 1}}
                title={<Typography textAlign="left" variant="h5">Summary</Typography>}
            />
            <CardContent>
                <Accordion>
                <List>
                    {data.map((q, i) => {
                        if (q.slug === 'head') {
                            return renderH2h(q)
                        }
                    })}
                </List>
                </Accordion>

            </CardContent>
            <CardActions>
                <Button> Lock Answers</Button>
            </CardActions>
        </Card>
    )
}


export default Summary