import { writable } from "svelte/store";

export const modalStore = writable({
    show: false,
    page: null,
    data: null
})

export function openModal(page, data) {
    modalStore.set({
        show: true,
        page,
        data
    });
}

export function closeModal() {
    modalStore.set({
        show: false,
        page: null,
        data: null
    });
}