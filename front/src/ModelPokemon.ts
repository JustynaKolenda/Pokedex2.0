
export type PokemonListModel= {
    name: string,
    url: string
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