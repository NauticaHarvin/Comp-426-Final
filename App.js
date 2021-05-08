import logo from './logo.svg';
import React, {useEffect, useState, Component} from "react"; 
import './App.css';
import Recipe from "./Recipe"
import Board from './Board.js';
import axios from 'axios'
import Coin from './Coin';

//Imports for light or dark themes
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';



const App = () => {

   const APP_ID = "bc6a7862";
    const APP_KEY = "575dbeb7db0c5e9c8fba0177771feeaf";

    const [recipes, setRecipes] = useState([]);

  

    //Search State
    const [search, setSearch] = useState('');

    //Retrieves data when button clicked
    const [query, setQuery] = useState('chicken');

    useEffect(() => {
      getRecipies();  
    }, [query]);

   

    const getRecipies = async () => {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      setRecipes(data.hits);
      console.log(data.hits);
    };

    
    //onChange Event
    const updateSearch = e => {
      setSearch(e.target.value);
      console.log(search)
    }

    const getSearch = e => {
      e.preventDefault();
      setQuery(search);
      setSearch('');
    }

    //Light and Dark useStste 
    const [theme, setTheme] = useState('light');
            // The function that toggles between themes
            // if the theme is not light, then set it to dark
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

    //Snake 
    const [coins, setCoins] = useState([]);
    const [searchh, setSearchh] = useState('');
  
    useEffect(() => {
      axios
        .get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
        )
        .then(res => {
          setCoins(res.data);
          console.log(res.data);
        })
        .catch(error => console.log(error));
    }, []);
  
    const handleChange = e => {
      setSearch(e.target.value);
    };
  
    const filteredCoins = coins.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );


  
      return (
      <div className = "App">

          <div>
            <form onSubmit = {getSearch} className = "search-form">

              <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
              <>
                <GlobalStyles />
                <button onClick={toggleTheme} className="toggle">Toggle & Search </button>
              </>
              </ThemeProvider><input 

                className="search-bar" 
                type="text" 
                value={search} 
                onChange={updateSearch} 
              />
              <button className="search-button" type="submit">
                Search
              </button>
            </form>
          </div>
      
          <div className="recipes">
            {recipes.map(recipe => (
              <Recipe 
                key = {recipe.recipe.label}

                title = {recipe.recipe.label}
                calories = {recipe.recipe.calories}
                image = {recipe.recipe.image}
                ingredients = {recipe.recipe.ingredients}
              />
            ))}
        </div>

        <div>
          <div className="App">
              <header className="App-header">
              🥦Can You Find All The Ingredients🥦
              </header>

              <div className="div-car">
                <h2>The goal of the game is to get all the tiles flipped face up 
                  (i.e., find all the matching image pairs) in the least number of tries.
                  That means that lower number of tries are better scores.
                </h2>
              </div>

              <div className="wrapper">
                <Board />
              </div>
              
            <div className="App">
            </div>
            </div>
        </div>


        <div className="div-black">
          <div className='coin-app'>
            <div className='coin-search'>
              <h1 className='coin-text'>Welcome to CryptoLand</h1>
              <h3> Search for any of the Top Cryptos </h3>
              <form>
                <input
                  className='coin-input'
                  type='text'
                  onChange={handleChange}
                  placeholder='Search'
                />
              </form>
            </div>
            {filteredCoins.map(coin => {
            return (
            <Coin
              key={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.total_volume}
              volume={coin.market_cap}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
            />
            );
                })}
          </div>
        </div>
      </div>
      );
    
  
}

export default App;
