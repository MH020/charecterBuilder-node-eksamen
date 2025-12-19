<script>
    import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
    import {
        closeModal,
        modalSelectCallback,
        openModal,
    } from "../../store/modalStore";
    import StatlineCard from "../cards/StatlineCard.svelte";
    import StatlinesList from "../lists/characterLists/StatlinesList.svelte";

    export let talent;
    export let onSave;
    export let onDelete;
    export let endpoint;

    let isEditing = talent.isNew;
    let editableTalent = structuredClone(talent);
    let selectedSize = null;

    function startEditing() {
        isEditing = true;
    }

    async function saveEdit() {
        let updated;
        console.log(endpoint);
        console.log(editableTalent);
        if (editableTalent.isNew) {
            const response = await fetchPost(endpoint, editableTalent);
            if (response.status === 201) {
                updated = editableTalent;
                updated.id = response.created.id;
            }
        } else {
            await fetchUpdate(endpoint, editableTalent);
            updated = editableTalent;
        }

        onSave(updated);
        isEditing = false;
    }

    function cancelEdit() {
        isEditing = false;
        if (editableTalent.isNew) onDelete(editableTalent.id, true);
        else editableTalent = structuredClone(talent);
    }

    function deleteRow() {
        onDelete(editableTalent.id);
    }

    function selectStatline(statline) {
        modalSelectCallback.set((selectedStatline) => {
            editableTalent = { ...editableTalent, [statline]: selectedStatline };
            modalSelectCallback.set(null);
        });
        openModal(StatlinesList);
    }

    $: if (selectedSize) {
        talent.size = selectedSize;
    }
</script>

<div class="row">
    {#if isEditing}
        <div class="row-fields">

            <div class="cell-box">
                <div class="label">Name</div>
                <input bind:value={editableTalent.name} />
            </div>

            <div class="select-box">
                <div class="label">size</div>
                <select bind:value={selectedSize}>
                    <option value="" disabled selected>Select an size</option>
                    {#each sizes as size}
                        <option value={size}>{size.name}</option>
                    {/each}
                </select>
            </div>
        </div>

        <textarea bind:value={editableTalent.description} rows="3" cols="30"
        ></textarea>

        <div class="cell-box">
            <div class="label">Wounds</div>
            <input type="number" bind:value={editableTalent.wounds} />
        </div>

        <div class="statline-cards">
            <div>
                <button on:click={() => selectStatline("base_statline")}
                    >Select Base Statline</button
                >
                <StatlineCard statline={editableTalent.base_statline} />
            </div>

            <div>
                <button on:click={() => selectStatline("max_statline")}
                    >Select Max Statline</button
                >
                <StatlineCard statline={editableTalent.max_statline} />
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
                        $modalSelectCallback(talent);
                        closeModal();
                    }}
                >
                    Select
                </button>
            {/if}
        </div>

        <div class="row-fields">
            <div class="cell-box">
                <div class="label">Name</div>
                <div>{talent.name || "----"}</div>
            </div>

            <div class="cell-box">
                <div class="label">Size</div>
                <div>{talent.size.name || "----"}</div>
            </div>
        </div>

        <div class="cell-box">
            <div class="label">Description</div>
            <div>{talent.description || "----"}</div>
        </div>

        <div class="cell-box">
            <div class="label">Wounds</div>
            <div>{talent.wounds || "----"}</div>
        </div>

        <div class="statline-cards">
            <StatlineCard statline={talent.base_statline} />
            <StatlineCard statline={talent.max_statline} />
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
        font-family: "Courier New", monospace;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
    }

    .row-fields {
        display: flex;
        gap: 1rem;
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
