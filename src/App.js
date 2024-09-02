import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import PokemonCard from './components/PokemonCard';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const pokemonRecord = await axios.get(pokemon.url);
            return {
              name: pokemonRecord.data.name,
              image: pokemonRecord.data.sprites.front_default,
            };
          })
        );
        setPokemonData(data);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };
    fetchPokemonData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredPokemon = pokemonData.filter((pokemon) =>
    pokemon.name.includes(searchTerm)
  );

  return (
    <div className="App">
      <h1>Pokémon Search</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        onChange={handleSearch}
        value={searchTerm}
        className="search-bar"
      />
      <div className="pokemon-container">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default App;
