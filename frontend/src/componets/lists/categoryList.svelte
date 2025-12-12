<script>
    import { onMount } from 'svelte';
    import { fetchDelete, fetchGet } from '../../../util/fetchUtil';
    import toastrDisplayHTTPCode from '../../../util/ToastrUtil';

    export let data = null
    let categoryies = [];
    let sortType = "all"; 
    let sortedWeapons= [];

    if(!data){
        onMount(async () => {
            const response = await fetchGet("/api/Category")
            if (response.status === 200) {
                categoryies = response.data
            } 
        });
    } else {
        categoryies = data
    }


    function createCategory(){
        const newCategory = {
            id: null,  
            name: "null",        
            description: "", 
            category_type: "", 
            isNew: true

        };
        categoryies = [...categoryies, newCategory];
    }

    async function deleteCategory(category){
        const response = await fetchDelete("/api/category", category.id)
        toastrDisplayHTTPCode(response.status, response.message)
        if (response.status === 200){
            categoryies = categoryies.filter(category => category.id !== category.id)
        }
    }

    //sorting needed 

    function toggleSort() {

    }
</script>

<div class="button-panel">
    <button on:click={toggleSort}>
        sort by... {sortType === "all" ? "A -> Z" : "Z -> A"}
    </button>
    <button on:click={createCategory}>
        new weapon 
    </button>
</div>

<div>
    {#each categoryies as category (category.id)}
        <WeaponsRow category={category} 
        deleteWeapon={() => deleteCategory(category)}
        isEditing={category.isNew}/>
    {/each}
</div>




