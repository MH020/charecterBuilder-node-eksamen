<script>
    import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
    import { selectMultibleFromModal } from "../../../util/ListUtil";
    import { closeModal, modalSelectCallback } from "../../store/modalStore";

    export let rowItem;
    export let onSave;
    export let onDelete;

    let isEditing = rowItem.isNew;
    let editableCraftmanship = structuredClone(rowItem);
    let showTooltip;

    function startEditing() {
        isEditing = true;
    }

    async function saveEdit() {
        let updated;

        if (rowItem.isNew) {
            const response = await fetchPost(
                "/api/craftsmanship",
                editableCraftmanship,
            );
            if (response.status === 201) {
                updated = editableCraftmanship;
                updated.id = response.created.id;
                console.log(updated);
            }
        } else {
            await fetchUpdate("/api/craftsmanship", editableCraftmanship);
            updated = editableCraftmanship;
        }

        onSave(updated);
        isEditing = false;
    }

    function cancelEdit() {
        isEditing = false;

        if (rowItem.isNew) {
            onDelete(rowItem.id, true);
        } else {
            editableCraftmanship = structuredClone(rowItem);
        }
    }

    function deleteRow() {
        onDelete(rowItem.id);
    }
</script>

<div class="row">
    {#if isEditing}
        <div class="cell-box">
            <div class="label">Name</div>
            <input bind:value={editableCraftmanship.name} />
        </div>

        <textarea
            bind:value={editableCraftmanship.description}
            rows="3"
            cols="30"
        ></textarea>

        <div class="cell-box">
            <div class="label">Category</div>
            <select bind:value={editableCraftmanship.category}>
                <option value="" disabled>Select category</option>
                <option value="melee">Melee</option>
                <option value="ranged">Ranged</option>
                <option value="armor">Armor</option>
            </select>
        </div>

        <div class="cell-box">
            <div class="label">Hit Mod</div>
            <input
                type="number"
                bind:value={editableCraftmanship.hit_modifier}
            />
        </div>

        <div class="cell-box">
            <div class="label">Damage Mod</div>
            <input
                type="number"
                bind:value={editableCraftmanship.damage_modifier}
            />
        </div>

        <div class="cell-box">
            <div class="label">AP Mod</div>
            <input
                type="number"
                bind:value={editableCraftmanship.ap_modifier}
            />
        </div>

        <div class="cell-box">
            <div class="label">Weight Mod</div>
            <input
                type="number"
                bind:value={editableCraftmanship.wt_modifier}
            />
        </div>

        <div class="buttons">
            <button on:click={saveEdit}>Save</button>
            <button on:click={cancelEdit}>Cancel</button>
        </div>
    {:else}
        <div class="cell-box">
            <div class="label">Category</div>
            <div>{rowItem.category || "----"}</div>
        </div>

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

        {#if showTooltip}
            <div id="tooltip-description" role="tooltip" class="tooltip">
                {rowItem.description}
            </div>
        {/if}

        <div class="cell-box">
            <div class="label">Hit Mod</div>
            <div>{rowItem.hit_modifier ?? "—"}</div>
        </div>

        <div class="cell-box">
            <div class="label">Damage Mod</div>
            <div>{rowItem.damage_modifier ?? "—"}</div>
        </div>

        <div class="cell-box">
            <div class="label">AP Mod</div>
            <div>{rowItem.ap_modifier ?? "—"}</div>
        </div>

        <div class="cell-box">
            <div class="label">Weight Mod</div>
            <div>{rowItem.wt_modifier ?? "—"}</div>
        </div>

        <div class="buttons">
            {#if !$modalSelectCallback}
                <button on:click={startEditing}>Edit</button>
                <button on:click={deleteRow}>Delete</button>
            {:else}
                <button
                    on:click={() => {
                        $modalSelectCallback(rowItem);
                        closeModal();
                    }}
                >
                    Select
                </button>
            {/if}
        </div>
    {/if}
</div>
