import { writable } from "svelte/store";

export const modalStore = writable({
    show: false,
    Component: null
})

export function openModal(Component) {
    modalStore.set({
        show: true,
        Component
    });
}

export function closeModal() {
    modalStore.set({
        show: false,
        Component: null
    });
}

export const modalSelectCallback = writable(null);