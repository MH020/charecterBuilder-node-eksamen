<script>
    import { onMount } from "svelte";
    import { fetchGet } from "../../../../util/fetchUtil";
    import TalentRow from "../../rows/TalentRow.svelte";
    import ListUtil from "../../wrappers/EditableList.svelte";

    let talents = [];
    const endpoint = "/api/talents";

    onMount(async () => {
        const response = await fetchGet(endpoint);
        if (response.status === 200) {
            talents = response.data;
        }
    });

    function createTalent() {
        const newTalent = {
            id: null,
            name: "",
            description: "",
            type: "",
            asi: false,
            prerequisite_talent: {},
            required_race: {},
            required_lineage: {},
            aptitudes: [],
            isNew: true,
        };
        talents = [...talents, newTalent];
    }
</script>

<ListUtil
    bind:list={talents}
    endpoint= {endpoint}
    createRow={createTalent}
    let:item
    let:onSave
    let:onDelete
>
    <TalentRow
        talent={item}
        onSave={onSave}
        onDelete={onDelete}
        endpoint={endpoint}
    />
</ListUtil>
