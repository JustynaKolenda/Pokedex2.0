import * as React from 'react'
import {PokemonListModel} from './ModelPokemon';
import { NavLink } from 'react-router-dom';
import {getListPokemonsConector} from './Conector';
// import {Card} from 'react-bootstrap';
import Pagination from 'react-js-pagination';

type PokemonListS= {
    pokemonsList: Array<PokemonListModel>,
    activePage: number,
    filterName: string
}


export class PokemonList extends React.Component<any,PokemonListS> {

    constructor(props:any){
        super(props);
        this.state = {
            pokemonsList: [],
            activePage: 0,
            filterName: ''
        }
        this.getListPokemons = this.getListPokemons.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.searchByName = this.searchByName.bind(this);
    }

   
    public getListPokemons(pageNumber:number,name:string){
        getListPokemonsConector(pageNumber, name).then(resp => {
            this.setState({
                pokemonsList: resp.results            
            })
            console.log(resp)
        })
    }

    public componentDidMount(){
        this.getListPokemons(this.state.activePage,this.state.filterName);
    }
    
    public handlePageChange(pageNumber:number) {
        this.setState({activePage: pageNumber-1});
        this.getListPokemons(pageNumber-1,this.state.filterName)
      }
    
    public searchByName(e:any){
        this.setState({
            filterName: e.target.value
        })
       this.getListPokemons(this.state.activePage,e.target.value)
    }  

    render(){
        return(
            <>
            <div className="pokemonList"> 
                {/* <input type="text" name="searchName" className="pokemonList--searchName" value={this.state.filterName} onChange={this.searchByName} placeholder="Search name..." /> */}
            { 
                 this.state.pokemonsList.map((pokemons:any, key) =>{
                    const index = pokemons.url.split('/')[pokemons.url.split('/').length - 2]
                    const imgForPokemons = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${index}.png?raw=true`;
                return( 
                    <div key={index} className="pokemonList--singleCafle">
                        <div className="pokemonList--boxPokemon">
                            <div className="pokemonList--borderImg">
                                <img className="pokemonList--imgPosition" src={imgForPokemons} alt=""/>
                            </div> 
                        </div>
                        <div className="pokemonList--boxIndNam">
                            <div className="pokemonList--index">{index}     
                            {/* <label htmlFor="check"></label>
                            <input type="checkbox" id="check" className="pokemonList--starCheckbox"/> */}
                            <NavLink className="pokemonList--name" to={`chosen/${index}`}>{pokemons.name}</NavLink>
                            </div> 
                        </div>
                    
                    </div>
                ) 
                })                
            }
            </div>
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={20}
                    totalItemsCount={964}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                />
            </>
        )
    }
}

export default PokemonList