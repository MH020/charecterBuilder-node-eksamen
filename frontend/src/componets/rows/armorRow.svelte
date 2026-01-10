<script>
    import {closeModal,modalSelectCallback, openModal} from "../../store/modalStore";
    import AvailabilityList from "../lists/ItemsList/availabilityList.svelte";
    import EditableRowSlot from "../wrappers/Editable.svelte";

    export let armor;
    export let onSave;
    export let onDelete;
    export let endpoint; 
    let showToolTip
    let editableArmor = structuredClone(armor);

    function selectAvailability() {
        modalSelectCallback.set((availability) => {
            editableArmor.availability = availability;

            modalSelectCallback.set(null);
        });
        openModal(AvailabilityList);
    }

</script>


<EditableRowSlot
  item={armor}
  endpoint={endpoint}
  onSave={onSave}
  onDelete={onDelete}
  bind:editable={editableArmor}
  let:isEditing
  let:startEditing
  let:save
  let:cancel
  let:remove
>
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
      <button on:click={save}>Save</button>
      <button on:click={cancel}>Cancel</button>
    </div>

    {:else}
        <div class="cell-box">
            <div class="label">Name</div>
            <div>{armor.name || "----"}</div>
        </div>

        <button
            class="description-btn"
            on:mouseenter={() => (showToolTip = true)}
            on:mouseleave={() => (showToolTip = false)}
            aria-describedby="tooltip-description"
        >
            description
        </button>

        <div class="cell-box">
            <div class="label">Head AP</div>
            <div>{armor.head_ap || "----"}</div>
        </div>

        <div class="cell-box">
            <div class="label">Body AP</div>
            <div>{armor.body_ap || "----"}</div>
        </div>

        <div class="cell-box">
            <div class="label">Right arm AP</div>
            <div>{armor.right_arm_ap || "----"}</div>
        </div>

        <div class="cell-box">
            <div class="label">Left arm AP</div>
            <div>{armor.left_arm_ap || "----"}</div>
        </div>

        <div class="cell-box">
            <div class="label">Right leg AP</div>
            <div>{armor.right_leg_ap || "----"}</div>
        </div>

        <div class="cell-box">
            <div class="label">Left leg AP</div>
            <div>{armor.left_leg_ap || "----"}</div>
        </div>

        <div class="cell-box">
            <div class="label">Left leg AP</div>
            <div>{armor.left_leg_ap || "----"}</div>
        </div>

        <div class="cell-box">
            <div class="label">weight</div>
            <div>{armor.wt || "----"}</div>
        </div>

        <div class="cell-box">
            <div class="label">Availability</div>
            <div>{armor.availability?.name || "----"}</div>
        </div>

        {#if showToolTip}
            <div id="tooltip-description" role="tooltip" class="tooltip">
                {armor.description}
            </div>
        {/if}

        <div class="buttons">
            {#if !$modalSelectCallback}
                <button on:click={startEditing}>Edit</button>
                <button on:click={remove}>Delete </button>
            {:else}
                <button
                    on:click={() => {
                        $modalSelectCallback(armor);
                        closeModal();
                    }}
                >
                    select</button
                >
            {/if}
        </div>
    {/if}
</div>
</EditableRowSlot>