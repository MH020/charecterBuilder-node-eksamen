<script>
    import { onMount } from 'svelte';
    import { fetchDelete, fetchGet } from '../../../../util/fetchUtil';
    import toastrDisplayHTTPCode from '../../../../util/ToastrUtil';
    import AvailabilityRow from '../../rows/availabilityRow.svelte';
    import { deleteEntity, saveEntity } from '../../../../util/ListUtil';
    import ItemsRow from '../../rows/ItemsRow.svelte';

    let items = [];
    let sortType = "asc";

    onMount(async () => {
        const response = await fetchGet("/api/items");
        if (response.status === 200) {
            items = response.data;
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
            isNew: true

        };
        items = [...items, newItem];
    }

    async function deleteItem(id, isNew = false) {
        if(isNew){

            items = items.filter(weaponTrait => weaponTrait.id !== id);
            return;
        }
        
        items = await deleteEntity(id,"/api/weapon/traits",items);
    }

    function saveWeaponTrait(updated) {
        items = saveEntity(updated, items);
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
        <ItemsRow item={weaponTrait}
        onSave={saveWeaponTrait}
        onDelete={deleteItem}
    />
{/each}
