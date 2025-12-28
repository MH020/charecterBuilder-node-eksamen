<script>
    import DescriptionUtil from "./DescriptionUtil.svelte";

    export let classTalents = [];
    export let subClassTalents = [];
    export let powersKnown = [];

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

    if (powersKnown.length !== 0) {
        powersKnown.forEach((classPower) => {
            levels[classPower.level - 1].powers.push(classPower);
        });
    }
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
                    {#if lvl.talents.length}
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
                            <div>{power.powers_known}</div>
                        {/each}
                    {:else}
                        —
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
    font-family: 'Courier New', monospace;
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