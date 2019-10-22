export function getListPokemonsConector(pageNumber:number, name?: string){
        const limit = 20;
        const offset = limit * pageNumber;
   return fetch(`https://pokeapi.co/api/v2/pokemon/${name}?offset=${offset}&limit=${limit}`)
        .then(resp => resp.json())
}
