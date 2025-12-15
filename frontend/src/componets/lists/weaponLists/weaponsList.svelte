<script>
    import { onMount } from 'svelte';
    import WeaponsRow from '../../rows/weaponsRow.svelte';
    import { fetchGet } from '../../../../util/fetchUtil';
    import { deleteEntity} from '../../../../util/ListUtil';

    let weapons = [];
    let sortType = "all"; 

    onMount(async () => {
        const response = await fetchGet("/api/weapons")
        if (response.status === 200) {
            weapons = response.data
        } 
    });

    function createWeapon() {
        const newWeapon = {
        id: null,
        type: "",
        category: {},       
        name: "",
        hands: "",
        rof: "",
        damage: "",
        pen: "",
        clip: "",
        reload: "",
        wt: "",
        availability: {},   
        projectile: null,
        classes: [],        
        traits: [],         
        is_custom: true,
        isNew: true
        };
        weapons = [...weapons, newWeapon];
        console.log(weapons)
    }

    async function deleteWeapon(id, isNew = false) {
        if(isNew){

            weapons = weapons.filter(weaponTrait => weaponTrait.id !== id);
            return;
        }
        weapons = await deleteEntity(id,"/api/weapon/traits",weapons);
    }

        function updateWeapons(updated) {
        weapons = weapons.map((weapon) => {
            if (weapon.isNew) {
                return { ...updated, isNew: false };
            }

            if (weapon.id === updated.id) {
                return { ...weapon, ...updated };
            }

            return weapon;
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
    <button on:click={createWeapon}>
        new weapon 
    </button>
</div>

<div>
    {#each weapons as weapon (weapon.id)}
        <WeaponsRow {weapon} 
        onSave={updateWeapons}
        onDelete={deleteWeapon}
        />
    {/each}
</div>




