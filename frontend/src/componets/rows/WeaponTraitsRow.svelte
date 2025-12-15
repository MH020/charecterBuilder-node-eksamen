<script>
    import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
    import { closeModal, modalSelectCallback } from "../../store/modalStore";

    export let weaponTrait;
    export let onDelete;  
    export let onSave 

    let editableWeaponTrait = structuredClone(weaponTrait);
    let isEditing = weaponTrait.isNew;
    let showTooltip

    $: if (!isEditing) {
      editableWeaponTrait = structuredClone(editableWeaponTrait);
    }

    function startEditing() {
        isEditing = true;
    }

    async function saveEdit() {
        let updated;

        if (weaponTrait.isNew) {
            const response = await fetchPost("/api/weapon/traits", editableWeaponTrait);
            if (response.status === 201) {
                updated = response.created
            }
        } else {
            await fetchUpdate("/api/weapon/traits", editableWeaponTrait);
            updated = editableWeaponTrait
        }  
        onSave(updated)
        isEditing = false;
    }

    function cancelEdit() {
        isEditing = false;

        if (weaponTrait.isNew) {

            onDelete(weaponTrait.id, true); 
        } else {
            editableWeaponTrait = structuredClone(weaponTrait);
        }
    }

    function deleteRow() {
        onDelete(weaponTrait.id);  
    }

</script>


<div class="row">
  {#if isEditing}
        <div class="cell-box">
        <div class="label">Name</div>
        <input bind:value={editableWeaponTrait.name} />
        </div>

        <textarea bind:value={editableWeaponTrait.description} rows="3" cols="30"></textarea>

        <div class="buttons">
        <button on:click={saveEdit}>Save</button>
        <button on:click={cancelEdit}>Cancel</button>
        </div>
  {:else}
        <div class="cell-box">
        <div class="label">Name</div>
        <div>{weaponTrait.name || "----"}</div>
        </div>

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
            {weaponTrait.description}
        </div>
        {/if}

    <div class="buttons">
        {#if !$modalSelectCallback}
            <button on:click={startEditing}>Edit</button>
            <button on:click={deleteRow}>Delete </button>
        {:else}
            <button on:click={() => {$modalSelectCallback(weaponTrait); closeModal();}}> select</button>
        {/if}
    </div>
  {/if}
</div>
