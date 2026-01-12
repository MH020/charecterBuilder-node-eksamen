import { get, writable } from "svelte/store";
import { fetchPost, fetchUpdate } from "../../util/fetchUtil";
import { user } from "./userStore";

export const activeTabStore = writable("overview");
export const buildingSheet = writable(false)
export const baseSheet = writable(null);
export const selectedRace = writable(null);
export const selectedLineage = writable(null);
export const Selectedcharacteristics = writable([null]);
export const Selectedclass = writable(null);
export const SelectedApptitudes = writable([]);
export const selectedSkills = writable([]);

export const createdSheet = writable(null);


export function postSheet () {
    const newSheet = {
        baseSheet: get(baseSheet),
        race: get(selectedRace),
        lineage: get(selectedLineage),
        characteristics: get(Selectedcharacteristics),
        clss: get(Selectedclass),
        apptitudes: get(SelectedApptitudes),
        skills: get(selectedSkills)
    }
    if (get(createdSheet) === null) {
        console.log(newSheet)
        fetchPost(`/api/charectersheets`, newSheet)
    } else {
        console.log(newSheet)
        fetchUpdate(`/api/charectersheets`, newSheet)
    }
}