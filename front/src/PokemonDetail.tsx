import * as React from 'react';
import {DetailsPokemon} from './ModelPokemon';

type PokeDetailS= {
    pokemon: DetailsPokemon
}

export class PokemonDetail extends React.Component<any,PokeDetailS> {
    constructor(props:any){
        super(props);
        this.state= {
            pokemon: {
                name: '',
                stats: [],
                types: [],
                weight: 0,
                height: 0,
                eggGroups: '',
                hatch_Steps: 0,
                abilities: [],
                evs: ''
            }
        }
        this.getDetailPokemon = this.getDetailPokemon.bind(this);
        this.getImagePokemon = this.getImagePokemon.bind(this);
    }

    public getDetailPokemon(){
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.match.params.indexPokemon}`)
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                    pokemon: resp
                })
            })
    }

    
    public getImagePokemon() {
        const srcImagePokemon = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${this.props.match.params.indexPokemon}.png?raw=true`;
        return srcImagePokemon;
    }


    componentDidMount(){
        this.getDetailPokemon()
    }

    render(){
        const {pokemon} = this.state
        return(
            <>
                {pokemon.name}
                <img className="pokeDetail--imgPokemon" src={this.getImagePokemon()} alt=""/>
            </>
        )
    }
}

export default PokemonDetail