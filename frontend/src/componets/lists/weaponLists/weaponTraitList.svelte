<script>
    import { onMount } from 'svelte';
    import { fetchGet } from '../../../../util/fetchUtil';
    import { deleteEntity, saveEntity } from '../../../../util/ListUtil';
    import WeaponTraitsRow from '../../rows/WeaponTraitsRow.svelte';



    let weaponTraits = [];
    let sortType = "all"; 

 
    onMount(async () => {
        const response = await fetchGet("/api/weapon/traits")
        if (response.status === 200) {
                weaponTraits = response.data
        } 
    });



    function createWeaponTraits(){
        const newWeaponTrait = {
            id: null,  
            name: "",        
            description: "", 
            isNew: true

        };
        weaponTraits = [...weaponTraits, newWeaponTrait];
    }

    async function deleteWeaponTrait(id, isNew = false) {
        if(isNew){

            weaponTraits = weaponTraits.filter(weaponTrait => weaponTrait.id !== id);
            return;
        }
        weaponTraits = await deleteEntity(id,"/api/weapon/traits",weaponTraits);
    }

    function updateWeaponTrait(updated) {
        weaponTraits = weaponTraits.map((weaponTrait) => {

            if (weaponTrait.isNew) {
                return {...updated, isNew: false};
            }

            if (weaponTrait.id === updated.id) {
                return {...weaponTrait,...updated};
            }


            return weaponTrait;
        });
    }

    
    //sorting needed 

    function toggleSort() {

    }
</script>

<div class="button-panel">
    <button on:click={toggleSort}>
        sort by... {sortType === "all" ? "A -> Z" : "Z -> A"}
    </button>
    <button on:click={createWeaponTraits}>
        new Weapon trait
    </button>
</div>


{#each weaponTraits as weaponTrait (weaponTrait.id)}
        <WeaponTraitsRow {weaponTrait}
        onSave={updateWeaponTrait}
        onDelete={deleteWeaponTrait}
    />
{/each}





