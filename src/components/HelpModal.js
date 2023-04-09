import React from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'


const HelpModal = ({ open, toggle, questions }) => {
    return (
        <Dialog 
            open={open}
        >
            <DialogTitle>
                Hints
            </DialogTitle>
            <Divider />
            <DialogContent>
                {questions.map((q, i) =>
                        <ListItem key={q.name}>
                            <ListItemIcon>
                                <Typography variant="h6">{`Q${q.num}`}</Typography>

                            </ListItemIcon>
                            <ListItemText 
                                // primary={<Typography variant="h6">{q.help}</Typography>}
                                secondary={<Typography variant="body1">{q.help}</Typography>}
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

