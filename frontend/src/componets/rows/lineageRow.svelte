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
    import AvailabilityList from "../lists/ItemsList/availabilityList.svelte";
    import CategoryList from "../lists/ItemsList/categoryList.svelte";
    import WeaponClassList from "../lists/weaponLists/weaponClassList.svelte";
    import WeaponTraitList from "../lists/weaponLists/weaponTraitList.svelte";

    export let lineage;
    export let onSave;
    export let onDelete;

    let isEditing = lineage.isNew;
    let editableLineage = structuredClone(lineage);
    let classTooltip = [];
    let traitTooltip = [];
    let showTooltip; 
    let featureShowTooltip

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
            editableLineage.required_race = bonus;

            modalSelectCallback.set(null);
        });
        openModal(CategoryList); //raceList
    }
</script>

<div class="row">
    {#if isEditing}
        <div class="cell-box">
            <div class="label">Name</div>
            <input bind:value={editableLineage.name} />
        </div>

        <textarea bind:value={editableLineage.description} rows="3" cols="30"
        ></textarea>

        <div class="cell-box">
            <div class="label">range</div>
            <input bind:value={editableLineage.defining_features} />
        </div>

        <div class="cell-box">
            <div class="label">required race</div>
            <button on:click={selectRace}>
                {editableLineage.required_race.name || "required race"}
            </button>
        </div>

        <button
            on:click={() =>
                selectMultibleFromModal(LineageBonusCard, (selected) => {
                    const list = editableLineage.bonuses || [];

                    const exists = list.some((b) => b.id === selected.id);

                    editableLineage = {
                        ...editableLineage,
                        bonuses: exists
                            ? list.filter((bonus) => bonus.id !== selected.id)
                            : [...list, selected],
                    };
                })}
        >
            select class
        </button>

        <div class="cell-box">
            <div class="label">Class</div>
            <div class="tags">
                {#each editableLineage.bonuses as bonus, index}
                    <button
                        class="tag"
                        on:mouseenter={() => (classTooltip[index] = true)}
                        on:mouseleave={() => (classTooltip[index] = false)}
                    >
                        {bonus.name || "----"}
                    </button>
                {/each}
            </div>
        </div>

        <button
            on:click={() =>
                selectMultibleFromModal(ApptitudesList, (selected) => {
                    const list = editableLineage.aptitudes || [];

                    const exists = list.some(
                        (aptitude) => aptitude.id === selected.id,
                    );

                    editableLineage = {
                        ...editableLineage,
                        aptitudes: exists
                            ? list.filter((aptitude) => aptitude.id !== selected.id)
                            : [...list, selected],
                    };
                })}
        >
            select trait
        </button>

        <div class="cell-box">
            <div class="label">aptitudes</div>
            <div class="tags">
                {#each editableLineage.aptitudes as aptitude, index}
                    <button
                        class="tag"
                        on:mouseenter={() => (traitTooltip[index] = true)}
                        on:mouseleave={() => (traitTooltip[index] = false)}
                    >
                        {aptitude.name || "----"}
                    </button>
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
        on:mouseenter={() => showTooltip = true}
        on:mouseleave={() => showTooltip = false}
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
        on:mouseenter={() => featureShowTooltip = true}
        on:mouseleave={() => featureShowTooltip = false}
        aria-describedby="tooltip-description"
      >
        defining_features
      </button>

      

      {#if featureShowTooltip}
        <div id="tooltip-description" role="tooltip" class="tooltip">
          {lineage.defining_features || "No description"}
        </div>
      {/if}

              <div class="cell-box">
            <div class="label">required race</div>
            <div>{lineage.required_race.name || "----"}</div>
        </div>


        <div class="cell-box">
            <div class="label">Class</div>
            <div class="tags">
                {#each lineage.bonuses as bonus, index}
                    <button
                        class="tag"
                        on:mouseenter={() => (classTooltip[index] = true)}
                        on:mouseleave={() => (classTooltip[index] = false)}
                    >
                        {bonus.name || "----"}
                        {#if classTooltip[index]}
                            <div class="tooltip">
                                {bonus.bonus }
                            </div>
                        {/if}
                    </button>
                {/each}
            </div>
        </div>



        <div class="cell-box">
            <div class="label">Traits</div>
            <div class="tags">
                {#each lineage.aptitudes as aptitude, index}
                    <div>
                        {aptitude.name || "----"}
                    </div>
                {/each}
            </div>
        </div>

        <div class="buttons">
            <button on:click={startEditing}>Edit</button>
            <button on:click={deleteRow}>Delete </button>
        </div>
    {/if}
</div>
