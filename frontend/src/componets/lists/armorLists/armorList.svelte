<script>
    import { onMount } from 'svelte';
    import { fetchGet } from '../../../../util/fetchUtil';
    import { deleteEntity } from '../../../../util/ListUtil';
    import ArmorRow from '../../rows/armorRow.svelte';

    let armors = [];
    let sortType = "asc";

    onMount(async () => {
        const response = await fetchGet("/api/armor");
        if (response.status === 200) {
            armors = response.data;
        }
    });

    function toggleSort() {
        sortType = sortType === "asc" ? "desc" : "asc";
    }

    $: sortedArmors = [...armors].sort((a, b) => {
        if (!a.name || !b.name) return 0;
        return sortType === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
    });

    function createItem() {
        const newArmor = {
            id: null,  
            name: "",  
            description: "",
            head_ap: 0,
            body_ap: 0,
            right_arm_ap: 0, 
            left_arm_ap: 0, 
            right_leg_ap: 0, 
            left_leg_ap: 0, 
            wt: 0,  
            availability: {},
            isNew: true

        };
        armors = [...armors, newArmor];
    }

    async function deleteArmor(id, isNew = false) {
        if(isNew){

            armors = armors.filter(armor => armor.id !== id);
            return;
        }
        
        armors = await deleteEntity(id,"/api/items",armors);
    }

    function updateItems(updated) {
        armors = armors.map((armor) => {
            if (armor.isNew) {
                return { ...updated, isNew: false };
            }

            if (armor.id === updated.id) {
                return { ...armor, ...updated };
            }

            return armor;
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


{#each armors as armor (armor.id)}
        <ArmorRow {armor}
        onSave={updateItems}
        onDelete={deleteArmor}
    />
{/each}
