export function getListPokemonsConector(pageNumber:number, pokemonName?: string){
        const limit = 20;
        const offset = limit * pageNumber;
        const name = pokemonName
        
   return fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}&filter=${name}`)
        .then(resp => resp.json())
}

