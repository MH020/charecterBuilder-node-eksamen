<script>
    import { onMount } from "svelte";
    import { fetchGet } from "../../../../util/fetchUtil";
    import { deleteEntity } from "../../../../util/ListUtil";
    import CraftsmanshipRow from "../../rows/craftsmanshipRow.svelte";
    import ListUtil from "../../util/ListUtil.svelte";
    

    let craftmanships = [];
    let sortType = "asc";
    let endpoint = "/api/craftsmanship"

    onMount(async () => {
        const response = await fetchGet(endpoint);
        if (response.status === 200) {
            craftmanships = response.data;
        }
    });

    function createCraftmanship() {
        const newCraftmanship = {
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
        craftmanships = [...craftmanships, newCraftmanship];
    }

</script>

<ListUtil
    bind:list={craftmanships}
    endpoint= {endpoint}
    createRow={createCraftmanship}
    let:item
    let:onSave
    let:onDelete
>
    <CraftsmanshipRow
        craftmanship={item}
        onSave={onSave}
        onDelete={onDelete}
        endpoint={endpoint}
    />
</ListUtil>
