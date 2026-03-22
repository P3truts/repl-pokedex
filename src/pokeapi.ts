import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private static cache: Cache;

    constructor() {
        let milisecs = 10000;
        PokeAPI.cache = new Cache(milisecs);
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        if (pageURL) {
            let cachedValue = PokeAPI.cache.get(pageURL) as ShallowLocations;
            if (cachedValue) {
                return cachedValue;
            }
        }

        let page;
        if (pageURL && pageURL.includes(PokeAPI.baseURL)) {
            page = pageURL;
        } else {
            page = PokeAPI.baseURL + "/" + pageURL;
        }
        const resp = await fetch(page);

        if (resp && !resp.ok) {
            throw new Error(`Response status for fetchLocations: ${resp.status}`);
        }

        const res: ShallowLocations = await resp.json();

        PokeAPI.cache.add(page, res);
        return res;
    }

    async fetchLocation(locationName: string): Promise<Location> {
        let cachedValue = PokeAPI.cache.get(locationName) as Location;
        if (cachedValue) {
            return cachedValue;
        }

        let page = PokeAPI.baseURL + "/location-area/" + locationName;

        const resp = await fetch(page);

        if (resp && !resp.ok) {
            throw new Error(`Response status for fetchLocation: ${resp.status}`);
        }

        const res: Location = await resp.json();

        PokeAPI.cache.add(page, res);
        return res;
    }

    async fetchPokemon(pokemonName: string): Promise<PokemonDetails> {
        let cachedValue = PokeAPI.cache.get(pokemonName) as PokemonDetails;
        if (cachedValue) {
            return cachedValue;
        }

        let pokemon = PokeAPI.baseURL + "/pokemon/" + pokemonName;

        const resp = await fetch(pokemon);

        if (resp && !resp.ok) {
            throw new Error(`Response status for fetchPokemon: ${resp.status}`);
        }

        const res: PokemonDetails = await resp.json();

        PokeAPI.cache.add(pokemon, res);
        return res;
    }
}

// Shallow Location Models
export type ShallowLocations = {
    count: number
    next: string
    previous: any
    results: Result[]
};

export interface Result {
    name: string
    url: string
}

// Location models
export type Location = {
    encounter_method_rates: EncounterMethodRate[]
    game_index: number
    id: number
    location: ApiLocation
    name: string
    names: Name[]
    pokemon_encounters: PokemonEncounter[]
}

export interface EncounterMethodRate {
    encounter_method: EncounterMethod
    version_details: VersionDetail[]
}

export interface EncounterMethod {
    name: string
    url: string
}

export interface VersionDetail {
    rate: number
    version: Version
}

export interface Version {
    name: string
    url: string
}

export interface ApiLocation {
    name: string
    url: string
}

export interface Name {
    language: Language
    name: string
}

export interface Language {
    name: string
    url: string
}

export interface PokemonEncounter {
    pokemon: Pokemon
    version_details: VersionDetail2[]
}

export interface Pokemon {
    name: string
    url: string
}

export interface VersionDetail2 {
    encounter_details: EncounterDetail[]
    max_chance: number
    version: Version2
}

export interface EncounterDetail {
    chance: number
    condition_values: any[]
    max_level: number
    method: Method
    min_level: number
}

export interface Method {
    name: string
    url: string
}

export interface Version2 {
    name: string
    url: string
}

//Pokemon model
export type PokemonDetails = {
    name: string
    base_experience: number
}

