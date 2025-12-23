<script>
    import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
    import { closeModal, modalSelectCallback } from "../../store/modalStore";

    export let rowItem;
    export let onSave;
    export let onDelete;
    export let endpoint

    let isEditing = rowItem.isNew;
    let editableStatline = structuredClone(rowItem);

    function startEditing() {
        isEditing = true;
    }

    async function saveEdit() {
        let updated;
        if (editableStatline.isNew) {
            const response = await fetchPost(endpoint, editableStatline);
            if (response.status === 201) {
                updated = editableStatline;
                updated.id = response.created.id;
            }
        } else {
            await fetchUpdate(endpoint, editableStatline);
            updated = editableStatline;
        }

        onSave(updated);
        isEditing = false;
    }

    function cancelEdit() {
        isEditing = false;
        if (editableStatline.isNew) onDelete(editableStatline.id, true);
        else editableStatline = structuredClone(rowItem);
    }

    function deleteRow() {
        onDelete(editableStatline.id);
    }
</script>

<div class="row">
    {#if isEditing}
        <div class="cell-box">
            <div class="label">Name</div>
            <input bind:value={editableStatline.name} />
        </div>

        <div class="cell-box">
            <div class="label">weapon skill</div>
            <input bind:value={editableStatline.weapon_skill} />
        </div>

        <div class="cell-box">
            <div class="label">ballistic skill</div>
            <input bind:value={editableStatline.ballistic_skill} />
        </div>

        <div class="cell-box">
            <div class="label">strength</div>
            <input bind:value={editableStatline.strength} />
        </div>
        <div class="cell-box">
            <div class="label">toughness</div>
            <input bind:value={editableStatline.toughness} />
        </div>

        <div class="cell-box">
            <div class="label">agility</div>
            <input bind:value={editableStatline.agility} />
        </div>

        <div class="cell-box">
            <div class="label">intelligence</div>
            <input bind:value={editableStatline.intelligence} />
        </div>

        <div class="cell-box">
            <div class="label">perception</div>
            <input bind:value={editableStatline.perception} />
        </div>

        <div class="cell-box">
            <div class="label">willpower</div>
            <input bind:value={editableStatline.willpower} />
        </div>

        <div class="cell-box">
            <div class="label">fellowship</div>
            <input bind:value={editableStatline.fellowship} />
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
            <div class="label">weapon_skill</div>
            <div>{rowItem.weapon_skill || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">ballistic_skill</div>
            <div>{rowItem.ballistic_skill || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">strength</div>
            <div>{rowItem.strength || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">toughness</div>
            <div>{rowItem.toughness || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">agility</div>
            <div>{rowItem.agility || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">intelligence</div>
            <div>{rowItem.intelligence || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">perception</div>
            <div>{rowItem.perception || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">willpower</div>
            <div>{rowItem.willpower || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">fellowship</div>
            <div>{rowItem.fellowship || "----"}</div>
        </div>

        <div class="buttons">
            {#if !$modalSelectCallback}
                <button on:click={startEditing}>Edit</button>
                <button on:click={deleteRow}>Delete </button>
            {:else}
                <button on:click={startEditing}>Edit</button>
                <button on:click={deleteRow}>Delete </button>
                <button
                    on:click={() => {
                        $modalSelectCallback(rowItem);
                        closeModal();
                    }}
                >
                select</button>
            {/if}
        </div>
    {/if}
</div>
