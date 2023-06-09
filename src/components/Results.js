import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Autocomplete, Box, Card, CardHeader, CardContent, List, Toolbar, Typography, TextField } from '@mui/material'
import H2H_Results from './results/H2H_Results'
import RadioResults from './results/RadioResults'
import questions from '../master.json'


const Results = () => {
    const [ person, setPerson ] = useState(null)
    const [ data, setData ] = useState([])
    const [ options, setOptions ] = useState([])

    useEffect(() => {
        getGuesses()
    },[])


    useEffect(() => {
        if (!person) return
    },[ person ])


    
    const getGuesses = () => {
        axios.get('https://p1g54m69yb.execute-api.eu-west-1.amazonaws.com/prod/people')
            .then(res => {
                setData(res.data.body)
                const opts = res.data.body.map(p => {
                    return {
                        label: p.name,
                        id: p.id
                    }
                })
                setOptions(opts)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleChange = (e) => {
        const match = data.find(p => p.name === e.target.textContent)
        setPerson(match)

    }

    return (
        <>
            <Toolbar>
                <Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Autocomplete 
                        fullWidth
                        onChange={handleChange}
                        sx={{ width: 599 }}
                        options={options}
                        renderInput={(params =>
                            <TextField 
                                {...params} 
                                label="Select a person" 
                            />)}
                    />
                </Box>
            </Toolbar>
            <Toolbar>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    {person ? person.name : "Select a person"}
                </Typography>
            </Toolbar>

            
            {person ? 
                <>
                    <RadioResults
                        questions={questions.filter(d => d.roundNum === 1)}
                        title="Round 1 - Head to Head"
                        guesses={person.guesses}
                    />
                    <RadioResults
                        questions={questions.filter(d => d.roundNum === 4)}
                        title="Round 4 - Randoms"
                        guesses={person.guesses}
                    />
                    <RadioResults
                        questions={questions.filter(d => d.roundNum === 5)}
                        title="Round 5 - True or False"
                        guesses={person.guesses}
                    />
                
                </>
                : null
            }
        </>
    )
}



export default Results