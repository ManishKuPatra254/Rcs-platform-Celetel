import { Fragment, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
        handleMenuClose();
    };

    const isAuthenticated = localStorage.getItem('token');

    return (
        <Fragment>
            <Box>
                <AppBar position="sticky" sx={{ backgroundColor: "black", top: "0" }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            RCS Celetel
                        </Typography>
                        <IconButton onClick={handleMenuClick} color="inherit">
                            <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <Link to={'/profile'}><MenuItem>Profile</MenuItem></Link>
                            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                            {isAuthenticated ? (
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            ) : (
                                <Link to="/"><MenuItem>Login</MenuItem></Link>
                            )}
                        </Menu>
                    </Toolbar>
                </AppBar>
            </Box>
        </Fragment>
    );
}
