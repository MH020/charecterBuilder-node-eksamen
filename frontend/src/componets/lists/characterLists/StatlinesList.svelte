<script>
    import { onMount } from "svelte";
    import { fetchGet } from "../../../../util/fetchUtil";
    import StatlineRow from "../../rows/StatlineRow.svelte";
    import ListUtil from "../../wrappers/EditableList.svelte";


    let Statlines = [];
 
    const endpoint = "/api/statlines"

    onMount(async () => {
        const response = await fetchGet(endpoint);
        console.log(response);
        if (response.status === 200) {
            Statlines = response.data;
        }
    });

    function createStatline() {
        const newStatline = {
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
        Statlines = [...Statlines, newStatline];
    }
</script>

<ListUtil
    bind:list={Statlines}
    endpoint= {endpoint}
    createRow={createStatline}
    let:item
    let:onSave
    let:onDelete
>
    <StatlineRow
        statline={item}
        onSave={onSave}
        onDelete={onDelete}
        endpoint={endpoint}
    />
</ListUtil>

