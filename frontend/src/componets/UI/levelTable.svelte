<script>
    import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
    import { user } from "../../store/userStore";
    import DescriptionUtil from "./DescriptionUtil.svelte";

    export let classTalents = [];
    export let subClassTalents = [];
    export let powersKnown = [];
    export let clss;
    export let endpoint;
    export let classPowers

    let editingPowerId = null;

    $: canEdit = $user.role === 'ADMIN' || $user.role === 'OWNER'

    function startEditing(power) {
        editingPowerId = power.id;
    }

    function cancelEdit() {
        editingPowerId = null;
    }


    function addPowersKnownColumn(level){
        const newPower = {
            id: crypto.randomUUID(),
            class_id: clss.id,
            powers_known: "",
            level: level,
            isNew: true
        };

        powersKnown = [...powersKnown, newPower]
        editingPowerId = newPower.id
    }

    async function addPowersKnown(level, power) {
        let response;    
        
        const payload = {
            id: power.id, 
            class_id: clss.id,
            powers_known: power.powers_known,
            level: level
        };

        if (power.id  && !power.isNew) {
            response = await fetchUpdate(endpoint + "/powers-known", payload)

        } else {
            response = await fetchPost(
                endpoint + "/powers-known",
                payload,
            );
            power.id = response.created.id;
        }

        if (response.status === 201) {
            if (!powersKnown.some(p => p.id === power.id)) {
                powersKnown = [...powersKnown, power];
            }
        }
        
        editingPowerId = null; 
    }

    let levels = Array.from({ length: 20 }, (_, i) => ({
        level: i + 1,
        talents: [],
        powers: [],
    }));

    classTalents.forEach((talent) => {
        levels[talent.level - 1].talents.push(talent);
    });

    if (subClassTalents.length !== 0) {
        subClassTalents.forEach((subClasstalent) => {
            levels[subClasstalent.level - 1].talents.push({
                name: "Subclass Feature",
            });
        });
    }

    $: levels = levels.map(lvl => ({
        ...lvl,
        powers: powersKnown.filter(p => p.level === lvl.level),
        
    }));

</script>

<table class="level-table">
    <thead>
        <tr>
            <th>Level</th> <th>Talents</th>
            {#if classPowers.length}
            <th>Powers Known</th>
            {/if}
        </tr>
    </thead>
    <tbody>
        {#each levels as lvl}
            <tr>
                <td>{lvl.level}</td>

                <td>
                    {#if classPowers.length}
                        {#each lvl.talents as t}
                            <DescriptionUtil item={t.talent} /> ,
                        {/each}
                    {:else}
                        —
                    {/if}
                </td>
                {#if classPowers.length}
                <td>
                    {#if lvl.powers.length}
                        {#each lvl.powers as power}
                            {#if editingPowerId === power.id}
                            <div class="powers-known-row editing">
                                <input
                                    class="powers-known-input"
                                    bind:value={power.powers_known}
                                />

                                <button
                                    class="powers-known-btn save"
                                    on:click={() => addPowersKnown(lvl.level, power)}
                                >
                                    ✓
                                </button>

                                <button
                                    class="powers-known-btn cancel"
                                    on:click={cancelEdit}
                                >
                                    ✕
                                </button>
                            </div>
                                {:else}
                                    <div class="powers-known-row">
                                        <span class="powers-known-value">
                                            {power.powers_known}
                                        </span>
                                        {#if canEdit}
                                            <button
                                                class="powers-known-btn edit"
                                                on:click={() => startEditing(power)}
                                            >
                                                edit
                                            </button>
                                        {/if}
                                    </div>
                                {/if}
                        {/each}
                    {:else}
                        <div class="powers-known-empty">
                            <span>—</span>
                            {#if canEdit}
                                <button
                                    class="powers-known-btn edit"
                                    on:click={() => addPowersKnownColumn(lvl.level)}
                                >
                                    + Add
                                </button>
                            {/if}
                        </div>
                    {/if}
                </td>
                {/if}
            </tr>
        {/each}
    </tbody>
</table>

<style>
    .level-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 2rem;
        font-family: "Courier New", monospace;
        color: var(--color-text);
    }

    .level-table th,
    .level-table td {
        border: 1px solid #333;
        padding: 0.5rem 0.75rem;
        text-align: left;
        vertical-align: top;
    }

    .level-table th {
        background-color: #1b1b1b;
        color: var(--color-accent);
        text-transform: uppercase;
        font-size: 0.85rem;
        letter-spacing: 0.05em;
    }

    .level-table tr:nth-child(even) td {
        background-color: #181818;
    }

    .level-table td {
        background-color: #121212;
    }

    .level-table td div {
        padding: 0.2rem 0;
        border-bottom: 1px dashed #333;
    }

    .level-table td div:last-child {
        border-bottom: none;
    }

    .powers-known-empty {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #666;
}

.powers-known-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0;
    border-bottom: 1px dashed #333;
}

.powers-known-row:last-child {
    border-bottom: none;
}

.powers-known-value {
    flex: 1;
    font-weight: bold;
    color: var(--color-accent);
}

.powers-known-input {
    flex: 1;
    background: #0d0d0d;
    border: 1px solid #333;
    color: var(--color-text);
    padding: 0.25rem 0.4rem;
    font-family: inherit;
}

.powers-known-btn {
    background: #1b1b1b;
    border: 1px solid #333;
    color: var(--color-text);
    padding: 0.2rem 0.4rem;
    font-size: 0.75rem;
    cursor: pointer;
    line-height: 1;
}

.powers-known-btn:hover {
    background: #252525;
}

.powers-known-btn.save {
    color: #7dff9a;
}

.powers-known-btn.cancel {
    color: #ff7d7d;
}

.powers-known-btn.edit {
    color: var(--color-accent);
}

</style>
