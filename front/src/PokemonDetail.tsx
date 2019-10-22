import * as React from 'react';
import {DetailsPokemon, PokemonSpecies, PokemonEvolve} from './ModelPokemon';
import {Card, ListGroup} from 'react-bootstrap';

type PokeDetailS= {
    pokemon: DetailsPokemon,
    pokemonSpecies: PokemonSpecies,
    pokemonEvolution: PokemonEvolve,
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
            pokemonSpecies: {
                color: {
                    name: ''
                },
                flavor_text_entries: [],
                name: ''
            },
            pokemonEvolution: {
                evolves_to : []
            }
        }
        this.getDetailPokemon = this.getDetailPokemon.bind(this);
        this.getImagePokemon = this.getImagePokemon.bind(this);
        this.getColor = this.getColor.bind(this);
        this.getEvolution = this.getEvolution.bind(this);
    }

    public getDetailPokemon(){
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.match.params.indexPokemon}`)
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                    pokemon: resp
                })
            })
        this.getColor();
    }

    public getColor(){
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${this.props.match.params.indexPokemon}`)
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                    pokemonSpecies: resp
                })
            })
    }

    public getEvolution(){
        fetch(`https://pokeapi.co/api/v2/evolution-chain/${this.props.match.params.indexPokemon}`)
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                    pokemonEvolution: resp.chain
                })
                console.log(resp)
            })
    }

    
    public getImagePokemon() {
        const index = this.props.match.params.indexPokemon
        const srcImagePokemon = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${index}.png?raw=true`;
        return srcImagePokemon;
    }


    componentDidMount(){
        this.getDetailPokemon();
        this.getEvolution();
    }

    public mapdescription(){
        //     this.state.pokemonSpecies.flavor_text_entries.filter((el:any, key)=>{
        //     el.language.name === 'en' && el.version.name === "emerald" 
        // })
    }
    
    
    render(){
        const {pokemon, pokemonSpecies,pokemonEvolution} = this.state
        return(
            <div className="pokemonDetail--all" style={{backgroundColor:`${pokemonSpecies.color.name}`}}>
                <div className="pokemonDetail">
                    <div className="pokemonDetail--name">{pokemon.name} 
                        <span className="pokemonDetail--index">#{this.props.match.params.indexPokemon}</span>
                    </div>
                    <img className="pokemonDetail--imgPokemon" src={this.getImagePokemon()} alt=""/>
                    <div className="pokemonDetail--typeBox">
                        {
                            pokemon.types.map((el:any, key)=>{
                                return <span className="pokemonDetail--type" key={el.type.name} 
                                style={{backgroundColor: `#74C236`}}>{el.type.name}</span>
                            })
                        }
                    </div>
                </div>
                <Card  style={{ width: '18rem' }} className="pokemonDetail--titleSpec pokemonDetail--marginTop">
                    <Card.Header className="pokemonDetail--titleDetail">Gatunek</Card.Header>
                    <ListGroup variant="flush" >
                        <div className="pokemonDetail--boxFlavor">
                        {
                            pokemonSpecies.flavor_text_entries.map((el:any, key)=>{
                            return <div className="pokemonDetail--flavour" key={key} >{(el.language.name === 'en' && el.version.name === "emerald")? el.flavor_text : ""}</div>
                            })
                        }
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
                <Card className="pokemonDetail--boxDetails pokemonDetail--marginTop pokemonDetail--marginBottom">
                <Card.Header className="pokemonDetail--titleDetail">Zdolności</Card.Header>
                    <ListGroup variant="flush" className="pokemonDetail--abilityBox" >
                     {
                        pokemon.abilities.map((el:any, key)=>{
                            return  <div className="pokemonDetail--ability" key={el.ability.name}>{el.ability.name}</div>
                        })
                    }
                    </ListGroup>
                </Card>
                <div>
                <Card className="pokemonDetail--boxDetails pokemonDetail--marginBottom">
                    <Card.Header className="pokemonDetail--titleDetail">Łańcuch Ewolucji</Card.Header>
                    {
                        pokemonEvolution.evolves_to.map((el:any, key)=>{
                            return ( 
                                <div>
                                    <div className="pokemonDetail--ability" key={el.species.name}>{el.species.name}</div>
                                    <img className="pokemonDetail--imgPokemon" src={this.getImagePokemon()} alt=""/>
                                </div>
                            )
                        })
                    }
                </Card>
                </div>
            </div>
        )
    }
}

export default PokemonDetail