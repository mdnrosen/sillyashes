import { Box } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState} from 'react'


const Everybody = () => {
    const [ people, setPeople ] = useState([])


    const getPeople = async() => {
        try {
            const { data } = await axios.get('https://p1g54m69yb.execute-api.eu-west-1.amazonaws.com/prod/people')
            setPeople(data.body)
        } catch (err) {
            window.alert(people)
        }
 
    }

    useEffect(() => {
        getPeople()
    },[])


    return (
        <Box>
            {people.map(p => 
                <div key={p.id} style={{ maxWidth: '90%'}}>
                    <h4>{p.name}</h4>
                    <p>{JSON.stringify(p.guesses)}</p>
                </div>
            )}



        </Box>

    )
}

export default Everybody