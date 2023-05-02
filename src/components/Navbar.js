import React, { useState, useRef } from 'react'
import { Box, IconButton, Divider, Menu, MenuItem, MenuList, Toolbar } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu as BurgerMenu } from '@mui/icons-material'
import Logo from '../assets/sillashesLogo.png'


const Navbar = () => {
    const [ anchorEl, setAnchorEl ] = useState(null)
    const open = Boolean(anchorEl)
    const navigate = useNavigate()
    const location = useLocation()
    const buttonRef = useRef()

    const handleClick = () => {
        setAnchorEl(buttonRef.current)
    }


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
            
            sx={{ display: 'flex', mb: 1, justifyContent: 'space-between' }}
        >

            <Box component="img" src={Logo} height={40} />
            <IconButton 
                size="large"
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
            <MenuList>
                <MenuItem
                    selected={location.pathname === '/'}
                    onClick={() => handleNavigate('/')}
                >Home</MenuItem>
                <Divider />
                {navItems.map(item =>
                    <MenuItem 
                        selected={location.pathname === item.link}
                        key={item.label}
                        onClick={() => handleNavigate(item.link)}
                    >{item.label}</MenuItem>    
                )}
                <Divider />
                <MenuItem 
                    selected={location.pathname === '/summary'}
                    onClick={() => handleNavigate('/summary')}>
                    Summary
                </MenuItem>
            </MenuList>
        </Menu>
        </Toolbar>
    )
}


export default Navbar