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

    console.log('______>>>>>>',questions.filter(d => d.roundNum === 1))

    useEffect(() => {
        if (!person) return
        console.log('doing something with the guesses')
        console.log(person.name)
        console.log(person.guesses)
    },[ person ])


    
    const getGuesses = () => {
        axios.get('http://localhost:7777/people')
            .then(res => {
                setData(res.data)
                const opts = res.data.map(p => {
                    return {
                        label: p.name,
                        id: p._id
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
                <RadioResults
                    questions={questions.filter(d => d.roundNum === 1)}
                    title="Round 1 - Head to Head"
                    guesses={person.guesses}
                />
                : null
            }
        </>
    )
}



export default Results