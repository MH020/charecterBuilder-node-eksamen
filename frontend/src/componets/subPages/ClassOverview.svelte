<script>
    import { fetchDelete, fetchPost } from "../../../util/fetchUtil";
    import { modalSelectCallback, openModal } from "../../store/modalStore";
    import ClassBonusCard from "../cards/ClassBonusCard.svelte";
    import LineageBonusCard from "../cards/LineageBonusCard.svelte";
    import ApptitudesList from "../lists/ApptitudesList.svelte";
    import TalentList from "../lists/characterLists/TalentList.svelte";
    import TraitsList from "../lists/characterLists/TraitsList.svelte";
    import ItemsList from "../lists/ItemsList/itemsList.svelte";
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
                endpoint + "/weapon-class",
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
            endpoint + "/weapon-class",
            wp.id,
        );

        if (response.status === 200) {
            weaponsClasses = [...weaponsClasses.filter((a) => a.id !== wp.id)];
        }
    }


        async function addWeaponTraining() {
        modalSelectCallback.set(async (selected) => {
            const classWeaponTraining = {
                id: null,
                class_id: clss.id,
                talent: selected,
            };

            const response = await fetchPost(
                endpoint + "/weapon-training",
                selected,
            );
            classWeaponTraining.id = response.created.id;

            if (response.status === 201) {
                weaponsTrainings = [...weaponsTrainings, classWeaponTraining];
            }
            modalSelectCallback.set(null);
        });

        openModal(TalentList);
    }

    async function removeWeaponTraining(wt) {
        const response = await fetchDelete(
            endpoint + "/weapon-training",
            wt.id,
        );

        if (response.status === 200) {
            weaponsTrainings = [...weaponsTrainings.filter((ct) => ct.id !== wt.id)];
        }
    }


            async function addItems() {
        modalSelectCallback.set(async (selected) => {
            const NewClassItem = {
                id: null,
                class_id: clss.id,
                item: selected,
            };

            const response = await fetchPost(
                endpoint + "/items",
                selected,
            );
            NewClassItem.id = response.created.id;

            if (response.status === 201) {
                classItems = [...classItems, NewClassItem];
            }
            modalSelectCallback.set(null);
        });

        openModal(ItemsList);
    }

    async function removeItems(wt) {
        const response = await fetchDelete(
            endpoint + "/items",
            wt.id,
        );

        if (response.status === 200) {
            classItems = [...classItems.filter((ct) => ct.id !== wt.id)];
        }
    }


                async function addTrait() {
        modalSelectCallback.set(async (selected) => {
            const NewClassTrait = {
                id: null,
                class_id: clss.id,
                trait: selected,
            };

            const response = await fetchPost(
                endpoint + "/traits",
                selected,
            );
            NewClassTrait.id = response.created.id;

            if (response.status === 201) {
                classTraits = [...classTraits, NewClassTrait];
            }
            modalSelectCallback.set(null);
        });

        openModal(TraitsList);
    }

    async function removeTrait(trait) {
        const response = await fetchDelete(
            endpoint + "/traits",
            trait.id,
        );

        if (response.status === 200) {
            classTraits = [...classTraits.filter((t) => t.id !== trait.id)];
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
                        <span><DescriptionUtil item={b.characteristic} /> + ({b.bonus})</span>
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
                    + Add Proficiency
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
            <div class="cell-header">
                <div class="label">Weapon Training:</div>
                <button class="add" on:click={addWeaponTraining}>
                    + Add Weapon Training
                </button>
            </div>

            <div class="list">
                {#each weaponsTrainings as wt}
                    <div class="item">
                        <span><DescriptionUtil item={wt.talent} /></span>
                        <button
                            class="delete-btn"
                            on:click={() => removeWeaponTraining(wt)}
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
                <div class="label">Specialist Equipment:</div>
                <button class="add" on:click={addItems}>
                    + Add Specialist Equipment
                </button>
            </div>

            <div class="list">
                {#each classItems as ci}
                    <div class="item">
                        <span><DescriptionUtil item={ci.item} /></span>
                        <button
                            class="delete-btn"
                            on:click={() => removeItems(ci)}
                            >Delete
                        </button>
                    </div>
                {/each}
            </div>
        </div>
    </div>


    {#if startingTraits.length !== 0}
        <div class="class-overview">
            <div class="cell-box">
                <div class="cell-header">
                    <div class="label">Starting Traits:</div>
                    <button class="add" on:click={addTrait}>
                        + Add Starting Traits
                    </button>
                </div>

                <div class="list">
                    {#each classTraits as t}
                        <div class="item">
                            <span><DescriptionUtil item={t.trait} /></span>
                            <button
                                class="delete-btn"
                                on:click={() => removeTrait(t)}
                                >Delete
                            </button>
                        </div>
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

.class-overview {
    background: var(--bg-panel, #1a1a1a);
    border: 1px solid var(--border-dark, #333);
    border-radius: 6px;
    margin-bottom: 1rem;
    padding: 1rem 1.25rem;
}


.cell-box {
    display: grid;
    grid-template-columns: minmax(240px, 320px) minmax(0, 1fr);
    gap: 1.5rem;
    align-items: start;
    width: 100%;
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
    width: 100%;
}


.item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    width: 100%;
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

/* ---------- BUTTONS ---------- */

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
