<script>
    import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";

    export let availability;
    export let onSave;     
    export let onDelete;   

    let isEditing = availability.isNew;
    let editableAvailability = structuredClone(availability);


      $: if (!isEditing) {
      editableAvailability = structuredClone(editableAvailability);
    }

    function startEditing() {
        isEditing = true;
    }

    async function saveEdit() {
        let updated;

        if (availability.isNew) {
            const response = await fetchPost("/api/availability", editableAvailability);
            if (response.status === 201) {
                updated = response.created;
            }
        } else {
            await fetchUpdate("/api/availability", editableAvailability);
            updated = editableAvailability;
        }

        onSave(updated);   
        isEditing = false;
    }

    function cancelEdit() {
        isEditing = false;

        if (availability.isNew) {

            onDelete(availability.id, true); 
        } else {
            editableAvailability = structuredClone(availability);
        }
    }

    function deleteRow() {
        onDelete(availability.id);  
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
      <button on:click={startEditing}>Edit</button>
      <button on:click={deleteRow}>Delete</button>
    </div>
  {/if}
</div>
