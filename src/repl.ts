import { createInterface } from "node:readline";
import { CLICommand } from "./command.js";
import { displayCommands } from "./cmd_help.js";
import { commandExit } from "./cmd_exit.js";

export function cleanInput(input: string): string[] {
	input = input.trim();
	return input.toLowerCase().split(" ").filter(c => c !== "");
}

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: "REPL-Pokedex > "
});

export function startRepl(): void {
	rl.prompt();
	rl.on("line", (input: string) => {
		let words = cleanInput(input);
		if (words.length === 0) {
			rl.prompt();
			return;
		}
		const cmds = getCommands();
		if (words[0] in cmds) {
			for (const cmd in cmds) {
				if (cmd === words[0]) {
					cmds[cmd].callback(cmds);
				}
			}
		} else {
			console.log("Unknown command");
		}

		rl.prompt();
	});
}

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
