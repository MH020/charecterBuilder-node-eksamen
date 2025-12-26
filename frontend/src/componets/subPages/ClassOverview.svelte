<script>
    import ClassesInfoList from "../UI/ClassesInfoList.svelte";
    import LevelTable from "../UI/levelTable.svelte";

    export let clss;
    console.log(clss);
    $: classPowers = clss?.powers ?? [];
    $: powersKnown = clss?.powers_known ?? [];
    $: classTraits = clss?.traits ?? [];
    $: classApptitudes = clss?.aptitudes ?? [];
    $: classTalents = clss?.talents ?? [];
    $: weaponsTrainings = clss?.weapon_trainings ?? [];
    $: weaponsClasses = clss?.weapon_classes ?? [];
    $: classBonuses = clss?.bonuses ?? [];
    $: classItems = clss?.items ?? [];
    $: subClassTalents = clss?.SubclassTalents ?? [];

    $: startingTraits = classTraits.filter((trait) => {
        trait.level = 1;
    });
</script>

{#if clss}
    <div class="class-name">
        <h1>{clss.name}</h1>
    </div>

    <div class="class-overview">
        <div class="cell-box">
            <div class="label">{"Characteristic Bonus:"}:</div>
            <div class="tags">
                {#each classBonuses as b}
                    <h1>{b.characteristic.name + `${b.bonus}`}</h1>
                {/each}
            </div>
        </div>
    </div>

        <div class="class-overview">
        <div class="cell-box">
            <div class="label">{"Starting Aptitudes:"}:</div>
            <div class="tags">
                {#each classApptitudes as a}
                    <h1>{a.aptitude.name }</h1>
                {/each}
            </div>
        </div>
    </div>

            <div class="class-overview">
        <div class="cell-box">
            <div class="label">{"Weapon Proficiency:"}:</div>
            <div class="tags">
                {#each weaponsClasses as wp}
                    <h1>{wp.weapon_class.name }</h1>
                {/each}
            </div>
        </div>
    </div>

    <div class="class-overview">
        <div class="cell-box">
            <div class="label">{"Weapon Training:"}:</div>
            <div class="tags">
                {#each weaponsTrainings as wt}
                    <h1>{wt.talent.name }</h1>
                {/each}
            </div>
        </div>
    </div>


    {#if startingTraits.length !== 0}

    {/if}

    <LevelTable {classTalents} {subClassTalents} {classPowers} />
{:else}
    <p>Loading class…</p>
{/if}
