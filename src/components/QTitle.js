import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { Help } from '@mui/icons-material'
import { React } from 'react'



const QTitle = ({ title, num, help }) => {
    return (
        <Box component="span" sx={{ display: 'flex', alignItems: 'center'}}>
            <Typography variant="h6"><b>{num}. {title}</b></Typography>
            {help ?
                <>
                {/* This is desktop, tooltip on hover (default) */}
                <Tooltip title={help} arrow placement="bottom-start" sx={{ display: { xs: 'none', md: 'flex' }}}>
                    <IconButton>
                        <Help /> 
                    </IconButton>
                </Tooltip>

                {/* This is the mobile one with tooltip on tap */}
                <Tooltip title={help} arrow placement="bottom-start" sx={{ display: { xs: 'flex', md: 'none' }}}>
                    <IconButton>
                        <Help /> 
                    </IconButton>
                </Tooltip>
                </>
                :
                null
            }
        </Box>
    )
}

export default QTitle