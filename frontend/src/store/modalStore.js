import { writable } from "svelte/store";

export const modalStore = writable([]);


export function openModal(page, data = {}) {
  modalStore.update(stack => [...stack, { page, data }]);
}

export function closeModal() {
  modalStore.update(stack => stack.slice(0, -1)); 
}