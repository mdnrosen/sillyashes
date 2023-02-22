import React from 'react'
import { Card, CardHeader, CardContent, List, Toolbar, Typography } from '@mui/material'
import data from '../master.json'
import H2H_Results from './results/H2H_Results'

const Results = ({ guesses }) => {
    return (
        <Card>
            <CardHeader
                sx={{ display: 'flex', justifyContent: 'center', background: '#15295e', color: 'white', borderBottom: 1}}
                title={<Typography textAlign="left" variant="h5">Summary</Typography>}
            />
            <CardContent>
                <Toolbar>
                    You win!
                </Toolbar>
                <H2H_Results 
                    q={data.filter(d => d.slug === 'head')}
                    guesses={guesses}
                />
            </CardContent>
        </Card>
    )
}



export default Results