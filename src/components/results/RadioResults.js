import React, { useContext } from 'react'
import { Paper, Box, Toolbar, ListItemText, Typography } from '@mui/material'

const RadioResults = ({ title }) => {
    return (
        <Paper elevation={1} sx={{ my: 1}}>
            <Box component="div">
                <Toolbar sx={{ p: 1, display: 'flex', justifyContent: 'space-between'}}>
                    <ListItemText primary={
                        <Typography variant="h6">{title}</Typography>
                    } 
                    />
                </Toolbar>


            </Box>

        </Paper>
    )
}


export default RadioResults