<script>
    import { onMount } from 'svelte';
    import { fetchDelete, fetchGet } from '../../../../util/fetchUtil';
    import toastrDisplayHTTPCode from '../../../../util/ToastrUtil';
    import WeaponClassRow from '../../rows/weaponClassRow.svelte';

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
            name: "null",        
            description: "", 
            isNew: true

        };
        weaponTraits = [...weaponTraits, newWeaponTrait];
    }

    async function deleteWeaponTrait(id){
        const response = await fetchDelete("/api/weapon/traits", id)
        toastrDisplayHTTPCode(response.status, response.message)
        if (response.status === 200){
            weaponTraits = weaponTraits.filter(weaponTrait => weaponTrait.id !== id)
        }
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

<div>
    {#each weaponTraits as weaponClass (weaponClass.id)}
        <WeaponClassRow weaponClass={weaponClass} 
        deleteWeaponClass={() => deleteWeaponTrait(weaponClass)}
        isEditing={weaponClass.isNew}/>
    {/each}
</div>




