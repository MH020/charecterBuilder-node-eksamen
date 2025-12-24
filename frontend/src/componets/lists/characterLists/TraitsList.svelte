<script>
    import { onMount } from "svelte";
    import { fetchGet } from "../../../../util/fetchUtil";
    import TalentRow from "../../rows/TalentRow.svelte";
    import ListUtil from "../../wrappers/EditableList.svelte";
    import TraitsRow from "../../rows/TraitsRow.svelte";

    let traits = [];
    const endpoint = "/api/traits";

    onMount(async () => {
        const response = await fetchGet(endpoint);
        console.log(response);
        if (response.status === 200) {
            traits = response.data;
        }
    });

    function createTrait() {
        const newTrait = {
            id: null,
            name: "",
            description: "",
            max_level: 0,
            race: {},
            category: ""
        };
        traits = [...traits, newTrait];
    }
</script>

<ListUtil
    bind:list={traits}
    endpoint= {endpoint}
    createRow={createTrait}
    let:item
    let:onSave
    let:onDelete
>
    <TraitsRow
        trait={item}
        onSave={onSave}
        onDelete={onDelete}
        endpoint={endpoint}
    />
</ListUtil>
