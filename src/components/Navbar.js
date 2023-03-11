import React from 'react'
import {Box,  MobileStepper, Toolbar } from '@mui/material'



const Navbar = () => {
    return (
        <Toolbar>
            <h2>We need something like 'useCallback' and 'useMemo' to keep track of which page we're on</h2>
            <Box sx={{ display: { xs: 'none',sm: 'flex'}}}>
                Desktop View - will have a 'stepper'
            </Box>            
            <Box sx={{ display: { xs: 'flex',sm: 'none'}}}>
                    <p>Plan is here to have a burger menu with all the routes on it</p>
            </Box>
        
        
        </Toolbar>
    )
}


export default Navbar