<script>
    import DescriptionUtil from "../UI/DescriptionUtil.svelte";
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
        return trait.level === 1;
    });
    console.log("starting traits ? ", startingTraits);
</script>

{#if clss}
    <div class="class-name">
        <h1>{clss.name}</h1>
    </div>

    <div class="class-overview">
        <div class="cell-box">
            <div class="label">{"Characteristic Bonus"}:</div>
            <div class="tags">
                {#each classBonuses as b}
                    <h1>{b.characteristic.name + ` + (${b.bonus})`}</h1>
                {/each}
            </div>
        </div>
    </div>

    <div class="class-overview">
        <div class="cell-box">
            <div class="label">{"Starting Aptitudes"}:</div>
            <div class="tags">
                {#each classApptitudes as a}
                    <h1>{a.aptitude.name}</h1>
                {/each}
            </div>
        </div>
    </div>

    <div class="class-overview">
        <div class="cell-box">
            <div class="label">{"Weapon Proficiency"}:</div>
            <div class="tags">
                {#each weaponsClasses as wp}
                    <DescriptionUtil item={wp.weapon_class} /> ,
                {/each}
            </div>
        </div>
    </div>

    <div class="class-overview">
        <div class="cell-box">
            <div class="label">{"Weapon Training"}:</div>
            <div class="tags">
                {#each weaponsTrainings as wt}
                    <DescriptionUtil item={wt.talent} /> ,
                {/each}
            </div>
        </div>
    </div>

    <div class="class-overview">
        <div class="cell-box">
            <div class="label">{"Specialist Equipment"}:</div>
            <div class="tags">
                {#each classItems as ct}
                    <DescriptionUtil item={ct.item} /> ,
                {/each}
            </div>
        </div>
    </div>

    {#if startingTraits.length !== 0}
        <div class="class-overview">
            <div class="cell-box">
                <div class="label">{"Starting Traits"}:</div>
                <div class="tags">
                    {#each startingTraits as st}
                        <DescriptionUtil item={st.trait} /> ,
                    {/each}
                </div>
            </div>
        </div>
    {/if}

    <LevelTable bind:classTalents bind:subClassTalents bind:powersKnown />
{:else}
    <p>Loading class…</p>
{/if}

<style>
    .class-name h1 {
        letter-spacing: 0.15em;
        text-transform: uppercase;
        border-bottom: 2px solid var(--border-dark);
        padding-bottom: 0.5rem;
        margin-bottom: 1.5rem;
    }

    .class-overview {
        background: var(--bg-panel);
        border: 1px solid var(--border-dark);
        margin-bottom: 1rem;
        padding: 0.75rem 1rem;
    }

    .cell-box {
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 1rem;
        align-items: start;
    }

    .label {
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .tags h1 {
        font-size: 0.85rem;
        font-weight: normal;
        margin: 0;
        padding: 0.3rem 0.6rem;
        border: 1px solid var(--border-dark);
        background: #111;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
</style>
