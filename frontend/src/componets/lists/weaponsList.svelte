<script>
    import { onMount } from 'svelte';
    import WeaponsRow from '../rows/weaponsRow.svelte';
    import { fetchDelete, fetchGet } from '../../../util/fetchUtil';
    import toastrDisplayHTTPCode from '../../../util/ToastrUtil';


    let weapons = [];
    let sortType = "all"; 
    let sortedWeapons= [];

    onMount(async () => {
        const response = await fetchGet("/api/weapons")
        if (response.status === 200) {
            weapons = response.data
        } 
    });

    function createWeapon(){
        const newWeapon = {
            weapon_class: null, 
            id: null,         
            type: "", 
            category: null, 
            name: "", 
            hands: "", 
            rof: "",
            damage: "", 
            pen: "", 
            clip: "",
            reload: "", 
            wt: "", 
            availability: null, 
            projectile: null, 
            is_custom: true,
            isNew: true
        };
        weapons = [...weapons, newWeapon];
        console.log(weapons)
    }

    async function deleteWeapon(weapon){
        const response = await fetchDelete("/api/skills", weapon.id)
        toastrDisplayHTTPCode(response.status, response.message)
        if (response.status === 200){
            weapons = weapons.filter(weapon => weapon.id !== weapon.id)
        }
    }

    //sorting needed 

    function toggleSort() {

    }
</script>

<div class="button-panel">
    <button on:click={toggleSort}>
        Sort {sortType === "all" ? "A -> Z" : "Z -> A"}
    </button>
    <button on:click={createWeapon}>
        new skill 
    </button>
</div>

<div>
    {#each sortedWeapons as weapon (weapon.id)}
        <WeaponsRow weapon={weapon} 
        deleteWeapon={() => deleteWeapon(weapon)}
        isEditing={weapon.isNew}/>
    {/each}
</div>




