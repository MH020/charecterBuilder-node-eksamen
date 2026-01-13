<script>
    import { onMount } from 'svelte';
    import WeaponsRow from '../../rows/weaponsRow.svelte';
    import { fetchGet } from '../../../../util/fetchUtil';
    import ListUtil from '../../wrappers/EditableList.svelte';
   

    let weapons = [];
    let sortType = "all"; 
    const endpoint = "/api/weapons"

    onMount(async () => {
        const response = await fetchGet(endpoint)
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





