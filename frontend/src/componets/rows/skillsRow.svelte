<script>
    import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
    import { closeModal, modalSelectCallback, openModal } from "../../store/modalStore";
    import ApptitudesList from "../lists/ApptitudesList.svelte";

    export let rowItem;
    export let onDelete;  
    export let onSave 

    let editableSkill = structuredClone(rowItem);
    let isEditing = rowItem.isNew;
    let showTooltip

    $: if (!isEditing) {
      editableSkill = structuredClone(editableSkill);
    }

    function startEditing() {
        isEditing = true;
    }

    async function saveEdit() {
        let updated;

        if (rowItem.isNew) {
            const response = await fetchPost("/api/skills", editableSkill);
            if (response.status === 201) {
                updated = editableSkill
                updated.id = response.created.id
            }
        } else {
            await fetchUpdate("/api/skills", editableSkill);
            updated = editableSkill
        }  
        onSave(updated)
        isEditing = false;
    }

    function cancelEdit() {
        isEditing = false;

        if (rowItem.isNew) {

            onDelete(rowItem.id, true); 
        } else {
            editableSkill = structuredClone(rowItem);
        }
    }

    function deleteRow() {
        onDelete(rowItem.id);  
    }

    function setMainApptitude() {
        modalSelectCallback.set((selectedAptitude) => {
        editableSkill.main_aptitude = selectedAptitude;

        modalSelectCallback.set(null);
        });
        openModal(ApptitudesList);
    }

    function setSecoundaryApptitude() {
        modalSelectCallback.set((selectedAptitude) => {
        editableSkill.secondary_aptitude = selectedAptitude;

        modalSelectCallback.set(null);
        });
        openModal(ApptitudesList);
    }
</script>


<div class="row">
  <div class="row-name">
    {#if isEditing}
      <input bind:value={editableSkill.name} placeholder="Skill name" />

      <textarea bind:value={editableSkill.description} rows="3" cols="30" placeholder="Description"></textarea>
    {:else}
      <span class="name">{rowItem.name || "----"}</span>

      <button
        class="description-btn"
        on:mouseenter={() => showTooltip = true}
        on:mouseleave={() => showTooltip = false}
        aria-describedby="tooltip-description"
      >
        description
      </button>

      {#if showTooltip}
        <div id="tooltip-description" role="tooltip" class="tooltip">
          {rowItem.description || "No description"}
        </div>
      {/if}
    {/if}
  </div>

  <div class="aptitudes">
    {#if isEditing}
      <button class="edit-button" on:click={setMainApptitude}>
        <img src="/icons/edit-main.svg" alt="Edit main aptitude" />
      </button>
      <button class="edit-button" on:click={setSecoundaryApptitude}>
        <img src="/icons/edit-secondary.svg" alt="Edit secondary aptitude" />
      </button>

      <span>Main: {editableSkill.main_aptitude?.name || rowItem.main_aptitude?.name || "----"}</span>
      <span>Secondary: {editableSkill.secondary_aptitude?.name || rowItem.secondary_aptitude?.name || "----"}</span>
    {:else}
      <span>Main: {rowItem.main_aptitude?.name || "----"}</span>
      <span>Secondary: {rowItem.secondary_aptitude?.name || "----"}</span>
    {/if}
  </div>

  <div class="buttons">
    {#if isEditing}
      <button on:click={saveEdit}>Save</button>
      <button on:click={cancelEdit}>Cancel</button>
    {:else}
      <button on:click={startEditing}>Edit</button>
      <button on:click={deleteRow}>Delete</button>
    {/if}
  </div>
</div>



