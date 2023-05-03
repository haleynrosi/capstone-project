import React from "react";
import {Container, Row, Col, Button, FormGroup, FormControl} from 'react-bootstrap';
import NavBar from "./NavBar";
import axios from "axios";
import '../App.css';
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";


function MyAccount(){

    const Navigate = useNavigate();
    const loginSelector = useSelector(state => state.alterUser.userLogin)
    const loginId = loginSelector.userID
    const idURL = `http://34.210.179.63:8008/Users/id/${loginId}`


    const updateFirstName = async (newFirstName) => {
        const firstName = { firstName: newFirstName };
      
        try {
          const response = await axios.put(idURL, firstName, {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'api-key': 'DigtalCrafts'
            }
          });
      
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      
      const updateLastName = async (newLastName) => {
        const lastName = { lastName: newLastName };
      
        try {
          const response = await axios.put(idURL, lastName, {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'api-key': 'DigtalCrafts'
            }
          });
      
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      }

      const updateEmail = async (newEmail) => {
        const email = { email: newEmail };
      
        try {
          const response = await axios.put(idURL, email, {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'api-key': 'DigtalCrafts'
            }
          });
      
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      
     
      
      const deleteAccount = async () => {
        try {
          const response = await axios.delete(idURL, {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'api-key': 'DigtalCrafts'
            }
          });
      
          console.log(response);
        } catch (error) {
          if (!error) {
            console.log('deleted successfully');
           
            
            
          }
          
          console.log(error);
        }
      }

    return(
        <div style={{ display: "flex", flexDirection: 'row', height: '100%' }}>   
        <NavBar/>
        <Container>
            <h2>My Account Info</h2>
            <Col>
                <Col>
                    
                        <h4>First Name:</h4>
                        <p>{loginSelector.firstName}</p>
                        <FormGroup style={{ backgroundColor: "#CD5C5C", borderColor: "#CD5C5C", marginBottom: 40}} >
                            <FormControl placeholder="Change First Name Here" onKeyDown={(e)=>{updateFirstName(e.target.value)}}></FormControl>
                        </FormGroup>
                    
                </Col>
                <Col>
                    
                    <h4>Last Name:</h4>
                    <p> {loginSelector.lastName}</p>
                    <FormGroup style={{ backgroundColor: "#CD5C5C", borderColor: "#CD5C5C", marginBottom: 40}} >
                        <FormControl placeholder="Change Last Name Here" onKeyDown={(e)=>{updateLastName(e.target.value)}}></FormControl>
                    </FormGroup>
                
            </Col>
                <Col>
                
                        <h4>Email:</h4>
                        <p>{loginSelector.email}</p>
                        <FormGroup style={{ backgroundColor: "#CD5C5C", borderColor: "#CD5C5C", marginBottom: 40}} >
                        <FormControl placeholder="Change Email Here" onKeyDown={(e)=>{updateEmail(e.target.value)}}></FormControl>
                    </FormGroup>
                    
                </Col>
                <h4>Delete Account:</h4>
                <Button style={{ backgroundColor: "#CD5C5C", borderColor: "#CD5C5C", marginBottom: 40}} onClick={()=> {deleteAccount()}}>Delete My Account Here</Button>
            
            </Col>
        
       </Container>
       </div>
    )
}

export default MyAccount;