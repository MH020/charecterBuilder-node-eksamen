<script>
    import { onMount } from "svelte";
    import { fetchGet } from "../../../../util/fetchUtil";
    import { deleteEntity } from "../../../../util/ListUtil";
    import CraftsmanshipRow from "../../rows/craftsmanshipRow.svelte";
    import ListUtil from "../../wrappers/EditableList.svelte";
    

    let craftsmanships = [];
    let sortType = "asc";
    let endpoint = "/api/craftsmanship" //refactor

    onMount(async () => {
        const response = await fetchGet(endpoint);
        if (response.status === 200) {
            craftsmanships = response.data;
        }
    });

    function createCraftmanship() {
        const newCraftsmanship = {
            id: null,
            name: "",
            description: "",
            hit_modifier: 0,
            damage_modifier: 0,
            wt_modifier: 0,
            ap_modifier: 0,
            category: "",
            isNew: true,
        };
        craftsmanships = [...craftsmanships, newCraftsmanship];
    }

</script>

<ListUtil
    bind:list={craftsmanships}
    endpoint= {endpoint}
    createRow={createCraftmanship}
    let:item
    let:onSave
    let:onDelete
>
    <CraftsmanshipRow
        craftsmanship={item}
        onSave={onSave}
        onDelete={onDelete}
        endpoint={endpoint}
    />
</ListUtil>
