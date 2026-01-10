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
    import ClassOverviewList from "../UI/ClassOverviewList.svelte";
    import DescriptionUtil from "../UI/DescriptionUtil.svelte";
    import LevelTable from "../UI/levelTable.svelte";

    export let clss;
    const endpoint = `/api/classes/${clss.id}`;

    $: classPowers = clss?.powers ?? [];
    $: powersKnown = clss?.powers_known ?? [];
    $: classTraits = clss?.traits ?? [];
    $: classAptitudes = clss?.aptitudes ?? [];
    $: classTalents = clss?.talents ?? [];
    $: weaponsTrainings = clss?.weapon_trainings ?? [];
    $: weaponsClasses = clss?.weapon_classes ?? [];
    $: classBonuses = clss?.bonuses ?? [];
    $: classItems = clss?.items ?? [];
    $: subClassTalents = clss?.SubclassTalents ?? [];

    $: startingTraits = classTraits.filter((trait) => {
        return trait.level === 1;
    });

    function createBonus() {
        modalSelectCallback.set(async (selected) => {
            const newBonus = {
                id: null,
                class_id: clss.id,
                bonus: selected.bonus,
                characteristic: selected.characteristic,
            };
            const response = await fetchPost(endpoint + "/bonuses", newBonus);
            newBonus.id = response.created.id;

            if (response.status === 201) {
                classBonuses = [
                    ...classBonuses.filter(
                        (b) =>
                            b.characteristic.id !== newBonus.characteristic.id,
                    ),
                    newBonus,
                ];
            }

            modalSelectCallback.set(null);
        }); //end of modal call back.

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

    async function addAptitude() {
        modalSelectCallback.set(async (selected) => {

            const newClassAptitude = {
                id: null,
                class_id: clss.id,
                aptitude: selected,
            };

            const response = await fetchPost(
                endpoint + "/apptitudes", //refactor
                selected,
            );
            newClassAptitude.id = response.created.id;

            if (response.status === 201) {
                classAptitudes = [...classAptitudes, newClassAptitude];
            }
            modalSelectCallback.set(null);
        });

        openModal(ApptitudesList);
    }

    async function removeAptitude(apptitude) {
        console.log(apptitude);
        const response = await fetchDelete(
            endpoint + "/apptitudes",
            apptitude.id,
        );

        if (response.status === 200) {
            classAptitudes = [
                ...classAptitudes.filter((a) => a.id !== apptitude.id),
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

    async function removeWeaponProficiency(wp) {
        const response = await fetchDelete(endpoint + "/weapon-class", wp.id);

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
            weaponsTrainings = [
                ...weaponsTrainings.filter((ct) => ct.id !== wt.id),
            ];
        }
    }

    async function addItems() {
        modalSelectCallback.set(async (selected) => {
            const newClassItem = {
                id: null,
                class_id: clss.id,
                item: selected,
            };

            const response = await fetchPost(endpoint + "/items", selected);
            newClassItem.id = response.created.id;

            if (response.status === 201) {
                classItems = [...classItems, newClassItem];
            }
            modalSelectCallback.set(null);
        });

        openModal(ItemsList);
    }

    async function removeItems(wt) {
        const response = await fetchDelete(endpoint + "/items", wt.id);

        if (response.status === 200) {
            classItems = [...classItems.filter((ct) => ct.id !== wt.id)];
        }
    }

    async function addTrait() {
        modalSelectCallback.set(async (selected) => {
            const newClassTrait = {
                id: null,
                class_id: clss.id,
                trait: selected,
            };

            const response = await fetchPost(endpoint + "/traits", selected);
            newClassTrait.id = response.created.id;

            if (response.status === 201) {
                classTraits = [...classTraits, newClassTrait];
            }
            modalSelectCallback.set(null);
        });

        openModal(TraitsList);
    }

    async function removeTrait(trait) {
        const response = await fetchDelete(endpoint + "/traits", trait.id);

        if (response.status === 200) {
            classTraits = [...classTraits.filter((t) => t.id !== trait.id)];
        }
    }
</script>

{#if clss}
    <div class="class-name">
        <h1>{clss.name}</h1>
    </div>

    <ClassOverviewList
        label="Characteristic Bonus:"
        addLabel="+ Characteristic Bonus"
        items={classBonuses}
        onAdd={createBonus}
        onRemove={removeBonus}
    >
        <span slot="item" let:item>
            {item.characteristic.name} + ({item.bonus})
        </span>
    </ClassOverviewList>

    <ClassOverviewList
        label="Starting Aptitudes:"
        addLabel="+ Add aptitude"
        items={classAptitudes}
        onAdd={addAptitude}
        onRemove={removeAptitude}
    >
        <span slot="item" let:item>
            {item.aptitude.name}
        </span>
    </ClassOverviewList>

    <ClassOverviewList
        label="Weapon Proficiency:"
        addLabel="+ Add Proficiency"
        items={weaponsClasses}
        onAdd={addWeaponProficiency}
        onRemove={removeWeaponProficiency}
    >
        <span slot="item" let:item>
            <DescriptionUtil item={item.weapon_class} />
        </span>
    </ClassOverviewList>

    <ClassOverviewList
        label="Weapon Training:"
        addLabel="+ Add Weapon Training"
        items={weaponsTrainings}
        onAdd={addWeaponTraining}
        onRemove={removeWeaponTraining}
    >
        <span slot="item" let:item>
            <DescriptionUtil item={item.talent} />
        </span>
    </ClassOverviewList>

    <ClassOverviewList
        label="Specialist Equipment:"
        addLabel="+ Add Specialist Equipment"
        items={classItems}
        onAdd={addItems}
        onRemove={removeItems}
    >
        <span slot="item" let:item>
            <DescriptionUtil item={item.item} />
        </span>
    </ClassOverviewList>

    {#if startingTraits.length !== 0}
        <ClassOverviewList
            label="Starting Traits:"
            addLabel="+ Add Starting Traits"
            items={classTraits}
            onAdd={addTrait}
            onRemove={removeTrait}
        >
            <span slot="item" let:item>
                <DescriptionUtil item={item.trait} />
            </span>
        </ClassOverviewList>
    {/if}

    {#if clss.parent_id === null}
        <LevelTable
            bind:classTalents
            bind:subClassTalents
            bind:powersKnown
            {clss}
            {endpoint}
            {classPowers}
        />
    {/if}
{:else}
    <p>Loading class…</p>
{/if}
