export function getListPokemonsConector(pageNumber:number){
        const limit = 20;
        const offset = limit * pageNumber
        
   return fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
        .then(resp => resp.json())
}

