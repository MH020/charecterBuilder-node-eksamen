<script>
    import { onMount } from "svelte";
    import { fetchGet } from "../../../util/fetchUtil";
    import ClassesInfoList from "../UI/ClassesInfoList.svelte";
    import LevelTable from "../UI/levelTable.svelte";

    export let clss;

    let classApptitudes = [];
    let classBonuses = [];
    let classItems = [];
    let classTraits = [];
    let classTalents = []; 
    let subClassTalents = []; 
    let classPowers = []; 
    let classes

    onMount(async () => {
        const response = await fetchGet(`/api/classes/${clss.id}/full`);
        console.log(response)
        if (response.status === 200) {
            classes = response.data;
        }
    });
</script>

<div class="class-name">
    <h1>{clss.name}</h1>
</div>

<ClassesInfoList listItems={classApptitudes} name="Starting Aptitudes" />
<ClassesInfoList listItems={classBonuses} name="Characteristic Bonus" />
<ClassesInfoList listItems={classItems} name="Specialist Equipment" />

{#if classTraits.length > 0}
    <ClassesInfoList listItems={classTraits} name="Starting Traits" />
{/if}

<LevelTable 
classTalents = {classTalents},
subClassTalents = {subClassTalents},
classPowers = {}
/>