<script>
    import { onMount } from 'svelte';
    import WeaponsRow from '../../rows/weaponsRow.svelte';
    import { fetchGet } from '../../../../util/fetchUtil';
    import { deleteEntity} from '../../../../util/ListUtil';
    import ListUtil from '../../wrappers/EditableList.svelte';
    import WeaponClassRow from '../../rows/weaponClassRow.svelte';

    let weapons = [];
    let sortType = "all"; 
    const endpoint = "/api/weapons"

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
</script>

<ListUtil
    bind:list={weapons}
    endpoint= {endpoint}
    createRow={createWeapon}
    let:item
    let:onSave
    let:onDelete
>
    <WeaponsRow
        weapon={item}
        onSave={onSave}
        onDelete={onDelete}
        endpoint={endpoint}
    />
</ListUtil>





