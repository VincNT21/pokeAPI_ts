import { State } from "./state.js";


export function startREPL(state: State) {
    // Use the interface's .prompt() to display the prompt
    state.rl.prompt();
    
    // Use the interface's .on("line", callback) to listen for input
    state.rl.on("line", async (input: string) => {
        // "clean" the input and get an array of words
        const words = cleanInput(input);
        if (words.length === 0) {
            state.rl.prompt();
            return;
        }

        // Check if given command is available
        const commandName = words[0];
        const args = words.slice(1);

        const cmd = state.commands[commandName];

        if (!cmd) {
            console.log(`Unknown command: "${commandName}". Type "help" for a list of commands.`);
            state.rl.prompt();
            return;
        }

        try {
            await cmd.callback(state, ...args);
        } catch (err) {
            console.log((err as Error).message);
        }
        state.rl.prompt();
    });
}

export function cleanInput(input: string): string[] {
    const inputSlice = input.split(" ");
    const outputSlice: string[] = [];
    for (let word of inputSlice) {
        const cleanWord = word.toLowerCase().trim();
        if (cleanWord != "") {
            outputSlice.push(cleanWord);
        }
    }
    return outputSlice;
}

