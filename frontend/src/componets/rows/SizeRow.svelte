<script>
    import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
    import { closeModal, modalSelectCallback } from "../../store/modalStore";

    export let rowItem;
    export let onSave;
    export let onDelete;
    export let endpoint;

    let isEditing = rowItem.isNew;
    let editableSize = structuredClone(rowItem);

    function startEditing() {
        isEditing = true;
    }

    async function saveEdit() {
        let updated;

        if (rowItem.isNew) {
            const response = await fetchPost(endpoint, editableSize);
            if (response.status === 201) {
                updated = response.created;
            }
        } else {
            await fetchUpdate(endpoint, editableSize);
            updated = editableSize;
        }

        onSave(updated);
        isEditing = false;
    }

    function cancelEdit() {
        isEditing = false;

        if (rowItem.isNew) {
            onDelete(rowItem.id, true);
        } else {
            editableSize = structuredClone(rowItem);
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
            <input bind:value={editableSize.name} />
        </div>

        <div class="cell-box">
            <div class="label">score</div>
            <input bind:value={editableSize.score} />
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

        <div class="cell-box">
            <div class="label">score</div>
            <div>{rowItem.score || "----"}</div>
        </div>

        <div class="buttons">
            <button on:click={startEditing}>Edit</button>
            <button on:click={deleteRow}>Delete </button>
        </div>
    {/if}
</div>
