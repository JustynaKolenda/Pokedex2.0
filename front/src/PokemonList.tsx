import * as React from 'react'
import {PokemonListModel} from './ModelPokemon';
import { NavLink } from 'react-router-dom';

type PokemonListS= {
    pokemonsList: Array<PokemonListModel>
}


export class PokemonList extends React.Component<any,PokemonListS> {

    constructor(props:any){
        super(props);
        this.state = {
            pokemonsList: []
        }
        this.getListPokemons = this.getListPokemons.bind(this);
    }



    public getListPokemons(){
        fetch('https://pokeapi.co/api/v2/pokemon/')
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                    pokemonsList: resp.results            
                })
        })
    }

    componentDidMount(){
        this.getListPokemons()
    }
    

    render(){
        return(
            <>
            { 
                this.state.pokemonsList.map((pokemons:any, key) =>{
                    const index = pokemons.url.split('/')[pokemons.url.split('/').length - 2]
                    const imgForPokemons = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${index}.png?raw=true`;
                return( 
                        <div key={index}>
                            <img src={imgForPokemons} alt=""/>
                            <NavLink  to={`chosen/${index}`} >{pokemons.name.toLowerCase()
                                .split(' ')
                                .map((s:any) => s.charAt(0).toUpperCase() + s.substring(1))
                                .join(' ')
                            }</NavLink>
                        </div>
              ) 
          })
        } 
            </>
        )
    }
}

export default PokemonList