<script>
    import { onMount } from "svelte";
    import { fetchGet } from "../../../../util/fetchUtil";
    import { deleteEntity } from "../../../../util/ListUtil";
    import StatlineRow from "../../rows/StatlineRow.svelte";
    import RaceRow from "../../rows/RaceRow.svelte";
    import SizeRow from "../../rows/SizeRow.svelte";
    import ListUtil from "../../wrappers/EditableList.svelte";
    import SkillsRow from "../../rows/skillsRow.svelte";


    let sizes = [];
    let sortType = "all";
    let sortedSizes = [];
    const endpoint = "/api/sizes"

    onMount(async () => {
        const response = await fetchGet(endpoint);
        console.log(response);
        if (response.status === 200) {
            sizes = response.data;
        }
    });

    function createSize() {
        const newSize = {
            id: null,
            name: "",
            score: 0,
            isNew: true
        };
        sizes = [...sizes, newSize];
    }
</script>

<ListUtil
    bind:list={sizes}
    endpoint= {endpoint}
    createRow={createSize}
    let:item
    let:onSave
    let:onDelete
>
    <SizeRow
        size={item}
        onSave={onSave}
        onDelete={onDelete}
        endpoint={endpoint}
    />
</ListUtil>


