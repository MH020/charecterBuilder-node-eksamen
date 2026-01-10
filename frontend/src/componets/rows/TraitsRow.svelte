<script>
    import {
        closeModal,
        modalSelectCallback,
        openModal,
    } from "../../store/modalStore";
    import RaceList from "../lists/characterLists/RaceList.svelte";
    import DescriptionUtil from "../UI/DescriptionUtil.svelte";
    import EditableRowSlot from "../wrappers/Editable.svelte";

    export let trait;
    export let onSave;
    export let onDelete;
    export let endpoint;
    let editableTrait = structuredClone(trait);

    function selectElement(element, component) {
        modalSelectCallback.set((selectedElement) => {
            editableTrait = { ...editableTrait, [element]: selectedElement };
            modalSelectCallback.set(null);
        });
        openModal(component);
    }

    const categories = [
        "nothing",
        "disorder",
        "malignancy",
        "malice",
        "blessing",
    ];
    let selectedCategory = trait.category;

    $: if (selectedCategory) {
        editableTrait.category = selectedCategory;
    }
</script>

<EditableRowSlot
    item={trait}
    {endpoint}
    {onSave}
    {onDelete}
    bind:editable={editableTrait}
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
                <input bind:value={editableTrait.name} />
            </div>

            <textarea bind:value={editableTrait.description} rows="3" cols="30"
            ></textarea>

            <div class="cell-box">
                <div class="label">Has input?</div>
                <input type="checkbox" bind:checked={editableTrait.has_input} />
            </div>

            <div class="cell-box">
                <div class="label">required race</div>
                <button on:click={() => selectElement("race", RaceList)}>
                    {editableTrait.race.name || "race trait belongs to"}
                </button>
            </div>

            <div class="select-box">
                <div class="label">type</div>
                <select bind:value={editableTrait.category}>
                    <option value="" disabled selected>Select a type</option>
                    {#each categories as category}
                        <option value={category}>{category}</option>
                    {/each}
                </select>
            </div>

            <div class="buttons">
                <button on:click={save}>Save</button>
                <button on:click={cancel}>Cancel</button>
            </div>
        {:else}
            <div class="cell-box">
                <div class="label">Name</div>
                <div>
                    {#if trait.name}
                        <DescriptionUtil item={trait} />
                        {#if trait.has_input}
                            <span> (x)</span>
                        {/if}
                    {:else}
                        ----
                    {/if}
                </div>
            </div>

            {#if trait.race.id}
                <div class="row-fields">
                    <div class="cell-box">
                        <div class="label">for race</div>
                        <div>{trait.race.name || "-----"}</div>
                    </div>
                </div>
            {/if}

            <div class="row-fields">
                <div class="cell-box">
                    <div class="label">type</div>
                    <div>{trait.category || "----"}</div>
                </div>
            </div>
            <div class="buttons">
                {#if !$modalSelectCallback}
                    <button on:click={startEditing}>Edit</button>
                    <button on:click={remove}>Delete</button>
                {:else}
                    <button
                        on:click={() => {
                            $modalSelectCallback(trait);
                            closeModal();
                        }}
                    >
                        Select
                    </button>
                {/if}
            </div>
        {/if}
    </div>
</EditableRowSlot>
