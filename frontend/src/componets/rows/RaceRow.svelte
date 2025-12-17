<script>
    import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
    import {
        closeModal,
        modalSelectCallback,
        openModal,
    } from "../../store/modalStore";
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

        if (race.isNew) {
            const response = await fetchPost(endpoint, editableRace);
            if (response.status === 201) {
                updated = response.created;
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

        if (race.isNew) {
            onDelete(race.id, true);
        } else {
            editableRace = structuredClone(race);
        }
    }

    function deleteRow() {
        onDelete(race.id);
    }

    function selectStatline(statlineInput) {
        modalSelectCallback.set((statline) => {
            statlineInput = statline;

            modalSelectCallback.set(null);
        });
        openModal(StatlinesList);
        return (race = { ...race, statlineInput });
    }
</script>

<div class="row">
    {#if isEditing}
        <div class="cell-box">
            <div class="label">Name</div>
            <input bind:value={editableRace.name} />
        </div>

        <div class="cell-box">
            <div class="label">description</div>
            <input bind:value={editableRace.description} />
        </div>

        <div class="cell-box">
            <div class="label">wounds</div>
            <input bind:value={editableRace.wounds} />
        </div>

        <div class="statline-cards">
            <button on:click={selectStatline(race.base_statline)}>
                {"select base statline"}
            </button>
            <button on:click={selectStatline(race.max_statline)}>
                {"select Max statline"}
            </button>

            <StatlineCard statline={race.base_statline} />
            <StatlineCard statline={race.max_statline} />
        </div>

        <div class="buttons">
            <button on:click={saveEdit}>Save</button>

            <button on:click={cancelEdit}>Cancel</button>
        </div>
    {:else}
        <div class="cell-box">
            <div class="label">Name</div>
            <div>{race.name || "----"}</div>
        </div>

        <div class="cell-box">
            <div class="label">description</div>
            <div>{race.description || "----"}</div>
        </div>

        <div class="cell-box">
            <div class="label">wounds</div>
            <div>{race.wounds || "----"}</div>
        </div>

        <div class="statline-cards">
            <StatlineCard statline={race.base_statline} />
            <StatlineCard statline={race.max_statline} />
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
                        $modalSelectCallback(race);
                        closeModal();
                    }}
                >
                    select</button
                >
            {/if}
        </div>
    {/if}
</div>
