<script>
    import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
    import { selectSingleFromModal } from "../../../util/ListUtil";
    import { closeModal, modalSelectCallback } from "../../store/modalStore";

    export let item;
    export let onSave;
    export let onDelete;

    let editableItem = structuredClone(item);
    let isEditing = item.isNew;
    let showTooltip;

    $: if (!isEditing) {
        editableItem = structuredClone(editableItem);
    }

    function startEditing() {
        isEditing = true;
    }

    async function saveEdit() {
        let updated;

        if (item.isNew) {
            const response = await fetchPost(
                "/api/weapon/traits",
                editableItem,
            );
            if (response.status === 201) {
                updated = response.created;
            }
        } else {
            await fetchUpdate("/api/weapon/traits", editableItem);
            updated = editableItem;
        }

        onSave(updated);
        isEditing = false;
    }

    function cancelEdit() {
        isEditing = false;

        if (item.isNew) {
            onDelete(item.id, true);
        } else {
            editableItem = structuredClone(item);
        }
    }

    function deleteRow() {
        onDelete(item.id);
    }
</script>

<div class="row">
    {#if isEditing}
        <div class="cell-box">
            <div class="label">Name</div>
            <input bind:value={editableItem.name} />
        </div>

        <textarea bind:value={editableItem.description} rows="3" cols="30"
        ></textarea>

        <div class="cell-box">
            <div class="label">Category</div>
            <button
                on:click={() =>
                    selectSingleFromModal(
                        editableItem,
                        "category",
                        editableItem,
                    )}
            >
                {item.category.name}
            </button>
        </div>

        <div class="buttons">
            <button on:click={saveEdit}>Save</button>
            <button on:click={cancelEdit}>Cancel</button>
        </div>
    {:else}
        <div class="cell-box">
            <div class="label">Name</div>
            <div>{item.name || "----"}</div>
        </div>

        <button
            class="description-btn"
            on:mouseenter={() => (showTooltip = true)}
            on:mouseleave={() => (showTooltip = false)}
            aria-describedby="tooltip-description"
        >
            description
        </button>

        {#if showTooltip}
            <div id="tooltip-description" role="tooltip" class="tooltip">
                {item.description}
            </div>
        {/if}

        <div class="buttons">
            {#if !$modalSelectCallback}
                <button on:click={() => startEditing}>Edit</button>
                <button on:click={() => deleteRow}>Delete </button>
            {:else}
                <button
                    on:click={() => {
                        $modalSelectCallback(item);
                        closeModal();
                    }}
                >
                    select</button
                >
            {/if}
        </div>
    {/if}
</div>
