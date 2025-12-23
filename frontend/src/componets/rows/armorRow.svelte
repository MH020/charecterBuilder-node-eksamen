<script>
    import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
    import {
        closeModal,
        modalSelectCallback,
        openModal,
    } from "../../store/modalStore";
    import AvailabilityList from "../lists/ItemsList/availabilityList.svelte";

    export let rowItem;
    export let onSave;
    export let onDelete;

    let isEditing = rowItem.isNew;
    let editableArmor = structuredClone(rowItem);
    let showTooltip;

    function startEditing() {
        isEditing = true;
    }

    async function saveEdit() {
        let updated;

        if (rowItem.isNew) {
            const response = await fetchPost("/api/items", editableArmor);
            if (response.status === 201) {
                updated = editableArmor;
                updated.id = response.created.id;
            }
        } else {
            await fetchUpdate("/api/items", editableArmor);
            updated = editableArmor;
        }

        onSave(updated);
        isEditing = false;
    }

    function cancelEdit() {
        isEditing = false;

        if (rowItem.isNew) {
            onDelete(rowItem.id, true);
        } else {
            editableArmor = structuredClone(rowItem);
        }
    }

    function deleteRow() {
        onDelete(rowItem.id);
    }

    function selectAvailability() {
        modalSelectCallback.set((availability) => {
            editableArmor.availability = availability;

            modalSelectCallback.set(null);
        });
        openModal(AvailabilityList);
    }
</script>

<div class="row">
    {#if isEditing}
    <div class="cell-box">
      <div class="label">Name</div>
      <input bind:value={editableArmor.name} />
    </div>

    <div class="cell-box">
      <div class="label">Description</div>
      <textarea bind:value={editableArmor.description} rows="3" cols="30"></textarea>
    </div>

    <div class="cell-box">
      <div class="label">Head AP</div>
      <input type="number" bind:value={editableArmor.head_ap} />
    </div>

    <div class="cell-box">
      <div class="label">Body AP</div>
      <input type="number" bind:value={editableArmor.body_ap} />
    </div>

    <div class="cell-box">
      <div class="label">Right Arm AP</div>
      <input type="number" bind:value={editableArmor.right_arm_ap} />
    </div>

    <div class="cell-box">
      <div class="label">Left Arm AP</div>
      <input type="number" bind:value={editableArmor.left_arm_ap} />
    </div>

    <div class="cell-box">
      <div class="label">Right Leg AP</div>
      <input type="number" bind:value={editableArmor.right_leg_ap} />
    </div>

    <div class="cell-box">
      <div class="label">Left Leg AP</div>
      <input type="number" bind:value={editableArmor.left_leg_ap} />
    </div>

    <div class="cell-box">
      <div class="label">Weight</div>
      <input type="number" bind:value={editableArmor.wt} />
    </div>

    <div class="cell-box">
      <div class="label">Availability</div>
      <button on:click={selectAvailability}>
        {editableArmor.availability?.name || "Availability"}
      </button>
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

        <button
            class="description-btn"
            on:mouseenter={() => (showTooltip = true)}
            on:mouseleave={() => (showTooltip = false)}
            aria-describedby="tooltip-description"
        >
            description
        </button>

        <div class="cell-box">
            <div class="label">Head AP</div>
            <div>{rowItem.head_ap || "----"}</div>
        </div>

        <div class="cell-box">
            <div class="label">Body AP</div>
            <div>{rowItem.body_ap || "----"}</div>
        </div>

        <div class="cell-box">
            <div class="label">Right arm AP</div>
            <div>{rowItem.right_arm_ap || "----"}</div>
        </div>

        <div class="cell-box">
            <div class="label">Left arm AP</div>
            <div>{rowItem.left_arm_ap || "----"}</div>
        </div>

        <div class="cell-box">
            <div class="label">Right leg AP</div>
            <div>{rowItem.right_leg_ap || "----"}</div>
        </div>

        <div class="cell-box">
            <div class="label">Left leg AP</div>
            <div>{rowItem.left_leg_ap || "----"}</div>
        </div>

        <div class="cell-box">
            <div class="label">Left leg AP</div>
            <div>{rowItem.left_leg_ap || "----"}</div>
        </div>

        <div class="cell-box">
            <div class="label">weight</div>
            <div>{rowItem.wt || "----"}</div>
        </div>

        <div class="cell-box">
            <div class="label">Availability</div>
            <div>{rowItem.availability?.name || "----"}</div>
        </div>

        {#if showTooltip}
            <div id="tooltip-description" role="tooltip" class="tooltip">
                {rowItem.description}
            </div>
        {/if}

        <div class="buttons">
            {#if !$modalSelectCallback}
                <button on:click={startEditing}>Edit</button>
                <button on:click={deleteRow}>Delete </button>
            {:else}
                <button
                    on:click={() => {
                        $modalSelectCallback(rowItem);
                        closeModal();
                    }}
                >
                    select</button
                >
            {/if}
        </div>
    {/if}
</div>
