import React from "react";
import { useState } from "react";

import DropDown from "./components/DropDown/";
import AnotherPokemons from "./components/AnotherPokemons/";

function App() {
   const [selectedPokemon, setSelectedPokemon] = useState<string | undefined>(
      undefined
   );

   return (
      <div className="App">
         {selectedPokemon && <div>Seu Pokemón: {selectedPokemon}</div>}

         <DropDown
            title="Selecione o seu Pokemón Inicial"
            options={["Bubasaur", "Pikaxu", "Anestesia"]}
            onSelect={setSelectedPokemon}
         />

         <AnotherPokemons />
      </div>
   );
}

export default App;
