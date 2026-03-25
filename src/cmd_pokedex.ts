import { State } from "./state.js";

export async function pokedexCmd(state: State): Promise<void> {
    if (Object.keys(state.pokedex).length === 0) {
        console.log("Your Pokedex is empty!");
    } else {
        console.log("Your Pokedex:");
        for (const pokemon of Object.keys(state.pokedex)) {
            console.log(` - ${pokemon}`);
        }
    }

    state.rl.prompt();
}
