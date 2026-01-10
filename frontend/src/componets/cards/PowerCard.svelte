<script>
    import { classSelectCallback } from "../../store/classStore";
    import { modalSelectCallback, openModal } from "../../store/modalStore";
    import { user } from "../../store/userStore";
    import ClassPowersCategoryList from "../lists/classes/ClassPowersCategoryList.svelte";

    export let powerElement;
    export let onSave;
    export let onDelete;

    $: canEdit = $user.role === 'ADMIN' || $user.role === 'OWNER'

    let selecting = false;
    let editablePowerElement = structuredClone(powerElement);
    let isEditing = powerElement.isNew ?? false;

    function selectPreReq() {
        selecting = true;
        classSelectCallback.set((prereq) => {
            editablePowerElement.prerequisite_powers.pus(prereq);
            selecting = false;
        });
    }

    function selectPowerCategory() {
        modalSelectCallback.set((category) => {
            editablePowerElement.power.category = category;

            modalSelectCallback.set(null);
        });
        openModal(ClassPowersCategoryList);
    }

    function startEdit() {
        editablePowerElement = structuredClone(powerElement);
        isEditing = true;
    }

    function cancel() {
        if (powerElement.isNew) {
            // remove new card
            onDelete(powerElement.id, null, true);
        } else {
            editablePowerElement = structuredClone(powerElement);
            isEditing = false;
        }
    }

    async function save() {
        await onSave(editablePowerElement);
        isEditing = false;
    }

    function remove() {
        onDelete(powerElement.id, powerElement.power.id, powerElement.isNew);
    }
</script>

<div class="card">
    {#if isEditing}
        <div class="stat-cell">
            <div class="label">Name</div>
            <input type="text" bind:value={editablePowerElement.power.name} />
        </div>

        <div class="stat-cell">
            <div class="label">Description</div>
            <textarea bind:value={editablePowerElement.power.description}
            ></textarea>
        </div>

        <div class="stat-cell">
            <div class="label">Category</div>
            <button on:click={selectPowerCategory}>
                {editablePowerElement.power.category.name || "select category"}
            </button>
        </div>

        <div class="stat-cell">
            <div class="label">Ascendant</div>
            <input
                type="text"
                bind:value={editablePowerElement.power.ascendant}
            />
        </div>

        <div class="stat-cell">
            <div class="label">Duration</div>
            <input
                type="text"
                bind:value={editablePowerElement.power.duration}
            />
        </div>

        <div class="stat-cell">
            <div class="label">Actions</div>
            <input
                type="text"
                bind:value={editablePowerElement.power.actions}
            />
        </div>

        <div class="stat-cell">
            <div class="label">level</div>
            <input
                type="text"
                bind:value={editablePowerElement.power.level}
            />
        </div>

        <div class="stat-cell">
            <div class="label">Concentration</div>
            <input
                type="checkbox"
                bind:checked={editablePowerElement.power.concentration}
            />
        </div>

        <div class="stat-cell">
            <div class="label">DC</div>
            <input type="number" bind:value={editablePowerElement.power.dc} />
        </div>

        <div class="stat-cell">
            <div class="label">Range</div>
            <input type="text" bind:value={editablePowerElement.power.range} />
        </div>

        <div class="stat-cell">
            <div class="label">Shape</div>
            <input type="text" bind:value={editablePowerElement.power.shape} />
        </div>

        <div class="buttons">
            <button on:click={save}>Save</button>
            <button on:click={cancel}> Cancel </button>
        </div>
    {:else}
        <div class="name">{powerElement.power.name}</div>

        {#if powerElement.prerequisite_powers?.length}
            <div class="stat-cell">
                <div class="label">Prerequisites</div>

                <div class="value prereq-list">
                    {#each powerElement.prerequisite_powers as prereq}
                        <span class="prereq-pill">
                            {prereq.name}
                        </span>
                    {/each}
                </div>
            </div>
        {/if}

            <div class="stat-cell">
            <div class="label">level</div>
            <div class="value">{powerElement.level}</div>
        </div>

        <div class="stat-cell">
            <div class="label">Description</div>
            <div class="value">{powerElement.power.description}</div>
        </div>

        {#if powerElement.power.category}
            <div class="stat-cell">
                <div class="label">Category</div>
                <div class="value">{powerElement.power.category.name}</div>
            </div>
        {/if}

        {#if powerElement.power.ascendant}
            <div class="stat-cell">
                <div class="label">Ascendant</div>
                <div class="value">{powerElement.power.ascendant}</div>
            </div>
        {/if}

        {#if powerElement.power.duration}
            <div class="stat-cell">
                <div class="label">Duration</div>
                <div class="value">{powerElement.power.duration}</div>
            </div>
        {/if}

        {#if powerElement.power.actions !== null}
            <div class="stat-cell">
                <div class="label">Actions</div>
                <div class="value">{powerElement.power.actions}</div>
            </div>
        {/if}

        {#if powerElement.power.concentration !== null}
            <div class="stat-cell">
                <div class="label">Concentration</div>
                <div class="value">
                    {powerElement.power.concentration ? "Yes" : "No"}
                </div>
            </div>
        {/if}

        {#if powerElement.power.dc}
            <div class="stat-cell">
                <div class="label">DC</div>
                <div class="value">{powerElement.power.dc}</div>
            </div>
        {/if}

        {#if powerElement.power.range}
            <div class="stat-cell">
                <div class="label">Range</div>
                <div class="value">{powerElement.power.range}</div>
            </div>
        {/if}

        {#if powerElement.power.shape}
            <div class="stat-cell">
                <div class="label">Shape</div>
                <div class="value">{powerElement.power.shape}</div>
            </div>
        {/if}

        <div class="buttons">
            {#if !selecting}
            {#if canEdit}
                <button on:click={startEdit}>Edit</button>
                <button on:click={remove}>Delete </button>
                {/if}
            {:else}
                <button on:click={selectPreReq}> select</button>
            {/if}
        </div>
    {/if}
</div>

<style>
    .card {
        background-color: #1b1b1b;
        border: 1px solid #333;
        border-radius: 8px;
        padding: 1.5rem;
        width: 100%;
        max-width: 500px;
        margin: 1rem auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    }

    .card .name {
        font-family: "Courier New", monospace;
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--color-accent);
        border-bottom: 2px solid var(--color-accent-dark);
        padding-bottom: 0.25rem;
        margin-bottom: 0.75rem;
        text-transform: uppercase;
    }

    .stat-cell {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 0.5rem;
    }

    .stat-cell .label {
        min-width: 120px;
        font-weight: bold;
        color: var(--color-accent);
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .stat-cell .value {
        flex: 1 1 auto;
        color: var(--color-text);
        font-family: "Courier New", monospace;
        word-break: break-word;
    }

    .prereq-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .prereq-pill {
        padding: 0.25rem 0.6rem;
        border-radius: 4px;

        font-family: "Courier New", monospace;
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;

        background-color: #252525;
        border: 1px solid var(--color-accent-dark);
        color: var(--color-text);
    }
</style>
