<script>
    import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
    import { closeModal, modalSelectCallback, openModal } from "../../store/modalStore";
    import AvailabilityList from "../lists/ItemsList/availabilityList.svelte";
    import CategoryList from "../lists/ItemsList/categoryList.svelte";

    export let item;
    export let onSave;     
    export let onDelete;   

    let isEditing = item.isNew;
    let editableItem = structuredClone(item);
    let showTooltip


    function startEditing() {
        isEditing = true;
    }

    async function saveEdit() {
        let updated;

        if (item.isNew) {
            const response = await fetchPost("/api/items", editableItem);
            if (response.status === 201) {
                updated = editableItem
                updated.id = response.created.id;
                console.log(updated)
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

        if (item.isNew) {

            onDelete(item.id, true); 
        } else {
            editableItem = structuredClone(item);
        }
    }

    function deleteRow() {
        onDelete(item.id);  
    }

          function selectCategory(){
        modalSelectCallback.set((category) => {
        editableItem.category = category;

        modalSelectCallback.set(null);
        });
        openModal(CategoryList);
    }

    function selectAvailability(){
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
                <button
                    on:click={selectCategory}
                >
                    {editableItem.category.name || "category"}
                </button>
            </div>
        <div class="cell-box">
            <div class="label">Name</div>
            <input bind:value={editableItem.name} />
        </div>

        <textarea bind:value={editableItem.description} rows="3" cols="30"></textarea>

        <div class="cell-box">
                <div class="label">Availability</div>
                <button
                    on:click={selectAvailability}
                >
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
      <div>{item.category?.name || "----"}</div>
    </div>

        <div class="cell-box">
            <div class="label">Name</div>
            <div>{item.name || "----"}</div>
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
      <div class="label">Availability</div>
      <div>{item.availability?.name || "----"}</div>
    </div>

        {#if showTooltip}
            <div id="tooltip-description" role="tooltip" class="tooltip">
                {item.description}
            </div>
        {/if}

        <div class="buttons">
            {#if !$modalSelectCallback}
                <button on:click={startEditing}>Edit</button>
                <button on:click={deleteRow}>Delete </button>
            {:else}
                <button
                    on:click={() => {
                        $modalSelectCallback(item);
                        closeModal();
                    }}
                >
                    select</button
                >
            {/if}
        </div>
    {/if}
</div>
