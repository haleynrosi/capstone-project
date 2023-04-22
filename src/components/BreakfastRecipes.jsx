import React from "react";
import NavBar from "./NavBar";
import { useState } from "react";
import { Button, Form, Row, Card } from "react-bootstrap";


function BreakfastRecipes() {

    const [searchBreakfastRecipe, setSearchBreakfastRecipe] = useState('');

    const searchRecipeByIngredient = async () => {
       let fetchUser = await fetch('http://34.210.179.63:8008/Recipes/');
       await fetchUser.json()
        .then((data)=>{
            console.log(data)
            data.map(()=>{
                
            })
        })
    }





    return (
        <div style={{ display: "flex", flexDirection: 'row' }}>
            <NavBar />
            <div className="d-flex row">
                <div className="d-flex row" style={{padding:40}}>
                    <Form className="">
                        <Form.Control
                            type="search"
                            placeholder="Search by Recipe..."
                            className=""
                            aria-label="Search"
                            value={searchBreakfastRecipe}
                            onChange={(e)=> setSearchBreakfastRecipe(e.target.value)}
                        />
                        <Button variant="outline-dark" onClick={searchRecipeByIngredient}>Search</Button>
                    </Form>
                    <div className="breakfastRecipeDiv">
                        <h3></h3>
                        <img></img>
                        <p></p>
                    </div>
                    <Form className="">
                        <Form.Control
                            type="search"
                            placeholder="Search by Ingredient..."
                            className=""
                            aria-label="Search"
                        />
                        <Button variant="outline-dark">Search</Button>
                    </Form>
                    <div className="breakfastIngredientDiv">
                        <h3></h3>
                        <img></img>
                        <p></p>
                    </div>
                </div>

                <Card className="d-flex col" style={{margin:40}}>
                    <Card.Title>Popular Breakfast Recipes</Card.Title>
                    <Card.Body>....rotating pictures with recipe pictures, names that are clickable thumbnails</Card.Body>
                </Card>
            </div>

        </div>
    )
}

export default BreakfastRecipes;