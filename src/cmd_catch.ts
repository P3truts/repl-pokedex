import { State } from "./state.js";

export async function catchCommand(state: State, pokName: string): Promise<void> {
    let pokemonName = "#";
    if (pokName) {
        pokemonName = pokName;
    } else {
        console.log("Pokemon name incorrect. Please try again!");
        state.rl.prompt();
        return;
    }

    try {
        console.log(`Throwing a Pokeball at ${pokemonName}...`);
        const res = await state.pokeapi.fetchPokemon(pokemonName);

        let chance = Math.floor(Math.random() * res.base_experience);

        if (chance < 50) {
            console.log(`${pokemonName} was caught!`);
            state.pokedex[pokemonName] = res;
        } else {
            console.log(`${pokemonName} has escaped!`);
        }

    } catch (error: any) {
        console.log("An error has occurred in catch: " + error.message);
    }

    state.rl.prompt();
}
