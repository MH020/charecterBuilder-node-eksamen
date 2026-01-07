<script>
    import { onMount } from 'svelte';
    import { fetchGet } from '../../../../util/fetchUtil';
    import ListUtil from '../../wrappers/EditableList.svelte';
    import PowerCategoryRow from '../../rows/powerCategoryRow.svelte';

    let classCategories = [];
    let endpoint = "/api/power-categories"

    onMount(async () => {
        const response = await fetchGet(endpoint);
        console.log(response)
        if (response.status === 200) {
            classCategories = response.data;
        }
    });

    function createPowersCategory() {
        const newPowerCategory = {
            id: null,  
            name: "",
            isNew: true
        };
        classCategories = [...classCategories, newPowerCategory];
    }

</script>

<ListUtil
    bind:list={classCategories}
    endpoint= {endpoint}
    createRow={createPowersCategory}
    let:item
    let:onSave
    let:onDelete
>
    <PowerCategoryRow
        powerCategory={item}
        onSave={onSave}
        onDelete={onDelete}
        endpoint={endpoint}
    />
</ListUtil>

