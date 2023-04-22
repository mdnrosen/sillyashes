import React, { useState } from 'react'
import { Box, ClickAwayListener, IconButton, Tooltip, Typography } from '@mui/material'
import { Help } from '@mui/icons-material'



const QTitle = ({ title, num, help }) => {

    const [ open, setOpen ] = useState(false)


    return (
        <Box component="span" sx={{ display: 'flex', alignItems: 'center'}}>
            <Typography variant="h6"><b>{num}. {title}</b></Typography>
            {help ?
                <ClickAwayListener onClickAway={() => setOpen(false)}>
                    <div>
                        <Tooltip
                            PopperProps={{
                                disablePortal: true,
                            }}
                            onClose={() => setOpen(false)}
                            open={open}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            title={help}    
                            arrow 
                            placement="bottom-start" 
                        >
                            <IconButton onClick={() => setOpen(!open)}>
                                <Help /> 
                            </IconButton>
                        </Tooltip>
                    </div>
                </ClickAwayListener>
                :
                null
            }
        </Box>
    )
}

export default QTitle