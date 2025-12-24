<script>
    import { onMount } from 'svelte';
    import { fetchGet } from '../../../../util/fetchUtil';
    import { deleteEntity, saveEntity } from '../../../../util/ListUtil';
    import WeaponTraitsRow from '../../rows/WeaponTraitsRow.svelte';
    import ListUtil from '../../wrappers/EditableList.svelte';



    let weaponTraits = [];
    let sortType = "all"; 
    const endpoint = "/api/weapon/traits"

 
    onMount(async () => {
        const response = await fetchGet(endpoint)
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

</script>

<ListUtil
    bind:list={weaponTraits}
    endpoint= {endpoint}
    createRow={createWeaponTraits}
    let:item
    let:onSave
    let:onDelete
>
    <WeaponTraitsRow
        weaponTrait={item}
        onSave={onSave}
        onDelete={onDelete}
        endpoint={endpoint}
    />
</ListUtil>





