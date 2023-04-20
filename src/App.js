import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route,} from 'react-router-dom';
import NavBar from './components/NavBar';
import RecipesHome from './components/RecipesHome';
import DinnerRecipes from './components/DinnerRecipes';
import LunchRecipes from './components/LunchRecipes';
import BreakfastRecipes from './components/BreakfastRecipes';
import MyRecipes from './components/MyRecipes';
import MyAccount from './components/MyAccount';
import MyDashboard  from './components/MyDashboard';


function App() {

  const recipeData = [
    {
      "recipeId": 1,
      "recipeName": "chili egg pancakes",
      "recipeType": "breakfast",
      "description": "lorem ipsum blah blah i'm the best",
      "owner": 1
    },
    {
      "recipeId": 2,
      "recipeName": "pumpkin french toast",
      "recipeType": "breakfast",
      "description": "lorem ipsum blah blah i'm the best",
      "owner": 1
    },
    {
      "recipeId": 3,
      "recipeName": "apple cinnamon oatmeal",
      "recipeType": "breakfast",
      "description": "lorem ipsum blah blah i'm the best",
      "owner": 1
    },
    {
      "recipeId": 4,
      "recipeName": "blueberry waffle sandwhich",
      "recipeType": "breakfast",
      "description": "lorem ipsum blah blah i'm the best",
      "owner": 1
    }
  ]




  return (
    <div className="App">
    <BrowserRouter>
         <Routes>
           <Route exact path='/' element={<RecipesHome/>}/>
           <Route path='/dinner' element={<DinnerRecipes/>}/>
           <Route path='/lunch' element={<LunchRecipes/>}/>
           <Route path='/breakfast' element={<BreakfastRecipes/>}/>
           <Route path='/accountinfo' element={<MyAccount/>}/>
           <Route path='/myrecipes' element={<MyRecipes/>}/>
           <Route path='/mydashboard' element={<MyDashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
