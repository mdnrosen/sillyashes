import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'

const Home = () => {

    const navigate = useNavigate()

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh', m: 2 }}>
            <Typography variant="h4">
                THE ASHES 2023
            </Typography>    

            <Typography variant="overline">
                --- POINTLESS PREDICTIONS ---
            </Typography>

            <Typography variant="body2" sx={{ mt: 2 }}>
                Here's some silly questions about the upcoming Ashes series.
            </Typography>            
            
            <Typography variant="body2" sx={{ mt: 2 }}>
                There are no prizes, just a bit of fun. After the series you'll be able to come back and check anyones answers
            </Typography>            
            
            <Typography variant="body2" sx={{ mt: 2 }}>
                Take your time. Provided you're on the same device your progress will be saved.
            </Typography>                   

            <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
               Your answers will be locked when you submit, or automatically at midnight on the 15th June 2023.
            </Typography>
            {window.localStorage.getItem('sillyAshes_locked') ? 
                <Button
                    size="large"
                    variant="contained"
                    onClick={() => navigate('/summary')}
                >View Summary</Button>
                :
                <Button
                    size="large"
                    variant="contained"
                    onClick={() => navigate('/head')}
                >Play.</Button>
    }

        </Box>
    )
}


export default Home