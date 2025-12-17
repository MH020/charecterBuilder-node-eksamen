<script>
    import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
    import { closeModal, modalSelectCallback } from "../../store/modalStore";

    export let statline;
    export let onSave;
    export let onDelete;

    let isEditing = statline.isNew;
    let editableStatline = structuredClone(statline);

    function startEditing() {
        isEditing = true;
    }

    async function saveEdit() {
        let updated;

        if (statline.isNew) {
            const response = await fetchPost(
                "/api/races/statlines",
                editableStatline,
            );
            if (response.status === 201) {
                updated = response.created;
            }
        } else {
            await fetchUpdate("/api/races/statlines", editableStatline);
            updated = editableStatline;
        }

        onSave(updated);
        isEditing = false;
    }

    function cancelEdit() {
        isEditing = false;

        if (statline.isNew) {
            onDelete(statline.id, true);
        } else {
            editableStatline = structuredClone(statline);
        }
    }

    function deleteRow() {
        onDelete(statline.id);
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
            <div>{statline.name || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">weapon_skill</div>
            <div>{statline.weapon_skill || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">ballistic_skill</div>
            <div>{statline.ballistic_skill || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">strength</div>
            <div>{statline.strength || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">toughness</div>
            <div>{statline.toughness || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">agility</div>
            <div>{statline.agility || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">intelligence</div>
            <div>{statline.intelligence || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">perception</div>
            <div>{statline.perception || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">willpower</div>
            <div>{statline.willpower || "----"}</div>
        </div>

                <div class="cell-box">
            <div class="label">fellowship</div>
            <div>{statline.fellowship || "----"}</div>
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
                        $modalSelectCallback(statline);
                        closeModal();
                    }}
                >
                select</button>
            {/if}
        </div>
    {/if}
</div>
