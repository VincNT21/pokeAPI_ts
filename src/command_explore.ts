import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("you must provide a location name");
    }
    const location = args[0];
    const locationDetails = await state.pokeAPI.fetchLocation(location);

    console.log(`Exploring ${location}...`)
    console.log("Found Pokemon:")

    for (const enc of locationDetails.pokemon_encounters) {
        console.log(` - ${enc.pokemon.name}`)
    }

}