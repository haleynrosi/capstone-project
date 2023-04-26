import React from "react";
import NavBar from "./NavBar";
import { useState } from "react";
import { Button, Form, Row, Card, Dropdown, DropdownButton, InputGroup, FormControl, Carousel } from "react-bootstrap";



function BreakfastRecipes() {

    const [imageIndex, setImageIndex] = useState(0)
    const [searchBreakfastImage, setSearchBreakfastImage] = useState('')
    const [searchBreakfast, setSearchBreakfast] = useState('');
    const [searchBreakfastOption, setSearchBreakfastOption] = useState('Search by');

    const breakfastImages = [
        {
            src: "/images/avo-hash-stack.jpg",
            alt: "Avocado Egg Hash Stack Image",
            title: "Avocado Egg Hash Stack",
            description: 'fnsngf;kngkd;ng'
        },
        {
            src: "/images/chili-egg-onion-pancake.jpg",
            alt: "Chili Egg Green Onion Pancake Img",
            title: "Chili Egg Green Onion Pancake",
            description: 'fnsngf;kngkd;ng'
        },
        {
            src: "/images/twisted-cinnamon-sugar-french-toast.jpg",
            alt: "Twisted Cinn French Toast Image",
            title: "Twisted Cinnamon Sugar French Toast",
            description: 'fnsngf;kngkd;ng'
        },
    ]

    const handleImgChange = (selectedImgIndex, e) => {
        setImageIndex(selectedImgIndex)
    }

    const searchOptionDropdown = (searchOption) => {
        setSearchBreakfastOption(searchOption)
    }

    const searchBreakfastRecipes = () => {
        if (searchBreakfastOption === 'Recipe') {
            searchRecipeByName()
        } else if (searchBreakfastOption == 'Ingredient') {
            searchRecipeByIngredient()
        }

    }

    const searchRecipeByName = async () => {
        let fetchUser = await fetch(`http://34.210.179.63:8008/Recipes/name/${searchBreakfast}`);
        await fetchUser.json()
            .then((data) => {
                for (let i in data) {
                    if (data[i].recipeName === searchBreakfast) {
                        console.log(data[i].recipeName)

                    }

                }
            })
    }

    const searchRecipeByIngredient = async () => {
        let fetchUser = await fetch(`http://34.210.179.63:8008/Ingredients/name/${searchBreakfast}`);
        await fetchUser.json()
            .then((data) => {
                searchRecipeByIngredientID(data.ingredientId)
            })
    }

    const searchRecipeByIngredientID = async (ingredientID) => {
        let newFetch = await fetch(`http://34.210.179.63:8008/RecipeIngredients/ingredient/${ingredientID}`);
        await newFetch.json()
            .then((data) => {
                console.log(data)
            })
    }




    return (
        <div style={{ display: "flex", flexDirection: 'row' }}>
            <NavBar />
            <div className="d-flex row">
                <div className="d-flex row" style={{ padding: 30 }}>
                    <InputGroup style={{ margin: 20 }}>
                        <DropdownButton title={searchBreakfastOption} variant="outline-dark" as={InputGroup.Append}>
                            <Dropdown.Item onClick={() => { searchOptionDropdown('Recipe') }}>
                                Recipe Name
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => { searchOptionDropdown('Ingredient') }}>
                                Ingredient Name
                            </Dropdown.Item>
                        </DropdownButton>
                        <FormControl
                            type="search"
                            placeholder="Search by..."
                            className=""
                            aria-label="Search"
                            value={searchBreakfast}
                            onChange={(e) => setSearchBreakfast(e.target.value)}
                        />
                        <Button variant="outline-dark" onClick={searchBreakfastRecipes}>Search</Button>
                    </InputGroup>
                    <Card className="breakfastRecipeDiv" style={{ margin: 20, border: 'none' }}>
                        <Card.Title style={{ textAlign: 'center' }}>{searchBreakfast}</Card.Title>
                        <Card.Img style={{ display: 'none' }} src={{ searchBreakfastImage }}></Card.Img>
                    </Card>
                </div>
                <Card className="d-flex col " style={{ margin: 'auto', maxWidth:450 }}>
                    <Card.Title>Popular Breakfast Recipes</Card.Title>
                    <Card.Body>
                        <Carousel activeIndex={imageIndex} onSelect={handleImgChange}>
                            {breakfastImages.map((image, i) => (
                                <Carousel.Item key={i}>
                                    <img style={{maxWidth: 400}}
                                        className="w-100 p-50"
                                        src={image.src}
                                        alt={image.alt}
                                        onClick={() => {
                                            // TODO: Implement opening the modal with the image, title, and description
                                        }}
                                    />
                                    <Carousel.Caption>
                                        <h5>{image.title}</h5>
                                        <p>{image.description}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Card.Body>
                </Card>
            </div>

        </div>
    )
}

export default BreakfastRecipes;