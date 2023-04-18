import react, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {NavLink} from 'react-router-dom';
import {LunchDining, BreakfastDining, DinnerDining, PersonOutline} from '@mui/icons-material';
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
            <nav textColor="black" backgroundColor="white" style={{padding:20}}>
                <NavLink style={{textDecoration: 'none', color: 'black', fontSize: 35, margin: 10}} to='/'>
                    {collapsed ? 'Trader\nRecipes' : 'TraderRecipes' }
                </NavLink>
                <ul className="sidebar-content">
                       <li> 
                        <NavLink className= 'nav-link' style={{textDecoration: 'none', color: 'black', fontSize: 21}} exact to="/breakfast" activeClassName='activeClicked'>
                           {collapsed ?  <BreakfastDining style={{ fontSize: 30 }}/> : <div><BreakfastDining style={{ fontSize: 30 }}/><span>Breakfast</span></div>}
                        </NavLink>
                        </li>
                        <li>
                        <NavLink className= 'nav-link' style={{textDecoration: 'none', color: 'black', fontSize: 21}}  exact to='/lunch' activeClassName='activeClicked'>
                            {collapsed ? <LunchDining style={{ fontSize: 30 }} /> : <div><LunchDining style={{ fontSize: 30 }}/><span>Lunch</span></div>}
                        </NavLink>
                        </li>
                        <li>
                        <NavLink  className= 'nav-link' style={{textDecoration: 'none', color: 'black', fontSize: 21}}  exact to='/dinner' activeClassName='activeClicked'>
                          {collapsed ? <DinnerDining style={{ fontSize: 30 }}/> : <div><DinnerDining style={{ fontSize: 30 }}/><span>Dinner</span></div>}
                        </NavLink>
                        </li>
                        <li>
                        <NavLink  className= 'nav-link' style={{textDecoration: 'none', color: 'black', fontSize: 21}} exact to='/signin' activeClassName='activeClicked'>
                          {collapsed ? <PersonOutline style={{ fontSize: 30 }}/> : <div><PersonOutline style={{ fontSize: 30 }}/><span>Sign In</span></div>}
                        </NavLink>
                        </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;