import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import PokemonDetail from "./containers/PokemonDetail";
import { Pokemons } from "./containers/Pokemons";

function App() {
  return (
    <AppContainer>
      <Routes>
        <Route path={"/"} element={<Pokemons />}></Route>
        <Route path={"/:id"} element={<PokemonDetail />}></Route>
      </Routes>
    </AppContainer>
  );
}

export default App;


const AppContainer = styled.div`
  position: relative;
  background: linear-gradient(to right, #f0f2f0, #000c40);
  min-height: 100vh;
`