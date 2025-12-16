<script>
    import { onMount } from "svelte";
    import { fetchGet } from "../../../../util/fetchUtil";
    import { deleteEntity } from "../../../../util/ListUtil";
    import CraftsmanshipRow from "../../rows/craftsmanshipRow.svelte";
    

    let craftmanships = [];
    let sortType = "asc";

    onMount(async () => {
        const response = await fetchGet("/api/craftsmanship");
        if (response.status === 200) {
            craftmanships = response.data;
            console.log(craftmanships);
        }
    });

    function toggleSort() {
        sortType = sortType === "asc" ? "desc" : "asc";
    }

    $: sortedItems = [...craftmanships].sort((a, b) => {
        if (!a.name || !b.name) return 0;
        return sortType === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
    });

    function createCraftmanship() {
        const newCraftmanship = {
            id: null,
            name: "",
            description: "",
            hit_modifier: 0,
            damage_modifier: 0,
            wt_modifier: 0,
            ap_modifier: 0,
            category: "",
            isNew: true,
        };
        craftmanships = [...craftmanships, newCraftmanship];
    }

    async function deleteCraftmanship(id, isNew = false) {
        if (isNew) {
            craftmanships = craftmanships.filter(
                (weaponTrait) => weaponTrait.id !== id,
            );
            return;
        }

        craftmanships = await deleteEntity(
            id,
            "/api/craftsmanship",
            craftmanships,
        );
    }

    function updateCraftmanship(updated) {
        craftmanships = craftmanships.map((item) => {
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

@ -0,0 +1,90 @@
<div class="button-panel">
    <button on:click={toggleSort}>
        sort by... {sortType === "all" ? "A -> Z" : "Z -> A"}
    </button>
    <button on:click={createCraftmanship}> new Weapon trait </button>
</div>

{#each craftmanships as craftmanship (craftmanship.id)}
    <CraftsmanshipRow
        {craftmanship}
        onSave={updateCraftmanship}
        onDelete={deleteCraftmanship}
    />
{/each}
