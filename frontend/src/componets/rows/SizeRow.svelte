<script>
    import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
    import { closeModal, modalSelectCallback } from "../../store/modalStore";

    export let size;
    export let onSave;
    export let onDelete;
    export let endpoint;

    let isEditing = size.isNew;
    let editableSize = structuredClone(size);

    function startEditing() {
        isEditing = true;
    }

    async function saveEdit() {
        let updated;

        if (size.isNew) {
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

        if (size.isNew) {
            onDelete(size.id, true);
        } else {
            editableSize = structuredClone(size);
        }
    }

    function deleteRow() {
        onDelete(size.id);
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
            <div>{size.name || "----"}</div>
        </div>

        <div class="cell-box">
            <div class="label">score</div>
            <div>{size.score || "----"}</div>
        </div>

        <div class="buttons">
            <button on:click={startEditing}>Edit</button>
            <button on:click={deleteRow}>Delete </button>
        </div>
    {/if}
</div>
