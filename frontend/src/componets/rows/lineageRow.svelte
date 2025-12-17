<script>
    import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
    import { selectMultibleFromModal } from "../../../util/ListUtil";
    import {
        closeModal,
        modalSelectCallback,
        openModal,
    } from "../../store/modalStore";
    import LineageBonusCard from "../cards/lineageBonusCard.svelte";
    import ApptitudesList from "../lists/ApptitudesList.svelte";
    import CategoryList from "../lists/ItemsList/categoryList.svelte";

    export let lineage;
    export let onSave;
    export let onDelete;

    let isEditing = lineage.isNew;
    let editableLineage = structuredClone(lineage);
    let classTooltip = [];
    let traitTooltip = [];
    let showTooltip;
    let featureShowTooltip;

    function startEditing() {
        isEditing = true;
    }

    async function saveEdit() {
        let updated;

        if (lineage.isNew) {
            const response = await fetchPost("/api/lineage", editableLineage);
            if (response.status === 201) {
                updated = editableLineage;
                updated.id = response.created.id;
                console.log(updated);
            }
        } else {
            await fetchUpdate("/api/lineage", editableLineage);
            updated = editableLineage;
        }

        onSave(updated);
        isEditing = false;
    }

    function cancelEdit() {
        isEditing = false;

        if (lineage.isNew) {
            onDelete(lineage.id, true);
        } else {
            editableLineage = structuredClone(lineage);
        }
    }

    function deleteRow() {
        onDelete(lineage.id);
    }

    function selectRace() {
        modalSelectCallback.set((race) => {
            editableLineage.required_race = race;

            modalSelectCallback.set(null);
        });
        openModal(CategoryList); //raceList
    }

    function createBonus() {
        modalSelectCallback.set((bonus) => {
            console.log(bonus);

            const list = editableLineage.bonuses || [];

            const exists = list.some(
                (b) => b.characteristic_id === bonus.characteristic_id,
            );

            editableLineage = {
                ...editableLineage,
                bonuses: exists
                    ? list.filter(
                          (b) =>
                              b.characteristic_id !== bonus.characteristic_id,
                      )
                    : [...list, bonus],
            };

            modalSelectCallback.set(null);
            console.log(editableLineage.bonuses);
        });

        openModal(LineageBonusCard);
    }
</script>

<div class="row">
    {#if isEditing}
        <div class="cell-box">
            <div class="label">Name</div>
            <input bind:value={editableLineage.name} />
        </div>

        <textarea bind:value={editableLineage.description} rows="3" cols="30"></textarea>

        <textarea
            bind:value={editableLineage.defining_features}
            rows="3"
            cols="30"
        ></textarea>

        <div class="cell-box">
            <div class="label">required race</div>
            <button on:click={selectRace}>
                {editableLineage.required_race.name || "required race"}
            </button>
        </div>

        <div class="cell-box">
            <div class="label">create characteristic bonus</div>
            <button on:click={createBonus}>
                {"add bonus"}
            </button>
        </div>

        <div class="cell-box">
            <div class="label">bonus</div>
            <div class="tags">
                {#each editableLineage.bonuses as bonus}
                    <p>{bonus.characteristic_name} +({bonus.bonus})</p>
                {/each}
            </div>
        </div>

        <button
            on:click={() =>
                selectMultibleFromModal(ApptitudesList, (selected) => {
                    const list = editableLineage.aptitudes || [];
                    const newApptitude = {
                        aptitude_id: selected.id,
                        aptitude_name: selected.name,
                    };

                    const exists = list.some(
                        (aptitude) => aptitude.aptitude_id === newApptitude.aptitude_id,
                    );

                    editableLineage = {
                        ...editableLineage,
                        aptitudes: exists
                            ? list.filter(
                                  (aptitude) => aptitude.aptitude_id !== newApptitude.aptitude_id
                              )
                            : [...list, newApptitude],
                    };
                    console.log(editableLineage);
                })}
        >
            select apptitudes
        </button>

        <div class="cell-box">
            <div class="label">aptitudes</div>
            <div class="tags">
                {#each editableLineage.aptitudes as aptitude, index}
                    <div>{aptitude.aptitude_name || "----"}</div>
                {/each}
            </div>
        </div>

        <div class="buttons">
            <button on:click={saveEdit}>Save</button>

            <button on:click={cancelEdit}>Cancel</button>
        </div>
    {:else}
        <div class="cell-box">
            <div class="label">Name</div>
            <div>{lineage.name || "----"}</div>
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
                {lineage.description || "No description"}
            </div>
        {/if}

        <button
            class="description-btn"
            on:mouseenter={() => (featureShowTooltip = true)}
            on:mouseleave={() => (featureShowTooltip = false)}
            aria-describedby="tooltip-description"
        >
            defining_features
        </button>

        {#if featureShowTooltip}
            <div id="tooltip-description" role="tooltip" class="tooltip">
                {lineage.defining_features || "No defining features"}
            </div>
        {/if}

        <div class="cell-box">
            <div class="label">required race</div>
            <div>{lineage.required_race.name || "----"}</div>
        </div>

        <div class="cell-box">
            <div class="label">characteristic bonus</div>
            <div class="tags">
                {#each lineage.bonuses as bonus}
                    <div>{bonus.characteristic_name} +({bonus.bonus})</div>
                {/each}
            </div>
        </div>

        <div class="cell-box">
            <div class="label">aptitudes</div>
            <div class="tags">
                {#each lineage.aptitudes as aptitude, index}
                    <div>{aptitude.aptitude_name || "----"}</div>
                {/each}
            </div>
        </div>

        <div class="buttons">
            <button on:click={startEditing}>Edit</button>
            <button on:click={deleteRow}>Delete </button>
        </div>
    {/if}
</div>
