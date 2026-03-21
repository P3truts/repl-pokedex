import { createInterface, type Interface } from "node:readline/promises";
import { displayCommands } from "./cmd_help.js";
import { commandExit } from "./cmd_exit.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
};

export type State = {
    rl: Interface,
    cmds: Record<string, CLICommand>;
};

export function getCommands(): Record<string, CLICommand> {
    return {
        help: {
            name: "help",
            description: "Displays a help message",
            callback: displayCommands,
        },
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: commandExit,
        },
    };
}

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "REPL-Pokedex > "
    });

    const cmds = getCommands();

    return {
        rl,
        cmds
    };
}
