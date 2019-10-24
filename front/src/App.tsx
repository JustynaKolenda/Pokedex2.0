import React from 'react';
import './css/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import PokemonList from './PokemonList';
import PokemonDetail from './PokemonDetail'

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Route exact path="/chosen/:indexPokemon" component={PokemonDetail} />
        <Route exact path="/" component={PokemonList} />
      </Router>
    </div>
  );
}

export default App;
