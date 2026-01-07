<script>
  import { closeModal, modalSelectCallback } from "../../store/modalStore";
  import EditableRowSlot from "../wrappers/Editable.svelte";

  export let powerCategory;
  export let onSave;
  export let onDelete;
  export let endpoint;

  let editablePowerCategory = structuredClone(powerCategory);
</script>

<EditableRowSlot
  item={powerCategory}
  endpoint={endpoint}
  onSave={onSave}
  onDelete={onDelete}
  bind:editable = {editablePowerCategory}
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
        <input bind:value={editablePowerCategory.name} />
      </div>

      <div class="buttons">
        <button on:click={save}>Save</button>
        <button on:click={cancel}>Cancel</button>
      </div>
    {:else}
      <div class="cell-box">
        <div class="label">Name</div>
        <div>{powerCategory.name || "----"}</div>
      </div>

      <div class="buttons">
        {#if !$modalSelectCallback}
          <button on:click={startEditing}>Edit</button>
          <button on:click={remove}>Delete</button>
        {:else}
          <button
            on:click={() => {
              $modalSelectCallback(powerCategory);
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
