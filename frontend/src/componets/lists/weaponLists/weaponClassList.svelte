<script>
    import { onMount } from 'svelte';
    import { fetchGet } from '../../../../util/fetchUtil';
    import WeaponClassRow from '../../rows/weaponClassRow.svelte';
    import { deleteEntity } from '../../../../util/ListUtil';
    import ListUtil from '../../util/ListUtil.svelte';

    let weaponClasses = [];
    let sortType = "all"; 
    const endpoint = "/api/weapon/classes"


 
    onMount(async () => {
        const response = await fetchGet(endpoint)
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


</script>

<ListUtil
    bind:list={weaponClasses}
    endpoint={endpoint}
    createRow={createWeaponClass}
    RowComponent={WeaponClassRow}
/>




