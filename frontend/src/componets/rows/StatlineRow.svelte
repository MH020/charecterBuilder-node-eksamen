<script>
    import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
    import { closeModal, modalSelectCallback } from "../../store/modalStore";

    export let statLine;
    export let onSave;
    export let onDelete;
    export let endpoint

    let isEditing = statLine.isNew;
    let editableStatLine = structuredClone(statLine);

    function startEditing() {
        isEditing = true;
    }

    async function saveEdit() {
        let updated;
        if (editableStatLine.isNew) {
            const response = await fetchPost(endpoint, editableStatLine);
            if (response.status === 201) {
                updated = editableStatLine;
                updated.id = response.created.id;
            }
        } else {
            await fetchUpdate(endpoint, editableStatLine);
            updated = editableStatLine;
        }

        onSave(updated);
        isEditing = false;
    }

    function cancelEdit() {
        isEditing = false;
        if (editableStatLine.isNew) onDelete(editableStatLine.id, true);
        else editableStatLine = structuredClone(statLine);
    }

    function deleteRow() {
        onDelete(editableStatLine.id);
    }
</script>

<div class="row">
    {#if isEditing}
        <div class="cell-box">
            <div class="label">Name</div>
            <input bind:value={editableStatLine.name} />
        </div>

        <div class="cell-box">
            <div class="label">weapon skill</div>
            <input bind:value={editableStatLine.weapon_skill} />
        </div>

        <div class="cell-box">
            <div class="label">ballistic skill</div>
            <input bind:value={editableStatLine.ballistic_skill} />
        </div>

        <div class="cell-box">
            <div class="label">strength</div>
            <input bind:value={editableStatLine.strength} />
        </div>
        <div class="cell-box">
            <div class="label">toughness</div>
            <input bind:value={editableStatLine.toughness} />
        </div>

        <div class="cell-box">
            <div class="label">agility</div>
            <input bind:value={editableStatLine.agility} />
        </div>

        <div class="cell-box">
            <div class="label">intelligence</div>
            <input bind:value={editableStatLine.intelligence} />
        </div>

        <div class="cell-box">
            <div class="label">perception</div>
            <input bind:value={editableStatLine.perception} />
        </div>

        <div class="cell-box">
            <div class="label">willpower</div>
            <input bind:value={editableStatLine.willpower} />
        </div>

        <div class="cell-box">
            <div class="label">fellowship</div>
            <input bind:value={editableStatLine.fellowship} />
        </div>

        <div class="buttons">
            <button on:click={saveEdit}>Save</button>

            <button on:click={cancelEdit}>Cancel</button>
        </div>
    {:else}
        <div class="cell-box">
            <div class="label">Name</div>
            <div>{statLine.name || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">weapon_skill</div>
            <div>{statLine.weapon_skill || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">ballistic_skill</div>
            <div>{statLine.ballistic_skill || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">strength</div>
            <div>{statLine.strength || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">toughness</div>
            <div>{statLine.toughness || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">agility</div>
            <div>{statLine.agility || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">intelligence</div>
            <div>{statLine.intelligence || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">perception</div>
            <div>{statLine.perception || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">willpower</div>
            <div>{statLine.willpower || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">fellowship</div>
            <div>{statLine.fellowship || "----"}</div>
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
                        $modalSelectCallback(statLine);
                        closeModal();
                    }}
                >
                select</button>
            {/if}
        </div>
    {/if}
</div>
