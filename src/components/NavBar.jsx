import react, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import { Modal, Box, Typography } from "@mui/material";
import { Card, Form, Button } from 'react-bootstrap';
import { LunchDining, BreakfastDining, DinnerDining, PersonOutline } from '@mui/icons-material';
import '../App.css';
import { useState } from "react";


function NavBar() {

    const modalstyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius: '20px',
        boxShadow: 15,
        p: 4,
    };

    const [collapsed, setCollapsed] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openNestedModal, setOpenNestedModal] = useState(false);

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const handleNestedOpen = () => setOpenNestedModal(true);
    const handleNestedClose = () => setOpenNestedModal(false);

    useEffect(() => {
        const resizeNav = () => {
            if (window.innerWidth <= 768) {
                setCollapsed(true);
            } else {
                setCollapsed(false)
            }
        }
        resizeNav();
        window.addEventListener('resize', resizeNav);
        return () => {
            window.removeEventListener('resize', resizeNav);
        };
    }, []);


    return (
        <div>
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial', backgroundColor: '#BC8F8F' }}>
            <nav textColor="white"  style={{ padding: 20 }}>
                <NavLink style={{ textDecoration: 'none', color: 'white', fontSize: 35, margin: 10 }} to='/'>
                    {collapsed ? 'Trader\nRecipes' : 'TraderRecipes'}
                </NavLink>
                <ul className="sidebar-content">
                    <li className="navListItem">
                        <NavLink className='nav-link' style={{ textDecoration: 'none', color: 'white', fontSize: 21 }} exact to="/breakfast" activeClassName='activeClicked'>
                            {collapsed ? <BreakfastDining style={{ fontSize: 30 }} /> : <div><BreakfastDining style={{ fontSize: 30 }} /><span> Breakfast</span></div>}
                        </NavLink>
                    </li>
                    <li className="navListItem">
                        <NavLink className='nav-link' style={{ textDecoration: 'none', color: 'white', fontSize: 21 }} exact to='/lunch' activeClassName='activeClicked'>
                            {collapsed ? <LunchDining style={{ fontSize: 30 }} /> : <div><LunchDining style={{ fontSize: 30 }} /><span> Lunch</span></div>}
                        </NavLink>
                    </li>
                    <li className="navListItem">
                        <NavLink className='nav-link' style={{ textDecoration: 'none', color: 'white', fontSize: 21 }} exact to='/dinner' activeClassName='activeClicked'>
                            {collapsed ? <DinnerDining style={{ fontSize: 30 }} /> : <div><DinnerDining style={{ fontSize: 30 }} /><span> Dinner</span></div>}
                        </NavLink>
                    </li>
                    {loggedIn ?
                        <li className="navListItem">
                            <NavLink>

                            </NavLink>
                        </li> :
                        <li className="navListItem">
                            <NavLink className='nav-link' style={{ textDecoration: 'none', color: 'white', fontSize: 21 }} onClick={handleOpen} activeClassName='activeClicked'>
                                {collapsed ? <PersonOutline style={{ fontSize: 30 }} /> : <div><PersonOutline style={{ fontSize: 30 }} /><span> Sign In</span></div>}
                            </NavLink>
                        </li>}
                </ul>
            </nav>
            </div>
            <div>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalstyle} >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Sign In:
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Form>
                            <Form.Group>
                                <Form.Label>Username:</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" />
                            </Form.Group>
                            <a style={{color:'maroon'}} href='#' onClick={handleNestedOpen}>Need a login? Sign up here!</a>
                            <bR></bR>
                            <Button style={{backgroundColor: "#CD5C5C", borderColor: "#CD5C5C"}} >Submit</Button>
                        </Form>
                    </Typography>
                </Box>
            </Modal>
            <Modal
                open={openNestedModal}
                onClose={handleNestedClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalstyle} >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Account Creation:
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Form>
                            <Form.Group>
                                <Form.Label>Username:</Form.Label>
                                <Form.Control type="text" placeholder="Enter username..." />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email Address:</Form.Label>
                                <Form.Control type="email" placeholder="Enter email address..." />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control type="text" placeholder="Enter first name..." />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control type="text" placeholder="Enter last name..." />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" placeholder="Enter password..." />
                            </Form.Group>
                            <bR></bR>
                           <Button style={{backgroundColor: "#CD5C5C", borderColor: "#CD5C5C"}}>Create your account!</Button>
                        </Form>
                    </Typography>
                </Box>
            </Modal>
        </div>
        </div>
    )
}

export default NavBar;