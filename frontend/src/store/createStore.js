import { get, writable } from "svelte/store";
import { fetchPost, fetchUpdate } from "../../util/fetchUtil";
import { user } from "./userStore";

export const activeTabStore = writable("overview");
export const buildingSheet = writable(false)
export const selectedName = writable(null);
export const selectedLevel = writable(null);
export const selectedRace = writable(null);
export const selectedLineage = writable(null);
export const Selectedcharacteristics = writable([null]);
export const Selectedclass = writable(null);
export const SelectedApptitudes = writable([]);
export const selectedSkills = writable([]);

export const createdSheet = writable([]);


export function postSheet () {
    let currentUser = get(user)
    const newSheet = {
        level: get(selectedLevel),
        race: get(selectedRace),
        lineage: get(selectedLineage),
        characteristics: get(Selectedcharacteristics),
        class: get(Selectedclass),
        apptitudes: get(SelectedApptitudes),
        skills: get(selectedSkills)
    }
    if (get(createdSheet) === null) {
        fetchPost(`api/user/${currentUser.id}/charectersheet`, newSheet)
    } else {
        fetchUpdate(`api/user/${currentUser.id}/charectersheet`, newSheet)
    }

}