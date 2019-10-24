import * as React from 'react';
import {DetailsPokemon} from './ModelPokemon';
import {Card, ListGroup} from 'react-bootstrap';
import Axios from 'axios';

type PokeDetailS= {
    pokemon: DetailsPokemon,
    themeColor: string,
    types: Array<any>,
    description: string,
}
const TYPE_COLORS : any = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
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
            },
            themeColor: '#EF5350',
            types: [],
            description: '',
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
        const index = this.props.match.params.indexPokemon
        const srcImagePokemon = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${index}.png?raw=true`;
        return srcImagePokemon;
    }


    async componentDidMount(){
        const pokemonSpeciesUrl =`https://pokeapi.co/api/v2/pokemon-species/${this.props.match.params.indexPokemon}`;
        this.getDetailPokemon();

        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${this.props.match.params.indexPokemon}/`;
        const pokemonRes = await Axios.get(pokemonUrl);
        
        await Axios.get(pokemonSpeciesUrl).then((res: any) => {
                let description = '';
                res.data.flavor_text_entries.some((flavor: any) => {
                if (flavor.language.name === 'en') {
                    description = flavor.flavor_text;
                    return description;
                }
                return description
                });
        
        const types = pokemonRes.data.types.map((type:any) => type.type.name);
        const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;
       
            this.setState({
                types,
                themeColor,
                description,
                
            })
        
    })
    }

    
    render(){
        const {pokemon, types, description} = this.state
        return(
            <div className="pokemonDetail--all">
                <div className="pokemonDetail">
                    <div className="pokemonDetail--name">{pokemon.name} 
                        <span className="pokemonDetail--index">#{this.props.match.params.indexPokemon}</span>
                    </div>
                    <img className="pokemonDetail--imgPokemon" src={this.getImagePokemon() || "../img/spinner.gif"} alt=""/>
                    <div className="pokemonDetail--typeBox">
                        {
                            types.map((type:any, key)=>{
                                return <span className="pokemonDetail--type" key={type} style={{ backgroundColor:`#${(TYPE_COLORS as any)[type]}`}}>{type}</span>
                            })
                        }
                    </div>
                </div>
                <Card  style={{ width: '18rem' }} className="pokemonDetail--titleSpec pokemonDetail--marginTop">
                    <Card.Header className="pokemonDetail--titleDetail">Gatunek</Card.Header>
                    <ListGroup variant="flush" >
                        <div className="pokemonDetail--boxFlavor">
                            <div className="pokemonDetail--flavour">{description}</div>
                        </div>
                       <div className="pokemonDetail--details" >
                            <span className="pokemonDetail--weight">{pokemon.weight} lbs</span>
                            <span className="pokemonDetail--weightTitle">Waga</span>
                            <div className="pokemonDetail--height" >{pokemon.height}''</div>
                            <span className="pokemonDetail--heightTitle">Wzrost</span>
                       </div>
                    </ListGroup>
                </Card>
                <Card className="pokemonDetail--boxDetails pokemonDetail--marginTop">
                    <span className="pokemonDetail--titleDetail">Statystyki Bazowe</span>
                    <ListGroup variant="flush" >
                     {
                        pokemon.stats.map((el:any, key)=>{
                            return  <ListGroup.Item className="pokemonDetail--details" key={el.stat.name}>{el.stat.name} : {el.base_stat}  </ListGroup.Item>
                        })
                    }
                    </ListGroup>
                </Card>
                <Card className="pokemonDetail--boxDetails pokemonDetail--marginTop pokemonDetail--marginBottom pokemonDetail--cardAbility">
                <Card.Header className="pokemonDetail--titleDetail">Zdolności</Card.Header>
                    <ListGroup variant="flush" className="pokemonDetail--abilityBox" >
                     {
                        pokemon.abilities.map((el:any, key)=>{
                            return  <div className="pokemonDetail--ability" key={el.ability.name}>{el.ability.name}</div>
                        })
                    }
                    </ListGroup>
                </Card>
            </div>
        )
    }
}

export default PokemonDetail