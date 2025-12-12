<script>
    import { onMount } from 'svelte';
    import { fetchDelete, fetchGet } from '../../../../util/fetchUtil';
    import toastrDisplayHTTPCode from '../../../../util/ToastrUtil';
    import WeaponClassRow from '../../rows/weaponClassRow.svelte';

    let weaponClasses = [];
    let sortType = "all"; 
    let sortedClasses= [];

 
    onMount(async () => {
        const response = await fetchGet("/api/weapon/classes")
        if (response.status === 200) {
                weaponClasses = response.data
        } 
    });



    function createWeaponClass(){
        const newWeaponClass = {
            id: null,  
            name: "null",        
            description: "", 
            category_type: "", 
            isNew: true

        };
        weaponClasses = [...weaponClasses, newWeaponClass];
    }

    async function deleteWeaponClass(weaponClass){
        const response = await fetchDelete("/api/category", weaponClass.id)
        toastrDisplayHTTPCode(response.status, response.message)
        if (response.status === 200){
            weaponClasses = weaponClasses.filter(wc => wc.id !== weaponClass.id)
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
    <button on:click={createWeaponClass}>
        new WeaponClass 
    </button>
</div>

<div>
    {#each weaponClasses as weaponClass (weaponClass.id)}
        <WeaponClassRow weaponClass={weaponClass} 
        deleteWeaponClass={() => deleteWeaponClass(weaponClass)}
        isEditing={weaponClass.isNew}/>
    {/each}
</div>




