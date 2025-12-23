<script>
    import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
    import {
        closeModal,
        modalSelectCallback,
        openModal,
    } from "../../store/modalStore";
    import AvailabilityList from "../lists/ItemsList/availabilityList.svelte";
    import CategoryList from "../lists/ItemsList/categoryList.svelte";

    export let rowItem;
    export let onSave;
    export let onDelete;

    let isEditing = rowItem.isNew;
    let editableItem = structuredClone(rowItem);
    let showTooltip;

    function startEditing() {
        isEditing = true;
    }

    async function saveEdit() {
        let updated;

        if (rowItem.isNew) {
            const response = await fetchPost("/api/items", editableItem);
            if (response.status === 201) {
                updated = editableItem;
                updated.id = response.created.id;
                console.log(updated);
            }
        } else {
            await fetchUpdate("/api/items", editableItem);
            updated = editableItem;
        }

        onSave(updated);
        isEditing = false;
    }

    function cancelEdit() {
        isEditing = false;

        if (rowItem.isNew) {
            onDelete(rowItem.id, true);
        } else {
            editableItem = structuredClone(rowItem);
        }
    }

    function deleteRow() {
        onDelete(rowItem.id);
    }

    function selectCategory() {
        modalSelectCallback.set((category) => {
            editableItem.category = category;

            modalSelectCallback.set(null);
        });
        openModal(CategoryList);
    }

    function selectAvailability() {
        modalSelectCallback.set((availability) => {
            editableItem.availability = availability;

            modalSelectCallback.set(null);
        });
        openModal(AvailabilityList);
    }
</script>

<div class="row">
    {#if isEditing}
        <div class="cell-box">
            <div class="label">Category</div>
            <button on:click={selectCategory}>
                {editableItem.category.name || "category"}
            </button>
        </div>
        <div class="cell-box">
            <div class="label">Name</div>
            <input bind:value={editableItem.name} />
        </div>

        <textarea bind:value={editableItem.description} rows="3" cols="30"
        ></textarea>

        <div class="cell-box">
            <div class="label">Availability</div>
            <button on:click={selectAvailability}>
                {editableItem.availability.name || "Availability"}
            </button>
        </div>

        <div class="buttons">
            <button on:click={saveEdit}>Save</button>
            <button on:click={cancelEdit}>Cancel</button>
        </div>
    {:else}
        <div class="cell-box">
            <div class="label">category:</div>
            <div>{rowItem.category?.name || "----"}</div>
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
            <div class="label">Availability</div>
            <div>{rowItem.availability?.name || "----"}</div>
        </div>

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
