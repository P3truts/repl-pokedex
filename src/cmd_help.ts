import { CLICommand } from "./command.js";

export function displayCommands(commands: Record<string, CLICommand>): void {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n");
    for (const cmd in commands) {
        console.log(`${cmd}: ${commands[cmd].description}`);
    }
}
