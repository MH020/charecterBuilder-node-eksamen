<script>
  import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
  import { closeModal, modalSelectCallback } from "../../store/modalStore";

  export let apptitude;
  export let onSave;
  export let onDelete;
  export let endpoint; 

  let isEditing = apptitude.isNew;
  let editableApptitude = structuredClone(apptitude);

  function startEditing() {
    isEditing = true;
  }

  async function saveEdit() {
    let updated;

    if (apptitude.isNew) {
      const response = await fetchPost("/api/aptitudes", editableApptitude);
      if (response.status === 201) {
        updated = response.created;
      }
    } else {
      await fetchUpdate("/api/aptitudes", editableApptitude);
      updated = editableApptitude;
    }

    onSave(updated);
    isEditing = false;
  }

  function cancelEdit() {
    isEditing = false;

    if (apptitude.isNew) {
      onDelete(apptitude.id, true);
    } else {
      editableApptitude = structuredClone(apptitude);
    }
  }

  function deleteRow() {
    onDelete(apptitude.id);
  }
</script>

<div class="row">
  {#if isEditing}
    <div class="cell-box">
      <div class="label">Name</div>
      <input bind:value={editableApptitude.name} />
    </div>

    <div class="buttons">
      <button on:click={saveEdit}>Save</button>

      <button on:click={cancelEdit}>Cancel</button>
    </div>
  {:else}
    <div class="cell-box">
      <div class="label">Name</div>
      <div>{apptitude.name || "----"}</div>
    </div>


    <div class="buttons">
      {#if !$modalSelectCallback}
        <button on:click={startEditing}>Edit</button>
        <button on:click={deleteRow}>Delete </button>
      {:else}
        <button
          on:click={() => {
            $modalSelectCallback(apptitude);
            closeModal();
          }}
        >
          select</button
        >
      {/if}
    </div>
  {/if}
</div>



