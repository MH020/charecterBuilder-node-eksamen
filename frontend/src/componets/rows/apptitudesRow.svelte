<script>
  import { closeModal, modalSelectCallback } from "../../store/modalStore";
  import EditableRowSlot from "../util/EditableRowSlot.svelte";

  export let apptitude;
  export let onSave;
  export let onDelete;
  export let endpoint;
  let editableApptitude = structuredClone(apptitude);
</script>

<EditableRowSlot
  item={apptitude}
  endpoint={endpoint}
  onSave={onSave}
  onDelete={onDelete}
  bind:editable = {editableApptitude}
  let:isEditing
  let:startEditing
  let:save
  let:cancel
  let:remove
>
  <div class="row">
    {#if isEditing}
      <div class="cell-box">
        <div class="label">Name</div>
        <input bind:value={editableApptitude.name} />
      </div>

      <div class="buttons">
        <button on:click={save}>Save</button>
        <button on:click={cancel}>Cancel</button>
      </div>
    {:else}
      <div class="cell-box">
        <div class="label">Name</div>
        <div>{apptitude.name || "----"}</div>
      </div>

      <div class="buttons">
        {#if !$modalSelectCallback}
          <button on:click={startEditing}>Edit</button>
          <button on:click={remove}>Delete</button>
        {:else}
          <button
            on:click={() => {
              $modalSelectCallback(apptitude);
              closeModal();
            }}
          >
            Select
          </button>
        {/if}
      </div>
    {/if}
  </div>
</EditableRowSlot>
