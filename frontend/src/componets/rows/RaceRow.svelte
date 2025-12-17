<script>
  import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
  import { closeModal, modalSelectCallback, openModal } from "../../store/modalStore";
  import StatlineCard from "../cards/StatlineCard.svelte";
  import StatlinesList from "../lists/characterLists/StatlinesList.svelte";

  export let race;
  export let onSave;
  export let onDelete;
  export let endpoint;

  let isEditing = race.isNew;
  let editableRace = structuredClone(race);

  function startEditing() {
    isEditing = true;
  }

  async function saveEdit() {
    let updated;
    console.log(endpoint)
          console.log(editableRace)
    if (editableRace.isNew) {
      const response = await fetchPost(endpoint, editableRace);
        if (response.status === 201){
            updated = editableRace;
            updated.id = response.created.id
        }
    } else {
      await fetchUpdate(endpoint, editableRace);
      updated = editableRace;
    }

    onSave(updated);
    isEditing = false;
  }

  function cancelEdit() {
    isEditing = false;
    if (editableRace.isNew) onDelete(editableRace.id, true);
    else editableRace = structuredClone(race);
  }

  function deleteRow() {
    onDelete(editableRace.id);
  }

  function selectStatline(statline) {
    modalSelectCallback.set((selectedStatline) => {
      editableRace = { ...editableRace, [statline]: selectedStatline };
      modalSelectCallback.set(null);
    });
    openModal(StatlinesList);
  }

    function selectSize() {
        modalSelectCallback.set((size) => {
            editableRace.size = size;

            modalSelectCallback.set(null);
        });
        openModal(); 
    }
</script>



<div class="row">
  {#if isEditing}
    <div class="cell-box">
      <div class="label">Name</div>
      <input bind:value={editableRace.name} />
    </div>

    <textarea bind:value={editableRace.description} rows="3" cols="30"></textarea>

    <div class="cell-box">
      <div class="label">Wounds</div>
      <input type="number" bind:value={editableRace.wounds} />
    </div>

    <div class="statline-cards">
      <div>
        <button on:click={() => selectStatline("base_statline")}>Select Base Statline</button>
        <StatlineCard statline={editableRace.base_statline} />
      </div>

      <div>
        <button on:click={() => selectStatline("max_statline")}>Select Max Statline</button>
        <StatlineCard statline={editableRace.max_statline} />
      </div>
    </div>

    <div class="buttons">
      <button on:click={saveEdit}>Save</button>
      <button on:click={cancelEdit}>Cancel</button>
    </div>
  {:else}
    <div class="buttons">
      {#if !$modalSelectCallback}
        <button on:click={startEditing}>Edit</button>
        <button on:click={deleteRow}>Delete</button>
      {:else}
        <button on:click={startEditing}>Edit</button>
        <button on:click={deleteRow}>Delete</button>
        <button
          on:click={() => {
            $modalSelectCallback(race);
            closeModal();
          }}
        >
          Select
        </button>
      {/if}
    </div>
    
    <div class="cell-box">
      <div class="label">Name</div>
      <div>{race.name || "----"}</div>
    </div>

    <div class="cell-box">
      <div class="label">Description</div>
      <div>{race.description || "----"}</div>
    </div>

    <div class="cell-box">
      <div class="label">Wounds</div>
      <div>{race.wounds || "----"}</div>
    </div>

    <div class="statline-cards">
      <StatlineCard statline={race.base_statline} />
      <StatlineCard statline={race.max_statline} />
    </div>

  {/if}
</div>
<style>
  .row {
    display: flex;
    flex-direction: column;
    background-color: #1b1b1b;
    border: 1px solid #444;
    border-radius: 6px;
    padding: 12px;
    margin-bottom: 10px;
    color: #e0e0e0;
    font-family: 'Courier New', monospace;
    box-shadow: 0 2px 8px rgba(0,0,0,0.7);
  }

  .cell-box {
    display: flex;
    flex-direction: column;
    margin-bottom: 6px;
  }

  .label {
    font-weight: bold;
    color: #ffb86c;
    margin-bottom: 2px;
  }

  input {
    padding: 6px 8px;
    border-radius: 4px;
    border: 1px solid #333;
    background-color: #121212;
    color: #c0c0c0;
  }

  .buttons {
    display: flex;
    gap: 0.5rem;
    margin-top: 8px;
  }

  .statline-cards {
    display: flex;
    gap: 1rem;
    margin-top: 6px;
  }
</style>