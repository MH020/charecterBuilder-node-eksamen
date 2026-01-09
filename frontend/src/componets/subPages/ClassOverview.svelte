<script>
    import {
        fetchDelete,
        fetchPost,
        fetchUpdate,
    } from "../../../util/fetchUtil";
    import toastrDisplayHTTPCode from "../../../util/ToastrUtil";
    import { modalSelectCallback, openModal } from "../../store/modalStore";
    import ClassBonusCard from "../cards/ClassBonusCard.svelte";
    import LineageBonusCard from "../cards/LineageBonusCard.svelte";
    import ApptitudesList from "../lists/ApptitudesList.svelte";
    import WeaponClassList from "../lists/weaponLists/weaponClassList.svelte";
    import DescriptionUtil from "../UI/DescriptionUtil.svelte";
    import LevelTable from "../UI/levelTable.svelte";

    export let clss;
    const endpoint = `/api/classes/${clss.id}`;

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

    let selected = {};

    const newbonus = {
        id: null,
        class_id: clss.id,
        bonus: selected.bonus,
        characteristic: selected.characteristic,
    };

    function createBonus() {
        modalSelectCallback.set(async (selected) => {
            console.log(selected);
            const newbonus = {
                id: null,
                class_id: clss.id,
                bonus: selected.bonus,
                characteristic: selected.characteristic,
            };
            const response = await fetchPost(endpoint + "/bonuses", newbonus);
            newbonus.id = response.created.id;

            if (response.status === 201) {
                classBonuses = [
                    ...classBonuses.filter(
                        (b) =>
                            b.characteristic.id !== newbonus.characteristic.id,
                    ),
                    newbonus,
                ];
            }

            modalSelectCallback.set(null);
        });

        openModal(ClassBonusCard);
    }

    async function removeBonus(bonus) {
        const response = await fetchDelete(endpoint + "/bonuses", bonus.id);

        if (response.status === 200) {
            classBonuses = [
                ...classBonuses.filter(
                    (b) => b.characteristic.id !== bonus.characteristic.id,
                ),
            ];
        }
    }

    async function addApptitude() {
        console.log(classApptitudes);
        modalSelectCallback.set(async (selected) => {
            console.log(selected);

            const newclassApptitude = {
                id: null,
                class_id: clss.id,
                aptitude: selected,
            };

            const response = await fetchPost(
                endpoint + "/apptitudes",
                selected,
            );
            newclassApptitude.id = response.created.id;

            if (response.status === 201) {
                classApptitudes = [...classApptitudes, newclassApptitude];
            }
            modalSelectCallback.set(null);
            console.log(classApptitudes);
        });

        openModal(ApptitudesList);
    }

    async function removeApptitude(apptitude) {
        console.log(apptitude);
        const response = await fetchDelete(
            endpoint + "/apptitudes",
            apptitude.id,
        );

        if (response.status === 200) {
            classApptitudes = [
                ...classApptitudes.filter((a) => a.id !== apptitude.id),
            ];
        }
    }

    async function addWeaponProficiency() {
        modalSelectCallback.set(async (selected) => {
            const classWeaponClass = {
                id: null,
                class_id: clss.id,
                weapon_class: selected,
            };

            const response = await fetchPost(
                endpoint + "/weapon-proficiency",
                selected,
            );
            classWeaponClass.id = response.created.id;

            if (response.status === 201) {
                weaponsClasses = [...weaponsClasses, classWeaponClass];
            }
            modalSelectCallback.set(null);
        });

        openModal(WeaponClassList);
    }

    async function removeWeaponProfecency(wp) {
        const response = await fetchDelete(
            endpoint + "/weapon-proficiency",
            wp.id,
        );

        if (response.status === 200) {
            weaponsClasses = [...weaponsClasses.filter((a) => a.id !== wp.id)];
        }
    }
</script>

{#if clss}
    <div class="class-name">
        <h1>{clss.name}</h1>
    </div>

    <div class="class-overview">
        <div class="cell-box">
            <div class="cell-header">
                <div class="label">Characteristic Bonus:</div>
                <button class="add" on:click={createBonus}>
                    + Add bonus
                </button>
            </div>

            <div class="list">
                {#each classBonuses as b (b.id)}
                    <div class="item">
                        <span
                            ><DescriptionUtil item={b.characteristic} /> + ({b.bonus})</span
                        >
                        <button
                            class="delete-btn"
                            on:click={() => removeBonus(b)}
                            >Delete
                        </button>
                    </div>
                {/each}
            </div>
        </div>
    </div>

    <div class="class-overview">
        <div class="cell-box">
            <div class="cell-header">
                <div class="label">starting Apptitudes:</div>
                <button class="add" on:click={addApptitude}>
                    + Add apptitude
                </button>
            </div>

            <div class="list">
                {#each classApptitudes as a (a.id)}
                    <div class="item">
                        <span>{a.aptitude.name}</span>
                        <button
                            class="delete-btn"
                            on:click={() => removeApptitude(a)}>Delete</button
                        >
                    </div>
                {/each}
            </div>
        </div>
    </div>

    <div class="class-overview">
        <div class="cell-box">
            <div class="cell-header">
                <div class="label">Weapon Proficiency:</div>
                <button class="add" on:click={addWeaponProficiency}>
                    + Add bonus
                </button>
            </div>

            <div class="list">
                {#each weaponsClasses as wp}
                    <div class="item">
                        <span><DescriptionUtil item={wp.weapon_class} /></span>
                        <button
                            class="delete-btn"
                            on:click={() => removeWeaponProfecency(wp)}
                            >Delete
                        </button>
                    </div>
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

    {#if clss.parent_id === null}
        <LevelTable bind:classTalents bind:subClassTalents bind:powersKnown />
    {/if}
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

    .add-bonus {
        font-size: 0.85rem;
    }

    .bonus-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.35rem 0.6rem;
        background: #111;
        border: 1px solid var(--border-dark);
    }

    .add-bonus,
    .delete-btn {
        font-size: 0.75rem;
        padding: 0.2rem 0.45rem;
    }

    .list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
</style>
