<script>
    import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
    import { closeModal, modalSelectCallback, openModal } from "../../store/modalStore";
    import CategoryList from "../lists/categoryList.svelte";

    export let category
    export let deleteCategory
    export let isEditing;

    let editableCategory = {};

    function startEditing(){
        isEditing = true;
        editableCategory = structuredClone(category);

    }

    async function saveEdit(){
        const updated = {...editableCategory };

        if(category.isNew){
            const response = await fetchPost("/api/skills", updated)
            console.log("created?",response)
            if(response.status === 201){
                category = response.created
            }

        } else {
            fetchUpdate("/api/skills",updated);
        }
        isEditing = false
    }

    function cancelEdit() {
        isEditing = false;
        editableCategory = structuredClone(category);
    }


</script>

<div class="row">
  {#if isEditing}
    <div class="cell-box">
      <div class="label">Name</div>
      <input bind:value={editableCategory.name} />
    </div>
    <div class="cell-box">
        <div class="label">description</div>
        <input bind:value={editableCategory.description} />
    </div>

    <div class="cell-box">
        <div class="label">category type</div>
        <input bind:value={editableCategory.category_type} />
    </div>

    <div class="buttons">
        <button on:click={saveEdit}>Save</button>
        
        <button on:click={cancelEdit}>Cancel</button>
    </div>
  {:else}
    <div class="cell-box">
      <div class="label">Name</div>
      <div>{category.name || "----"}</div>
    </div>

    <div class="cell-box">
      <div class="label">description</div>
      <div>{category.description || "----"}</div>
    </div>

    <div class="cell-box">
      <div class="label">category type</div>
      <div>{category.category_type || "----"}</div>
    </div>

    <div class="buttons">
        {#if !$modalSelectCallback}
            <button on:click={() => startEditing()}>Edit</button>
            <button on:click={() => deleteCategory()}>Delete </button>
        {:else}
            <button on:click={() => {$modalSelectCallback(category); closeModal();}}> select</button>
        {/if}
    </div>
  {/if}
</div>


