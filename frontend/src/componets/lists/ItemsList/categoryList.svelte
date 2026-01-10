<script>
    import { onMount } from "svelte";
    import { fetchDelete, fetchGet } from "../../../../util/fetchUtil";
    import toastrDisplayHTTPCode from "../../../../util/ToastrUtil";
    import CategoryRow from "../../rows/CategoryRow.svelte";
    import ListUtil from "../../wrappers/EditableList.svelte";

    let categories = [];
    let endpoint = "/api/Category" //refactor

    onMount(async () => {
        const response = await fetchGet(endpoint);
        if (response.status === 200) {
            categories = response.data;
        }
    });

    function createCategory() {
        const newCategory = {
            id: null,
            name: "",
            description: "",
            category_type: "",
            isNew: true,
        };
        categories = [...categories, newCategory];
    }

</script>

<ListUtil
    bind:list={categories}
    endpoint= {endpoint}
    createRow={createCategory}
    let:item
    let:onSave
    let:onDelete
>
    <CategoryRow
        category={item}
        onSave={onSave}
        onDelete={onDelete}
        endpoint={endpoint}
    />
</ListUtil>
