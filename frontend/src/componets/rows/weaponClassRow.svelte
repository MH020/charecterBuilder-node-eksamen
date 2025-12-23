<script>
    import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
    import { closeModal, modalSelectCallback } from "../../store/modalStore";

    export let weaponClass;
    export let onSave;     
    export let onDelete;   
    export let endpoint; 

    let isEditing = weaponClass.isNew;
    let editableCategory = structuredClone(weaponClass);


    function startEditing() {
        isEditing = true;
    }

    async function saveEdit() {
        let updated;

        if (weaponClass.isNew) {
            const response = await fetchPost("/api/weapon/classes", editableCategory);
            if (response.status === 201) {
                updated = response.created;
            }
        } else {
            await fetchUpdate("/weapon/classes", editableCategory);
            updated = editableCategory;
        }

        onSave(updated);   
        isEditing = false;
    }

    function cancelEdit() {
        isEditing = false;

        if (weaponClass.isNew) {

            onDelete(weaponClass.id, true); 
        } else {
            editableCategory = structuredClone(weaponClass);
        }
    }

    function deleteRow() {
        onDelete(weaponClass.id);  
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

    <div class="buttons">
        <button on:click={saveEdit}>Save</button>
        
        <button on:click={cancelEdit}>Cancel</button>
    </div>
  {:else}
    <div class="cell-box">
      <div class="label">Name</div>
      <div>{weaponClass.name || "----"}</div>
    </div>

    <div class="cell-box">
      <div class="label">description</div>
      <div>{weaponClass.description || "----"}</div>
    </div>

    <div class="buttons">
        {#if !$modalSelectCallback}
            <button on:click={startEditing}>Edit</button>
            <button on:click={deleteRow}>Delete </button>
        {:else}
            <button on:click={() => {$modalSelectCallback(weaponClass); closeModal()}}> select</button>
        {/if}
    </div>
  {/if}
</div>


