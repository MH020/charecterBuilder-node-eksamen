import { writable } from "svelte/store";

export const modalStore = writable({
    show: false,
})

export function openModal() {
    modalStore.set({
        show: true,
    });
}

export function closeModal() {
    modalStore.set({
        show: false
    });
}

export const modalSelectCallback = writable(null);