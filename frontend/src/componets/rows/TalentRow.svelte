<script>
    import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
    import { selectMultibleFromModal } from "../../../util/ListUtil";
    import {closeModal, modalSelectCallback, openModal} from "../../store/modalStore";
    import ApptitudesList from "../lists/ApptitudesList.svelte";
    import LineageList from "../lists/characterLists/lineageList.svelte";
    import RaceList from "../lists/characterLists/RaceList.svelte";
    import TalentList from "../lists/characterLists/TalentList.svelte";

    export let talent;
    export let onSave;
    export let onDelete;
    export let endpoint;

    let isEditing = talent.isNew;
    let editableTalent = structuredClone(talent);
    let showTooltip;

    function startEditing() {
        isEditing = true;
    }

    async function saveEdit() {
        let updated;
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

    function selectElement(element, component) {
        modalSelectCallback.set((selectedElement) => {
            editableTalent = { ...editableTalent, [element]: selectedElement };
            modalSelectCallback.set(null);
        });
        openModal(component);
    }

    const types = [
        "Half Talent",
        "Full Talent",
        "Class Feature Only",
        "Expert Talent",
    ];
    let SelectedType = talent.type;

    $: if (SelectedType) {
        editableTalent.type = SelectedType;
    }
</script>

<div class="row">
    {#if isEditing}
        <div class="row-fields">
            <div class="cell-box">
                <div class="label">Name</div>
                <input bind:value={editableTalent.name} />
            </div>
        </div>

        <textarea bind:value={editableTalent.description} rows="3" cols="30"></textarea>

        <div class="select-box">
            <div class="label">type</div>
            <select bind:value={editableTalent.type}>
                <option value="" disabled selected>Select a type</option>
                {#each types as type}
                    <option value={type}>{type}</option>
                {/each}
            </select>
        </div>

        <div class="cell-box">
            <div class="label">prerequisite talent</div>
            <button
                on:click={() =>
                    selectElement("prerequisite_talent", TalentList)}
            >
                {editableTalent.prerequisite_talent.name ||
                    "prerequisite talent"}
            </button>
        </div>

        <div class="cell-box">
            <div class="label">required race</div>
            <button on:click={() => selectElement("required_race", RaceList)}>
                {editableTalent.required_race.name || "required race"}
            </button>
        </div>

        <div class="cell-box">
            <div class="label">required lineage</div>
            <button
                on:click={() => selectElement("required_lineage", LineageList)}
            >
                {editableTalent.required_lineage.name || "required lineage"}
            </button>
        </div>

        <button
            on:click={() =>
                selectMultibleFromModal(ApptitudesList, (selected) => {
                    const list = editableTalent.aptitudes || [];

                    const exists = list.some((c) => c.id === selected.id);

                    editableTalent = {
                        ...editableTalent,
                        aptitudes: exists
                            ? list.filter((a) => a.id !== selected.id)
                            : [...list, selected],
                    };
                })}
        >
            select aptitudes
        </button>

        <div class="cell-box">
            <div class="label">aptitudes</div>
            <div class="tags">
                {#each editableTalent.aptitudes as aptitude}
                    <div>
                        {aptitude.name || "----"}
                    </div>
                {/each}
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
                {talent.description}
            </div>
        {/if}

        <div class="row-fields">
            <div class="cell-box">
                <div class="label">type</div>
                <div>{talent.type || "----"}</div>
            </div>
        </div>

        <div class="row-fields">
            <div class="cell-box">
                <div class="label">prerequisite talent</div>
                <div>{talent.prerequisite_talent.name || "none"}</div>
            </div>
        </div>

        <div class="row-fields">
            <div class="cell-box">
                <div class="label">prerequisite talent</div>
                <div>{talent.required_race.name || "-----"}</div>
            </div>
        </div>

        <div class="row-fields">
            <div class="cell-box">
                <div class="label">required lineage</div>
                <div>{talent.required_lineage.name || "-----"}</div>
            </div>
        </div>

        <div class="cell-box">
            <div class="label">aptitudes</div>
            <div class="tags">
                {#each editableTalent.aptitudes as aptitude}
                    <div>
                        {aptitude.name || "----"}
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>
