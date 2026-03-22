import { createInterface, type Interface } from "node:readline/promises";
import { displayCommands } from "./cmd_help.js";
import { commandExit } from "./cmd_exit.js";
import { map, mapb } from "./cmd_map.js";
import { explore } from "./cmd_explore.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    rl: Interface,
    cmds: Record<string, CLICommand>;
    pokeapi: PokeAPI,
    nextLocationsURL?: string,
    prevLocationsURL?: string
};

export function getCommands(): Record<string, CLICommand> {
    return {
        help: {
            name: "help",
            description: "Displays a help message",
            callback: displayCommands,
        },
        map: {
            name: "map",
            description: "Displays top level next pokemon locations",
            callback: map,
        },
        mapb: {
            name: "mapb",
            description: "Diplays top level previous pokemon locations",
            callback: mapb,
        },
        explore: {
            name: "explore",
            description: "Explore location area for pokemons",
            callback: explore,
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
    const pokeAPI = new PokeAPI();
    const nextLocationsURL = "";
    const prevLocationsURL = "";

    return {
        rl: rl,
        cmds: cmds,
        pokeapi: pokeAPI,
        nextLocationsURL: nextLocationsURL,
        prevLocationsURL: prevLocationsURL
    };
}
