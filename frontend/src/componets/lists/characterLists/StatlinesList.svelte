<script>
    import { onMount } from "svelte";
    import { fetchGet } from "../../../../util/fetchUtil";
    import StatlineRow from "../../rows/StatlineRow.svelte";
    import ListUtil from "../../wrappers/EditableList.svelte";


    let statLines = [];
 
    const endpoint = "/api/statlines" //refactor

    onMount(async () => {
        const response = await fetchGet(endpoint);
        console.log(response);
        if (response.status === 200) {
            statLines = response.data;
        }
    });

    function createStatLine() {
        const newStatLine = {
            id: null,
            name: "",
            weapon_skill: 0,
            ballistic_skill: 0, 
            strength: 0,
            toughness: 0,
            agility: 0,
            intelligence: 0,
            perception: 0,
            willpower: 0,
            fellowship: 0,
            isNew: true,
        };
        statLines = [...statLines, newStatLine];
    }
</script>

<ListUtil
    bind:list={statLines}
    endpoint= {endpoint}
    createRow={createStatLine}
    let:item
    let:onSave
    let:onDelete
>
    <StatlineRow
        statLine={item}
        onSave={onSave}
        onDelete={onDelete}
        endpoint={endpoint}
    />
</ListUtil>

