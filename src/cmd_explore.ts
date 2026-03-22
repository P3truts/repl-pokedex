import { State } from "./state.js";

export async function explore(state: State, locName: string): Promise<void> {
    let locationName = "#";
    if (locName) {
        locationName = locName;
    } else {
        console.log("Location name incorrect. Please try again!");
        state.rl.prompt();
        return;
    }

    try {
        console.log(`Exploring ${locationName}...`);
        const res = await state.pokeapi.fetchLocation(locationName);

        if (res.pokemon_encounters && res.pokemon_encounters.length > 0) {
            console.log("Found Pokemon:");
            for (const pokemon of res.pokemon_encounters) {
                console.log(" - " + pokemon.pokemon.name);
            }
        }
    } catch (error: any) {
        console.log("An error has occurred in explore: " + error.message);
    }

    state.rl.prompt();
}
