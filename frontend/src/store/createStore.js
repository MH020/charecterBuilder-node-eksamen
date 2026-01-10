import { writable } from "svelte/store";

export const activeTabStore = writable("overview");
export const buildingSheet = writable(false)

export const selectedRace = writable(null);
export const selectedLineage = writable(null);
export const Selectedcharacteristics = writable(null);