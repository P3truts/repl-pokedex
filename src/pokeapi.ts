
export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() { }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        let resp;

        if (pageURL && pageURL.includes(PokeAPI.baseURL)) {
            resp = await fetch(pageURL);
        } else {
            resp = await fetch(PokeAPI.baseURL + "/" + pageURL);
        }

        if (resp && !resp.ok) {
            throw new Error(`Response status for fetchLocations: ${resp.status}`);
        } else {
            const res: ShallowLocations = await resp.json();

            return res;
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const resp = await fetch(PokeAPI.baseURL + "/" + locationName);

        if (!resp.ok) {
            throw new Error(`Response status for fetchLocation: ${resp.status}`);
        }

        const res: Location = await resp.json();
        console.log(res);

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
    root: LocationRoot
};

export interface LocationRoot {
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

