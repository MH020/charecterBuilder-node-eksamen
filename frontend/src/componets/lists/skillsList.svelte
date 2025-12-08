<script>
    import { onMount } from 'svelte';

    export let data = [];

    let SkillsList = [];
    let sortType = "all"; 
    let sortedSkills = [];

    onMount(() => {
        SkillsList = data;
    });

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

    <ul>
        {#each sortedSkills as skill}
            <h3>{skill.name}</h3>
            <p>description: {skill.description}</p>
            <p>main Aptitude: {skill.main_aptitude.name}</p>
            <p>secondary Aptitude: {skill.secondary_aptitude.name}</p>
        {/each}
    </ul>
</div>
