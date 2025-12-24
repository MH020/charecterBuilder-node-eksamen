<script>
    import { onMount } from "svelte";
    import SkillsRow from "../rows/skillsRow.svelte";
    import { fetchDelete, fetchGet } from "../../../util/fetchUtil";
    import toastrDisplayHTTPCode from "../../../util/ToastrUtil";
    import { deleteEntity } from "../../../util/ListUtil";
    import ListUtil from "../wrappers/EditableList.svelte";

    let skills = [];
    const endpoint = "/api/skills"

    onMount(async () => {
        const response = await fetchGet(endpoint);
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

</script>

<ListUtil
    bind:list={skills}
    endpoint= {endpoint}
    createRow={createSkill}
    let:item
    let:onSave
    let:onDelete
>
    <SkillsRow
        skill={item}
        onSave={onSave}
        onDelete={onDelete}
        endpoint={endpoint}
    />
</ListUtil>


