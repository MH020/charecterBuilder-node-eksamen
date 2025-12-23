<script>
    import { deleteEntity } from "../../../util/ListUtil";


    export let list = []; 
    let sortType = "all";
    let sortedList = [];
    export let endpoint 
    export let createRow
    export let RowComponent


    async function deleteTalent(id, isNew = false) {
        if (isNew) {
            list = list.filter(
                (item) => item.id !== id,
            );
            return;
        }
        list = await deleteEntity(id, endpoint, list);
    }

    $: if (list) {
        sortedList = [...list].sort((a, b) => {
            if (sortType === "all") {
                if (a.name < b.name) {
                    return 1;
                }
                if (a.name > b.name) {
                    return -1;
                }
                return 0;
            } else {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            }
        });
    }

    function updateTalents(updated) {
        list = list.map((item) => {
            if (item.isNew) {
                return { ...updated, isNew: false };
            }

            if (item.id === updated.id) {
                return { ...item, ...updated };
            }

            return item;
        });
    }

    function toggleSort() {
        sortType = sortType === "all" ? "asc" : "all";
    }
</script>

<div class="button-panel">
    <button on:click={toggleSort}>
        Sort {sortType === "all" ? "A -> Z" : "Z -> A"}
    </button>
    <button on:click={createRow}> new talent </button>
</div>

<div>
    {#each sortedList as item (item.id)}
        <RowComponent
            rowItem={item}
            onSave={updateTalents}
            onDelete={deleteTalent}
            endpoint={endpoint}
        />
    {/each}
</div>