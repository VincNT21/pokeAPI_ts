import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";

// Create a "registry" of commands.
export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
}

// Create a State type that will store the readline Interface and the commands Record
export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
}

export function initState(): State {
    // Create an Interface for reading input.
    // https://nodejs.org/api/readline.html#readlinecreateinterfaceoptions
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });

    return {
        rl: rl,
        commands: getCommands(),
    };
}
