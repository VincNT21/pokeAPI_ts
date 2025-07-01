import { State } from "./state.js";

export async function commandPokedex(state: State) {
    console.log("Your pokedex:");
    for (const pokemon of Object.values(state.pokedex)) {
        console.log("   - ", pokemon.name);
    }
}