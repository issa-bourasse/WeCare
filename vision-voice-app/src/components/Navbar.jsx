// Navbar.jsx
import React, { useState } from 'react';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    Button, 
    IconButton, 
    Drawer, 
    List, 
    ListItem, 
    ListItemText,
    Box 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)({
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
});

const StyledButton = styled(Button)({
    margin: '0 10px',
    color: 'white',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.1)',
        transform: 'translateY(-2px)',
    },
    transition: 'all 0.3s ease-in-out',
});

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const menuItems = ['Home', 'About', 'Services', 'Contact'];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <List>
            {menuItems.map((item) => (
                <ListItem button key={item}>
                    <ListItemText primary={item} />
                </ListItem>
            ))}
        </List>
    );

    return (
        <>
            <StyledAppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ 
                            flexGrow: 1,
                            fontWeight: 'bold',
                            letterSpacing: '1px'
                        }}
                    >
                        WE CARE
                    </Typography>

                    {/* Desktop Menu */}
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {menuItems.map((item) => (
                            <StyledButton key={item}>
                                {item}
                            </StyledButton>
                        ))}
                    </Box>

                    {/* Mobile Menu Icon */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </StyledAppBar>

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better mobile performance
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
};

export default Navbar;