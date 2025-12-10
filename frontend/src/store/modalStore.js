import { writable } from "svelte/store";

export const modalStore = writable({
    show: false,
    Component: null
})

export function openModal(component) {
    modalStore.set({
        show: true,
        Component: component
    });

}

export function closeModal() {
    modalStore.set({
        show: false,
        Component: null
    });
}

export const modalSelectCallback = writable(null);