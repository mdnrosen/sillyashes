import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { Help } from '@mui/icons-material'
import { React } from 'react'



const QTitle = ({ title, num, help }) => {
    return (
        <Box component="span" sx={{ display: 'flex', alignItems: 'center'}}>
            <Typography variant="h6"><b>{num}. {title}</b></Typography>
            {help ?
                <Tooltip title={help} arrow placement="bottom-start">
                    <IconButton>
                        <Help /> 
                    </IconButton>
                </Tooltip>
                :
                null
            }
        </Box>
    )
}

export default QTitle