<script>
    import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
    import DescriptionUtil from "./DescriptionUtil.svelte";

    export let classTalents = [];
    export let subClassTalents = [];
    export let powersKnown = [];
    export let clss;
    export let endpoint;
    export let classPowers

    let editingPowerId = null;

    function startEditing(power) {
        editingPowerId = power.id;
    }

    function cancelEdit() {
        editingPowerId = null;
    }


    function addpowerKnownColum(level){
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
        let response    
        
        const payload = {
            id: power.id, 
            class_id: clss.id,
            powers_known: power.powers_known,
            level: level
        };

        if (power.id  && !power.isNew) {

            response = await fetchUpdate(endpoint + "/powers-known", payload)

        } else {
            console.log(payload)
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


    console.log(levels)
</script>

<table class="level-table">
    <thead>
        <tr>
            <th>Level</th> <th>Talents</th> <th>Powers Known</th>
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

                <td>
                    {#if lvl.powers.length}
                        {#each lvl.powers as power}
                            {#if editingPowerId === power.id}
                                <input bind:value={power.powers_known} />

                                <button
                                    class="powers-known--edit-btn"
                                    on:click={() => addPowersKnown(lvl.level, power)}
                                >
                                    save
                                </button>

                                <button
                                    class="powers-known--cancel-btn"
                                    on:click={cancelEdit}
                                >
                                    Cancel
                                </button>
                            {:else}
                                <div>{power.powers_known}</div>

                                <button
                                    class="powers-known--edit-btn"
                                    on:click={() => startEditing(power)}
                                >
                                    edit
                                </button>
                            {/if}
                        {/each}
                    {:else}
                        —
                        <button on:click={() => addpowerKnownColum(lvl.level)}> Add powers known</button>
                    {/if}
                </td>
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
</style>
