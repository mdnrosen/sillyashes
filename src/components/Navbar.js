import React, { useState, useRef } from 'react'
import {IconButton,  Menu, MenuItem, Toolbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Menu as BurgerMenu } from '@mui/icons-material'


const Navbar = () => {
    const [ anchorEl, setAnchorEl ] = useState(null)
    const open = Boolean(anchorEl)
    const navigate = useNavigate()
    const buttonRef = useRef()

    const handleClick = () => {
        setAnchorEl(buttonRef.current)
    }



    const toggle = () => setAnchorEl(null)
    const navItems = [
        {
            label: 'Round 1 - Head to Head',
            link: '/head'
        },
        {
            label: 'Round 2 - Pick \'Em',
            link: '/pick'
        },
        {
            label: 'Round 3 - Numbers',
            link: '/numbers'
        },
        {
            label: 'Round 4 - Randoms',
            link: '/multi'
        },
        {
            label: 'Round 5 - True or False',
            link: '/truefalse'
        }
    ]


    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleNavigate = (link) => {
        navigate(link)
        setAnchorEl(null)
    }



    return (
        <Toolbar
            disableGutters
            sx={{ display: 'flex', justifyContent: 'flex-end'}}
        >

            <IconButton 

                ref={buttonRef}
                onClick={handleClick}
            >
                    <BurgerMenu />
            </IconButton>


         <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
            {navItems.map(item =>
                <MenuItem 
                    key={item.label}
                    onClick={() => handleNavigate(item.link)}
                >{item.label}</MenuItem>    
            )}
        </Menu>
        </Toolbar>
    )
}


export default Navbar