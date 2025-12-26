import { writable } from "svelte/store";

export const classDataStore = writable({
    classID: null,
    clss: null
});


export function setCurrentClass(classID) {
  classDataStore.update(store => ({
    ...store,
    classID,
  }));
}