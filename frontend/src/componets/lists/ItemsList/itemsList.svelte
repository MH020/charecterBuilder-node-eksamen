<script>
    import { onMount } from 'svelte';
    import { fetchGet } from '../../../../util/fetchUtil';
    import { deleteEntity } from '../../../../util/ListUtil';
    import ItemsRow from '../../rows/ItemsRow.svelte';
    import ListUtil from '../../util/ListUtil.svelte';

    let items = [];
    let sortType = "asc";
    let endpoint = "/api/items"

    onMount(async () => {
        const response = await fetchGet(endpoint);
        if (response.status === 200) {
            items = response.data;
            console.log(items)
        }
    });

    function createItem() {
        const newItem = {
            id: null,  
            name: "",  
            description: "",
            category: {},
            availability: {},
            isNew: true

        };
        items = [...items, newItem];
    }


</script>

<ListUtil
    bind:list={items}
    endpoint= {endpoint}
    createRow={createItem}
    let:item
    let:onSave
    let:onDelete
>
    <ItemsRow
        item={item}
        onSave={onSave}
        onDelete={onDelete}
        endpoint={endpoint}
    />
</ListUtil>

