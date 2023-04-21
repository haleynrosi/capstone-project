import react, { useCallback, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import { Modal, Box, Typography } from "@mui/material";
import { Card, Form, Button } from 'react-bootstrap';
import SubmitRecipe from "./SubmitRecipe";
import alterId from '../actions/alterId';
import { useDispatch } from "react-redux";
import MyDashboard from "./MyDashboard";
import { LunchDining, BreakfastDining, DinnerDining, PersonOutline, AccountCircle, GridView, FormatListBulleted, Logout, Settings } from '@mui/icons-material';
import '../App.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";


function NavBar() {

    const userId = useSelector((state) =>
        state.userID
    )

    const dispatch = useDispatch(); // just lets us use the actions aka alterId - operates as a function and just needs help being used here bc of redux

    const modalstyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderColor: 'white',
        borderRadius: '20px',
        boxShadow: 15,
        p: 4,
    };

    const [collapsed, setCollapsed] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openNestedModal, setOpenNestedModal] = useState(false);
    const [username, setUsername] = useState('');
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    });
    

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

 

    const userLogin = async () => {
        let fetchUser = await fetch(`http://34.210.179.63:8008/Users/username/${username}`);
        await fetchUser.json()
            .then((data) => {
                console.log(data)
                dispatch(alterId(data.userId)) 
            })
    }

    useEffect(()=>{
        if (userId !== null) {
            setLoggedIn(true)
            handleClose()
        }
    }, [userId])

    const userLogout = () => {
        setLoggedIn(false);
        dispatch({
            type: 'ALTERID',
            data: null
        });
    };

    const createUser = () => {
        fetch('http://34.210.179.63:8008/Users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then(data =>console.log(data))
        .then(
            handleNestedClose()
        ).then(
            handleClose()
        )
        .catch(error => console.error(error))
    }

    return (
        <div>
            <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial', backgroundColor: '#BC8F8F' }}>
                <nav textColor="white" style={{ padding: 20 }}>
                    <NavLink style={{ textDecoration: 'none', color: 'white', fontSize: 35, margin: 10 }} to='/'>
                        {collapsed ? 'Trader\nRecipes' : 'TraderRecipes'}
                    </NavLink>
                    <ul className="sidebar-content" style={{ borderColor: 'white', borderStyle: 'solid', borderRadius: 20, marginTop: 20 }}>
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

                                <NavLink className='nav-link' style={{ textDecoration: 'none', color: 'white', fontSize: 21 }} activeClassName='activeClicked'>
                                    {collapsed ? <AccountCircle style={{ fontSize: 30 }} /> : <div><AccountCircle style={{ fontSize: 30 }} /><span> User  Account</span></div>}
                                </NavLink>
                                <div>
                                    <ul style={{ listStyleType: 'none' }}>
                                        <li>
                                            <NavLink className='nav-link' style={{ textDecoration: 'none', color: 'white', fontSize: 16 }} exact to='/accountinfo' activeClassName='activeClicked'>
                                                {collapsed ? <Settings style={{ fontSize: 20 }} /> : <div><Settings style={{ fontSize: 20 }} /><span> Account Info</span></div>}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink className='nav-link' style={{ textDecoration: 'none', color: 'white', fontSize: 16 }} exact to='/mydashboard' activeClassName='activeClicked'>
                                                {collapsed ? <GridView style={{ fontSize: 20 }} /> : <div><GridView style={{ fontSize: 20 }} /><span> Dashboard</span></div>}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink className='nav-link' style={{ textDecoration: 'none', color: 'white', fontSize: 16 }} activeClassName='activeClicked'>
                                                {collapsed ? <FormatListBulleted style={{ fontSize: 20 }} /> : <div><FormatListBulleted style={{ fontSize: 20 }} /><span> Submit a Recipe</span></div>}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={userLogout} exact to= '/' className='nav-link' style={{ textDecoration: 'none', color: 'white', fontSize: 16 }} activeClassName='activeClicked'>
                                                {collapsed ? <Logout style={{ fontSize: 20 }} /> : <div><Logout style={{ fontSize: 20 }} /><span> Logout</span></div>}
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
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
                                    <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control type="password" placeholder="Enter Password" />
                                </Form.Group>
                                <a style={{ color: 'maroon' }} href='#' onClick={handleNestedOpen}>Need a login? Sign up here!</a>
                                <bR></bR>
                                <Button style={{ backgroundColor: "#CD5C5C", borderColor: "#CD5C5C" }} onClick={userLogin}>Submit</Button>
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
                        <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Username:</Form.Label>
                                    <bR></bR>
                                    <Form.Text> requirements: 4-20 char.... only letters, numbers underscores and hyphens</Form.Text>
                                    <Form.Control type="text" placeholder="Enter username..." onChange={(e) => setNewUser({...newUser, username:e.target.value})} />
                                </Form.Group>
                                <bR></bR>
                                <Form.Group>
                                    <Form.Label>Email Address:</Form.Label>
                                    <bR></bR>
                                    <Form.Text> requirements:@ symbol and domain name</Form.Text>
                                    <Form.Control type="email" placeholder="Enter email address..." onChange={(e) => setNewUser({...newUser, email:e.target.value})}/>
                                </Form.Group>
                                <bR></bR>
                                <Form.Group>
                                    <Form.Label>First Name:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter first name..." onChange={(e) => setNewUser({...newUser, firstName:e.target.value})} />
                                </Form.Group>
                                <bR></bR>
                                <Form.Group>
                                    <Form.Label>Last Name:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter last name..." onChange={(e) => setNewUser({...newUser, lastName:e.target.value})}/>
                                </Form.Group>
                                <bR></bR>
                                <Form.Group>
                                    <Form.Label>Password:</Form.Label>
                                    <bR></bR>
                                    <Form.Text> requirements:at least 8 char, contains 1 lowercase letter, one uppercase and digit</Form.Text>
                                    <Form.Control type="password" placeholder="Enter password..."onChange={(e) => setNewUser({...newUser, password:e.target.value})} />
                                </Form.Group>
                                <bR></bR>
                                <Button style={{ backgroundColor: "#CD5C5C", borderColor: "#CD5C5C" }} onClick={createUser}>Create your account!</Button>
                            </Form>
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}

export default NavBar;