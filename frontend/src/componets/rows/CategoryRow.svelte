<script>
  import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
  import { closeModal, modalSelectCallback } from "../../store/modalStore";

  export let category;
  export let onSave;
  export let onDelete;
  export let endpoint

  let isEditing = category.isNew;
  let editableCategory = structuredClone(category);

  function startEditing() {
    isEditing = true;
  }

  async function saveEdit() {
    let updated;

    if (category.isNew) {
      const response = await fetchPost("/api/category", editableCategory);
      if (response.status === 201) {
        updated = response.created;
      }
    } else {
      await fetchUpdate("/api/category", editableCategory);
      updated = editableCategory;
    }

    onSave(updated);
    isEditing = false;
  }

  function cancelEdit() {
    isEditing = false;

    if (category.isNew) {
      onDelete(category.id, true);
    } else {
      editableCategory = structuredClone(category);
    }
  }

  function deleteRow() {
    onDelete(category.id);
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
        <button on:click={startEditing}>Edit</button>
        <button on:click={deleteRow}>Delete </button>
      {:else}
        <button
          on:click={() => {
            $modalSelectCallback(category);
            closeModal();
          }}
        >
          select</button
        >
      {/if}
    </div>
  {/if}
</div>
