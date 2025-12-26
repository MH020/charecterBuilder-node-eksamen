<script>
    import { navigate } from "svelte-routing";
    import {
        closeModal,
        modalSelectCallback,
        openModal,
    } from "../../store/modalStore";

    import DescriptionUtil from "../UI/DescriptionUtil.svelte";
    import EditableRowSlot from "../wrappers/EditableRowSlot.svelte";

    export let clss;
    export let onSave;
    export let onDelete;
    export let endpoint;

    let editableClss = structuredClone(clss);
</script>

<EditableRowSlot
    item={clss}
    {endpoint}
    {onSave}
    {onDelete}
    bind:editable={editableClss}
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
                <input bind:value={editableClss.name} />
            </div>

            <div class="cell-box">
                <div class="label">Description</div>
                <textarea
                    bind:value={editableClss.description}
                    rows="3"
                    cols="30"
                ></textarea>
            </div>

            <div class="buttons">
                <button on:click={save}>Save</button>
                <button on:click={cancel}>Cancel</button>
            </div>
        {:else}
            <div class="cell-box">
                <div class="label">Name</div>
                <div>{clss.name || "----"}</div>
            </div>

            <DescriptionUtil bind:item={clss} />

            <div class="buttons">
                {#if !$modalSelectCallback}
                    <button on:click={startEditing}>Edit</button>
                    <button on:click={remove}>Delete </button>

                    <button
                        on:click={() => {
                            navigate(`/class/?id=${clss.id}`);
                        }}
                        >class page
                    </button>
                {:else}
                    <button
                        on:click={() => {
                            $modalSelectCallback(clss);
                            closeModal();
                        }}>select</button
                    >
                {/if}
            </div>
        {/if}
    </div>
</EditableRowSlot>
