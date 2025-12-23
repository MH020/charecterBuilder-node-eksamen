<script>
  import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
  import { closeModal, modalSelectCallback } from "../../store/modalStore";

  export let rowItem;
  export let onSave;
  export let onDelete;

  let isEditing = rowItem.isNew;
  let editableApptitude = structuredClone(rowItem);

  function startEditing() {
    isEditing = true;
  }

  async function saveEdit() {
    let updated;

    if (rowItem.isNew) {
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

    if (rowItem.isNew) {
      onDelete(rowItem.id, true);
    } else {
      editableApptitude = structuredClone(rowItem);
    }
  }

  function deleteRow() {
    onDelete(rowItem.id);
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
      <div>{rowItem.name || "----"}</div>
    </div>


    <div class="buttons">
      {#if !$modalSelectCallback}
        <button on:click={startEditing}>Edit</button>
        <button on:click={deleteRow}>Delete </button>
      {:else}
        <button
          on:click={() => {
            $modalSelectCallback(rowItem);
            closeModal();
          }}
        >
          select</button
        >
      {/if}
    </div>
  {/if}
</div>



