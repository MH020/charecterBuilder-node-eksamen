<script>
    import { onMount } from 'svelte';
    import SkillsRow from '../rows/skillsRow.svelte';

    export let data = [];

    let SkillsList = [];
    let sortType = "all"; 
    let sortedSkills = [];

    onMount(() => {
        SkillsList = data;
        console.log(SkillsList)
    });

    function editSkill(skill){
        console.log("edit")
    }

    function deleteSkill(skill){
        console.log("deleteSkill")
    }

    $: if (SkillsList) {
        sortedSkills = [...SkillsList].sort((a, b) => {
            if (sortType === "all") {
                if (a.name < b.name){
                    return 1;
                } if(a.name > b.name) {
                    return -1 
                }
                return 0 

            } else {
                if (a.name < b.name){
                    return -1;
                } if(a.name > b.name) {
                    return 1
                }
                return 0; 
            }
        });
    }

    function toggleSort() {
        sortType = sortType === "all" ? "asc" : "all";
    }
</script>

<div>
    <button on:click={toggleSort}>
        Sort {sortType === "all" ? "A -> Z" : "Z -> A"}
    </button>
</div>

<div>
    {#each sortedSkills as skill (skill.name)}
        <SkillsRow 
            name={skill.name} 
            description={skill.description} 
            main_aptitude={skill.main_aptitude.name} 
            secondary_aptitude={skill.secondary_aptitude.name} 
            editSkill={editSkill} 
            deleteSkill={deleteSkill} 
        />
    {/each}
</div>


