<script>
    import { onMount } from "svelte";
    import { fetchDelete, fetchGet } from "../../../../util/fetchUtil";
    import toastrDisplayHTTPCode from "../../../../util/ToastrUtil";
    import CategoryRow from "../../rows/CategoryRow.svelte";
    import ListUtil from "../../util/ListUtil.svelte";

    let categoryies = [];
    let endpoint = "/api/Category"

    onMount(async () => {
        const response = await fetchGet(endpoint);
        if (response.status === 200) {
            categoryies = response.data;
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
        categoryies = [...categoryies, newCategory];
    }

</script>

<ListUtil
    bind:list={categoryies}
    endpoint={endpoint}
    createRow={createCategory}
    RowComponent={CategoryRow}
/>
