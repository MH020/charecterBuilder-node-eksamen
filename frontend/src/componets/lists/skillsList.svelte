<script>
    import { onMount } from 'svelte';
    import SkillsRow from '../rows/skillsRow.svelte';
    import { fetchDelete } from '../../../util/fetchUtil';
    import toastrDisplayHTTPCode from '../../../util/ToastrUtil';


    export let data = [];

    let SkillsList;
    let sortType = "all"; 
    let sortedSkills = [];

    $: if(!SkillsList){
        SkillsList = data
        console.log("skilllist addad again ? ")
    }

    function editSkill(skill){
        console.log("edit")
    }

    async function deleteSkill(skill){
        console.log("deleteSkill")
        const response = await fetchDelete("/api/skills", skill.id)
        toastrDisplayHTTPCode(response.status, response.message)
        if (response.status === 200){
            SkillsList = SkillsList.filter(skills => skills.id !== skill.id)
        }
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

<div class="button-panel">
    <button on:click={toggleSort}>
        Sort {sortType === "all" ? "A -> Z" : "Z -> A"}
    </button>
</div>

<div>
    {#each sortedSkills as skill (skill.id )}
        <SkillsRow 
            skillId={skill.id}
            name={skill.name} 
            description={skill.description} 
            main_aptitude={skill.main_aptitude.name} 
            secondary_aptitude={skill.secondary_aptitude.name} 
            editSkill={() => editSkill(skill)} 
            deleteSkill={() => deleteSkill(skill)} 
        />
    {/each}
</div>




