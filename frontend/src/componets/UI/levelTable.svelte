<script>
    export let classTalents;
    export let subClassTalents;
    export let classPowers;

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

    if (classPowers.length !== 0) {
        classPowers.forEach((classPower) => {
            levels[classPower.level - 1].powers.push(classPower);
        });
    }
</script>

{#each levels as lvl}
    <tr>
        <td>{lvl.level}</td>
        <td>
            {#each lvl.talents as talent}
                <div>{talent.name}</div>
            {/each}

            {#each lvl.powers as power}
                <div>{power.name}</div>
            {/each}
        </td>
    </tr>
{/each}
