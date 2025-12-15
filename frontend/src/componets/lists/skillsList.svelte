<script>
    import { onMount } from "svelte";
    import SkillsRow from "../rows/skillsRow.svelte";
    import { fetchDelete, fetchGet } from "../../../util/fetchUtil";
    import toastrDisplayHTTPCode from "../../../util/ToastrUtil";
    import { deleteEntity } from "../../../util/ListUtil";

    let skills = [];
    let sortType = "all";
    let sortedSkills = [];

    onMount(async () => {
        const response = await fetchGet("/api/skills");
        console.log(response);
        if (response.status === 200) {
            skills = response.data;
        }
    });

    function createSkill() {
        const newSkill = {
            id: null,
            name: "",
            description: "",
            main_aptitude: { id: null, name: "" },
            secondary_aptitude: { id: null, name: "" },
            isNew: true,
        };
        skills = [...skills, newSkill];
        console.log(skills);
    }

    async function deleteSkill(id, isNew = false) {
        if (isNew) {
            skills = skills.filter((skill) => skill.id !== id);
            return;
        }
        skills = await deleteEntity(id, "/api/weapon/traits", skills);
    }

    $: if (skills) {
        sortedSkills = [...skills].sort((a, b) => {
            if (sortType === "all") {
                if (a.name < b.name) {
                    return 1;
                }
                if (a.name > b.name) {
                    return -1;
                }
                return 0;
            } else {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            }
        });
    }

    function updateSkills(updated) {
        skills = skills.map((skill) => {
            if (skill.isNew) {
                return { ...updated, isNew: false };
            }

            if (skill.id === updated.id) {
                return { ...skill, ...updated };
            }

            return skill;
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
    <button on:click={createSkill}> new skill </button>
</div>

<div>
    {#each sortedSkills as skill (skill.id)}
        <SkillsRow
            {skill}
            onSave={updateSkills}
            onDelete={deleteSkill}
        />
    {/each}
</div>
