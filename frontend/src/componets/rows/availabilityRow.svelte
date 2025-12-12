<script>
    import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
    import { closeModal, modalSelectCallback, openModal } from "../../store/modalStore";
    import CategoryList from "../lists/ItemsList/categoryList.svelte";

    export let availability
    export let deleteCategory
    export let isEditing;

    let editableAvailability = {};

    function startEditing(){
        isEditing = true;
        editableAvailability = structuredClone(availability);

    }

    async function saveEdit(){
        const updated = {...editableAvailability };

        if(availability.isNew){
            const response = await fetchPost("/api/availability", updated)
            console.log("created?",response)
            if(response.status === 201){
                availability = response.created
            }

        } else {
            fetchUpdate("/api/availability",updated);
        }
        isEditing = false
    }

    function cancelEdit() {
        isEditing = false;
        editableAvailability = structuredClone(availability);
    }


</script>

<div class="row">
  {#if isEditing}
    <div class="cell-box">
      <div class="label">Name</div>
      <input bind:value={editableAvailability.name} />
    </div>

    <div class="buttons">
        <button on:click={saveEdit}>Save</button>
        
        <button on:click={cancelEdit}>Cancel</button>
    </div>
  {:else}
    <div class="cell-box">
      <div class="label">Name</div>
      <div>{availability.name || "----"}</div>
    </div>
    <div class="buttons">
        {#if !$modalSelectCallback}
            <button on:click={() => startEditing()}>Edit</button>
            <button on:click={() => deleteCategory()}>Delete </button>
        {:else}
            <button on:click={() => {$modalSelectCallback(availability); closeModal();}}> select</button>
        {/if}
    </div>
  {/if}
</div>


