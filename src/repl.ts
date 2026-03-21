import { State } from "./state.js";

export function cleanInput(input: string): string[] {
	input = input.trim();
	return input.toLowerCase().split(" ").filter(c => c !== "");
}

export function startRepl(state: State): void {
	state.rl.prompt();
	state.rl.on("line", (input: string) => {
		let words = cleanInput(input);
		if (words.length === 0) {
			state.rl.prompt();
			return;
		}
		if (words[0] in state.cmds) {
			for (const cmd in state.cmds) {
				if (cmd === words[0]) {
					state.cmds[cmd].callback(state);
				}
			}
		} else {
			console.log("Unknown command");
		}

		state.rl.prompt();
	});
}

