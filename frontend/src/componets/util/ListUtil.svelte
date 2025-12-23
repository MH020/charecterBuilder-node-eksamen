<script>
    import { deleteEntity } from "../../../util/ListUtil";

    export let list = [];
    export let endpoint;
    export let createRow;

    let sortDir = "desc";

    $: sorted = [...list].sort((a, b) => {
        if (!a.name || !b.name) return 0;
        return sortDir === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
    });

    function toggleSort() {
        sortDir = sortDir === "asc" ? "desc" : "asc";
    }

    async function onDelete(id, isNew) {
        if (isNew) {
            list = list.filter(item => item.id !== id);
        } else {
            list = await deleteEntity(id, endpoint, list);
        }
    }

    function onSave(updated) {
        list = list.map(item =>
            item.isNew ? { ...updated, isNew: false }
            : item.id === updated.id ? { ...item, ...updated }
            : item
        );
    }
</script>

<div class="button-panel">
    <button on:click={toggleSort}>
        Sort {sortDir === "asc" ? "A → Z" : "Z → A"}
    </button>
    <button on:click={createRow}>New</button>
</div>

{#each sorted as item (item.id ?? item)}
    <slot
        item={item}
        onSave={onSave}
        onDelete={onDelete}
    />
{/each}
