import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("you must provide a pokemon name");
    }

    const pokeName = args[0];
    const pokeDetails = await state.pokeAPI.fetchPokemon(pokeName);

    console.log(`Throwing a Pokeball at ${pokeName}...`);

    const res = Math.floor(Math.random() * pokeDetails.base_experience);
    if (res < 40) {
        console.log(`${pokeName} was caught!`);
        console.log("You may now inspect it with the inspect command.");
        state.pokedex[pokeName] = pokeDetails;
    } else {
        console.log(`${pokeName} escaped!`);
        return;
    }
}