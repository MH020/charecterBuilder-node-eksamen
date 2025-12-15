<script>
    import { onMount } from 'svelte';
    import { fetchGet } from '../../../../util/fetchUtil';
    import WeaponClassRow from '../../rows/weaponClassRow.svelte';
    import { deleteEntity } from '../../../../util/ListUtil';

    let weaponClasses = [];
    let sortType = "all"; 


 
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

    async function deleteWeaponClass(id, isNew = false) {
        if(isNew){

            weaponClasses = weaponClasses.filter(weaponClass => weaponClass.id !== id);
            return;
        }
        
        weaponClasses = await deleteEntity(id,"/api/items",weaponClasses);
    }

        function updateWeaponClasses(updated) {
        weaponClasses = weaponClasses.map((wc) => {
            if (wc.isNew) {
                return { ...updated, isNew: false };
            }

            if (wc.id === updated.id) {
                return { ...wc, ...updated };
            }

            return wc;
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
    <button on:click={createWeaponClass}>
        new WeaponClass 
    </button>
</div>

<div>
    {#each weaponClasses as weaponClass (weaponClass.id)}
        <WeaponClassRow {weaponClass} 
        onSave={updateWeaponClasses}
        onDelete={deleteWeaponClass}
        />
    {/each}
</div>




