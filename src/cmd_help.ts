import { State } from "./state.js";

export async function displayCommands(state: State): Promise<void> {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n");
    for (const cmd in state.cmds) {
        console.log(`${cmd}: ${state.cmds[cmd].description}`);
    }

    state.rl.prompt();
}
