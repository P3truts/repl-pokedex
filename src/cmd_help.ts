import { State } from "./state.js";

export function displayCommands(state: State): void {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n");
    for (const cmd in state.cmds) {
        console.log(`${cmd}: ${state.cmds[cmd].description}`);
    }
}
