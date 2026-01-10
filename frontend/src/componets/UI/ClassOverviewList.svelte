<script>
    import { user } from "../../store/userStore";

    export let label
    export let addLabel = '+ Add'
    export let items = []
    export let onAdd
    export let onRemove

    $: canEdit = $user.role === 'ADMIN' || $user.role === 'OWNER'
</script>

<div class="class-overview">
    <div class="cell-box">
        <div class="cell-header">
            <div class="label">{label}</div>
            {#if canEdit}
            <button class="add" on:click={onAdd}>
                {addLabel}
            </button>
            {/if}
        </div>

        <div class="list">
            {#each items as item (item.id)}
                <div class="item">
                    <span>
                        <slot name="item" {item} />
                    </span>
                    {#if canEdit}
                        <button
                            class="delete-btn"
                            on:click={() => onRemove(item)}
                        >
                            Delete
                        </button>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</div>


<style>

.class-overview {
    background: var(--bg-panel, #1a1a1a);
    border: 1px solid var(--border-dark, #333);
     width: 100%;
    border-radius: 6px;
    margin-bottom: 1rem;
    padding: 1rem 1.25rem;
}


.cell-box {
    display: grid;
    grid-template-columns: minmax(240px, 320px) minmax(0, 1fr);
    gap: 1.5rem;
    align-items: start;
}




.cell-header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.label {
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #ffb86c;
    line-height: 1.3;
}


.list {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
}


.item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    width: 90%;
    min-height: 2.4rem;

    padding: 0.55rem 0.9rem;
    background: #111;
    border: 1px solid var(--border-dark, #333);
    border-radius: 4px;

    font-family: 'Courier New', monospace;
}


.item span {
    flex: 1;
    min-width: 0;
}


.add,
.delete-btn {
    font-size: 0.7rem;
    padding: 0.25rem 0.55rem;
    text-transform: uppercase;
    white-space: nowrap;
}

.delete-btn {
    opacity: 0.85;
}

.delete-btn:hover {
    opacity: 1;
}

</style>