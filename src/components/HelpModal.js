import React from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'


const HelpModal = ({ open, toggle, hints, roundTitle }) => {
    return (
        <Dialog 
            open={open}
        >
            <DialogTitle>
                Hints
            </DialogTitle>
            <Divider />
            <DialogContent>
                {hints.map((hint, i) =>
                        <ListItem key={i}>
                            <ListItemIcon>
                                <Typography variant="h6">?</Typography>

                            </ListItemIcon>
                            <ListItemText 
                                primary={<Typography variant="h6">{hint.q_num}</Typography>}
                                secondary={<Typography variant="body1">{hint.text}</Typography>}
                            />


                        </ListItem>
                    
       
                )}

            </DialogContent>
            <Divider />

            <DialogActions>
                <Button
                    onClick={toggle}
                    endIcon={<Close />}
                >Close</Button>
            </DialogActions>
        </Dialog>
    )

}


export default HelpModal

