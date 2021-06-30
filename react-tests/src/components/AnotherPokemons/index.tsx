import React, { useEffect, useState } from "react";

const AnotherPokemons = () => {
   const [anotherPokemons, setAnotherPokemons] = useState<Array<string>>();
   const [morePokemons, setMorePokemons] = useState<Array<string>>();

   useEffect(() => {
      stablishAnotherPokemons();
   }, []);

   const stablishAnotherPokemons = async () => {
      const result = await fetch(
         "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=5"
      );
      const pokemons = await result.json();
      const pokemonNames = pokemons.results.map(
         (result: { name: string }) => result.name
      );
      setAnotherPokemons(pokemonNames);
   };

   const handleGetMorePokemonsButtonClick = async () => {
      const result = await fetch(
         "https://pokeapi.co/api/v2/pokemon/?offset=25&limit=5"
      );
      const pokemons = await result.json();
      const pokemonNames = pokemons.results.map(
         (result: { name: string }) => result.name
      );
      setMorePokemons(pokemonNames);
   };

   return (
      <div
         style={{
            marginTop: "30px",
         }}
      >
         Outros Pokemons...
         {anotherPokemons?.map((pokemon, index) => (
            <li key={index}>{pokemon}</li>
         ))}
         <button role="buttonmore" onClick={handleGetMorePokemonsButtonClick}>
            Pegar Mais pokemóns
         </button>
         {morePokemons?.map((pokemon, index) => (
            <li key={index}>{pokemon}</li>
         ))}
      </div>
   );
};

export default AnotherPokemons;
