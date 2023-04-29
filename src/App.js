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
import SubmitRecipe from './components/SubmitRecipe';


function App() {


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
