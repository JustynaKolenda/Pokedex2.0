
export type PokemonListModel= {
    name: string,
    url: string
}

export type PokemonName= {
    name: string
}

export type DetailsPokemon= {
        name: string,
        stats: Array<any>,
        types: Array<any>,
        weight: number
        height: number,
        eggGroups: string,
        hatch_Steps: number,
        abilities: Array<any>,
        evs: string
}

export type PokemonSpecies= {
    color: {
        name: string
    },
    flavor_text_entries: Array<any>,
    name : string
}

export type PokemonEvolve= {
    evolves_to : Array<any>
}

 