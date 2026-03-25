import { State } from "./state.js";

export async function inspectCommand(state: State, pokName: string): Promise<void> {
    let pokemonName = "#";
    if (pokName) {
        pokemonName = pokName;
    } else {
        console.log("Pokemon name incorrect. Please try again!");
        state.rl.prompt();
        return;
    }

    try {
        const pokemon = await state.pokeapi.fetchPokemon(pokemonName);

        console.log(`Name: ${pokemon.name}\nHeight: ${pokemon.height}\nWeight: ${pokemon.weight}\nStats:`);
        for (const stat of pokemon.stats) {
            console.log(` -${stat.stat.name}: ${stat.base_stat}`);
        }
        console.log("Types:");
        for (const type of pokemon.types) {
            console.log("   - " + type.type.name);
        }

    } catch (error: any) {
        console.log("An error has occurred in inspect: " + error.message);
    }

    state.rl.prompt();
}
