import React from "react";
import NavBar from "./NavBar";
import { Button, Form, Row, Card } from "react-bootstrap";


function BreakfastRecipes(recipeData) {

    // const [breakfastRecipe, setBreakfastRecipe] = useState('');

    // const searchRecipe = event => {

    // }



    return (
        <body style={{ display: "flex", flexDirection: 'row' }}>
            <NavBar />
            <div className="d-flex row">
                <div className="d-flex row">
                    <Form className="">
                        <Form.Control
                            type="search"
                            placeholder="Search by Recipe..."
                            className=""
                            aria-label="Search"
                            // value={breakfastRecipe}
                            // onChange={searchRecipe}
                        />
                       <Button variant="outline-dark" >Search</Button>
                    </Form>
                    <div className="breakfastRecipeDiv">

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

                    </div>
                </div>

                <Card className="d-flex col">
                    <Card.Title>Popular Breakfast Recipes</Card.Title>
                    <Card.Body>....rotating pictures with recipe pictures, names that are clickable thumbnails</Card.Body>
                </Card>
            </div>

        </body>
    )
}

export default BreakfastRecipes;