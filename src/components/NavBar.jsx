import react, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {NavLink} from 'react-router-dom';
import {LunchDining, BreakfastDining, DinnerDining, PersonOutline} from '@mui/icons-material';
import { CDBSidebarHeader } from "cdbreact";
import '../App.css';
import { useState } from "react";


function NavBar(){

    const [collapsed, setCollapsed] = useState(false);

    useEffect(()=>{
        const resizeNav = ()=>{
            if (window.innerWidth <= 768){
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

    return(
        <div style={{display: 'flex', height:'100vh', overflow: 'scroll initial'}}>
            <nav textColor="black" backgroundColor="white">
                <NavLink style={{textDecoration: 'none', color: 'black'}} to='/'>
                    <CDBSidebarHeader>TraderRecipes</CDBSidebarHeader>
                </NavLink>
                <ul className="sidebar-content">
                       <li> 
                        <NavLink className= 'nav-link' style={{textDecoration: 'none', color: 'black'}} exact to="/breakfast" activeClassName='activeClicked'>
                           {collapsed ? <BreakfastDining/> : 'Breakfast'}
                        </NavLink>
                        </li>
                        <li>
                        <NavLink className= 'nav-link' style={{textDecoration: 'none', color: 'black'}}  exact to='/lunch' activeClassName='activeClicked'>
                            {collapsed ? <LunchDining /> : 'Lunch'}
                        </NavLink>
                        </li>
                        <li>
                        <NavLink  className= 'nav-link' style={{textDecoration: 'none', color: 'black'}}  exact to='/dinner' activeClassName='activeClicked'>
                          {collapsed ? <DinnerDining/> : 'Dinner'}
                        </NavLink>
                        </li>
                        <li>
                        <NavLink  className= 'nav-link' style={{textDecoration: 'none', color: 'black'}} exact to='/signin' activeClassName='activeClicked'>
                          {collapsed ? <PersonOutline/> : 'Sign In'}
                        </NavLink>
                        </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;