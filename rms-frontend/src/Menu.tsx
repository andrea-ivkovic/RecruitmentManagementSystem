import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArchiveIcon from '@mui/icons-material/Archive';
import BusinessIcon from '@mui/icons-material/Business';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import WorkIcon from '@mui/icons-material/Work';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import Authorized from './auth/Authorized';
import AuthenticationContext from './auth/AuthenticationContext';
import { logout } from './auth/handleJWT';
import axios, { AxiosResponse } from 'axios';
import { urlCompanies } from './endpoints';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function Menu() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const navigate = useNavigate();

    const { update, claims } = React.useContext(AuthenticationContext);

    function getUserFullName(): string {
        return claims.filter(x => x.name === 'fullName')[0]?.value;
    }

    function getCompanyName(): string {
        return claims.filter(x => x.name === 'companyName')[0] ? claims.filter(x => x.name === 'companyName')[0].value : '';

    }

    function getCompanyId(): string {
        return claims.filter(x => x.name === 'companyId')[0] ? claims.filter(x => x.name === 'companyId')[0].value : '';

    }

    function getUserId(): string {
        return claims.filter(x => x.name === 'userId')[0] ? claims.filter(x => x.name === 'userId')[0].value : '';

    }



    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            style={{ backgroundColor: '#d1e8e2', height: '100%' }}
        >
            <List>

                <Authorized
                    authorized={<>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate('/dashboard')}>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate('/archive')}>
                                <ListItemIcon>
                                    <ArchiveIcon />
                                </ListItemIcon>
                                <ListItemText primary="Archive" />
                            </ListItemButton>
                        </ListItem>
                    </>}
                    notAuthorized={
                        <>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => navigate('/home')}>
                                    <ListItemIcon>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Home" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => navigate('/search')}>
                                    <ListItemIcon>
                                        <SearchIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Search" />
                                </ListItemButton>
                            </ListItem>
                        </>
                    }
                    roles={["companyAdmin", "companyUser"]}
                />
                <Authorized
                    authorized={
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate('/create-new-job')}>
                                <ListItemIcon>
                                    <AddBoxIcon />
                                </ListItemIcon>
                                <ListItemText primary="New Job" />
                            </ListItemButton>
                        </ListItem>
                    }
                    roles={["companyAdmin"]}
                />


                <Authorized
                    authorized={<>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate('/history')}>
                                <ListItemIcon>
                                    <WorkHistoryIcon />
                                </ListItemIcon>
                                <ListItemText primary="History" />
                            </ListItemButton>
                        </ListItem>
                    </>}
                    roles={["applicant"]}
                />


            </List>

            <Divider />

            <List>
                <Authorized
                    authorized={
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate(`/user-profile/${getUserId()}`)}>
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary="My Account" />
                            </ListItemButton>
                        </ListItem>
                    }
                    roles={["applicant"]}
                />

                <Authorized
                    authorized={
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => {
                                navigate(`company-profile/${getCompanyId()}`);
                            }}>
                                <ListItemIcon>
                                    <BusinessIcon />
                                </ListItemIcon>
                                <ListItemText primary="Company Profile" />
                            </ListItemButton>
                        </ListItem>
                    }
                    roles={["companyAdmin", "companyUser"]}
                />


                <Authorized
                    authorized={
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate('/users')}>
                                <ListItemIcon>
                                    <GroupIcon />
                                </ListItemIcon>
                                <ListItemText primary="Users" />
                            </ListItemButton>
                        </ListItem>
                    }
                    roles={["companyAdmin"]}
                />


                <Authorized
                    authorized={
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => {
                                logout();
                                update([]);
                                navigate('/');
                            }}>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </ListItem>
                    }
                    notAuthorized={
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate('/login-or-register')}>
                                <ListItemIcon>
                                    <LoginIcon />
                                </ListItemIcon>
                                <ListItemText primary="Login or Register" />
                            </ListItemButton>
                        </ListItem>
                    }
                    roles={["applicant", "companyAdmin", "companyUser"]}
                />

            </List>
        </Box>
    );

    return (
        <div>
            {(['left'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="static" style={{ backgroundColor: '#88bdbc' }}>
                            <Toolbar>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2, color: '#254e58' }}
                                    onClick={toggleDrawer(anchor, true)}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    {getCompanyName()}
                                </Typography>
                                <Authorized
                                    authorized={<label color='inherit'>Hello, {getUserFullName()}</label>}
                                    notAuthorized={
                                        <Button color="inherit" onClick={() => navigate('/login-or-register')}>Login or Register</Button>
                                    }
                                    roles={["applicant", "companyUser", "companyAdmin"]}
                                />
                            </Toolbar>
                        </AppBar>
                    </Box>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}