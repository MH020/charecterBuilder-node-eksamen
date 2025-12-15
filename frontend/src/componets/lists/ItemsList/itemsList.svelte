<script>
    import { onMount } from 'svelte';
    import { fetchGet } from '../../../../util/fetchUtil';
    import { deleteEntity } from '../../../../util/ListUtil';
    import ItemsRow from '../../rows/ItemsRow.svelte';

    let items = [];
    let sortType = "asc";

    onMount(async () => {
        const response = await fetchGet("/api/items");
        if (response.status === 200) {
            items = response.data;
            console.log(items)
        }
    });

    function toggleSort() {
        sortType = sortType === "asc" ? "desc" : "asc";
    }

    $: sortedItems = [...items].sort((a, b) => {
        if (!a.name || !b.name) return 0;
        return sortType === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
    });

    function createItem() {
        const newItem = {
            id: null,  
            name: "",  
            description: "",
            category: {},
            availability: {},
            isNew: true

        };
        items = [...items, newItem];
    }

    async function deleteItem(id, isNew = false) {
        if(isNew){

            items = items.filter(weaponTrait => weaponTrait.id !== id);
            return;
        }
        
        items = await deleteEntity(id,"/api/items",items);
    }

    function updateItems(updated) {
        items = items.map((item) => {
            if (item.isNew) {
                return { ...updated, isNew: false };
            }

            if (item.id === updated.id) {
                return { ...item, ...updated };
            }

            return item;
        });
    }

    //sorting needed 


</script>

<div class="button-panel">
    <button on:click={toggleSort}>
        sort by... {sortType === "all" ? "A -> Z" : "Z -> A"}
    </button>
    <button on:click={createItem}>
        new Weapon trait
    </button>
</div>


{#each items as item (item.id)}
        <ItemsRow {item}
        onSave={updateItems}
        onDelete={deleteItem}
    />
{/each}
