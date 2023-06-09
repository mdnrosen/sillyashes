import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'


const NotFound = () => {
    const navigate = useNavigate()
    return (
        <Box sx={{ height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Typography variant="h6">Oops. There's nothing here</Typography>
            <Button onClick={() => navigate(-1)}>Go Back</Button>                  
        </Box>
    )
}


export default NotFound

