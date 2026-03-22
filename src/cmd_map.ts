import { State } from "./state.js";

let back: boolean = false;

export async function map(state: State): Promise<void> {
    let locationURL = "location-area";
    if (state.nextLocationsURL && !back) {
        locationURL = state.nextLocationsURL;
    } else if (state.prevLocationsURL && back) {
        locationURL = state.prevLocationsURL;
        back = false;
    }

    try {
        const res = await state.pokeapi.fetchLocations(locationURL);

        state.nextLocationsURL = res.next;
        state.prevLocationsURL = res.previous;

        if (res.results && res.results.length > 0) {
            for (const location of res.results) {
                console.log(location.name);
            }
        }
    } catch (error: any) {
        console.log("An error has occurred in map: " + error.message);
    }

    state.rl.prompt();
}

export async function mapb(state: State): Promise<void> {
    if (state.prevLocationsURL === null) {
        console.log("You're on the first page!");

        state.rl.prompt();

        return;
    }
    back = true;
    await map(state);
}
