<script>
    import { onMount } from "svelte";
    import { fetchDelete, fetchGet } from "../../../../util/fetchUtil";
    import toastrDisplayHTTPCode from "../../../../util/ToastrUtil";
    import CategoryRow from "../../rows/CategoryRow.svelte";

    let categoryies = [];
    let sortType = "all";

    onMount(async () => {
        const response = await fetchGet("/api/Category");
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

    async function deleteCategory(category) {
        if (!category.id) {
            categoryies = categoryies.filter((c) => c !== category);
            return;
        }

        const response = await fetchDelete("/api/category", category.id);
        toastrDisplayHTTPCode(response.status, response.message);
        if (response.status === 200) {
            categoryies = categoryies.filter((c) => c.id !== category.id);
        }
    }

    function updateCategory(updated) {
        categoryies = categoryies.map((category) => {
            if (category.isNew) {
                return { ...updated, isNew: false };
            }

            if (category.id === updated.id) {
                return { ...category, ...updated };
            }

            return category;
        });
    }

    //sorting needed

    function toggleSort() {}
</script>

<div class="button-panel">
    <button on:click={toggleSort}>
        sort by... {sortType === "all" ? "A -> Z" : "Z -> A"}
    </button>
    <button on:click={createCategory}> new category </button>
</div>

<div>
    {#each categoryies as category (category.id)}
        <CategoryRow
            {category}
            onDelete={deleteCategory}
            onSave={updateCategory}
        />
    {/each}
</div>
