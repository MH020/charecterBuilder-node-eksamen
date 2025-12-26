<script>

    import ClassesInfoList from "../UI/ClassesInfoList.svelte";
    import LevelTable from "../UI/levelTable.svelte";

    export let clss;
    console.log(clss)
    const classPowers = clss.powers || [];
    const powersKnown = clss.powers_known || [];
    const classTraits = clss.traits;
    const classApptitudes = clss.aptitudes;
    const classTalents = clss.talents;
    const weaponsTrainings = clss.weapon_trainings;
    const weaponsClasses = clss.weapon_classes;
    const classBonuses = clss.bonuses || [];
    const classItems = clss.items || [];
    let subClassTalents = clss.SubclassTalents || []

    let startingTraits = classTraits.filter((trait) => {
        trait.level = 1;
    });
</script>

<div class="class-name">
    <h1>{clss.name}</h1>
</div>

<ClassesInfoList listItems={classBonuses} name="Characteristic Bonus" />
<ClassesInfoList listItems={classApptitudes} name="Starting Aptitudes" />
<ClassesInfoList listItems={weaponsClasses} name="Weapon Proficiency" />
<ClassesInfoList listItems={weaponsTrainings} name="Weapon Training" />
<ClassesInfoList listItems={classItems} name="Specialist Equipment" />

{#if startingTraits.length !== 0}
    <ClassesInfoList listItems={startingTraits} name="Starting Traits:" />
{/if}
<ClassesInfoList listItems={weaponsTrainings} name="Weapon Training" />

<LevelTable
    classTalents={classTalents}
    subClassTalents={subClassTalents}
    {classPowers}
/>
