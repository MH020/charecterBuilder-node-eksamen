<script>
    import { onMount } from 'svelte';
    import WeaponsRow from '../../rows/weaponsRow.svelte';
    import { fetchGet } from '../../../../util/fetchUtil';
    import { deleteEntity} from '../../../../util/ListUtil';
    import LineageRow from '../../rows/lineageRow.svelte';
    import ListUtil from '../../wrappers/EditableList.svelte';

    let lineages = [];
    let endpoint = "/api/lineage"

    onMount(async () => {
        const response = await fetchGet(endpoint)
        if (response.status === 200) {
            lineages = response.data
        } 
    });

    function createLineage() {
        const newLineage = {
            id: null,     
            name: "",
            description: "",
            defining_features: "",
            required_race_id: null,
            required_race: {},
            bonuses: [],
            aptitudes: [],
            isNew: true
        };

        lineages = [...lineages, newLineage];
    }
</script>

<ListUtil
    bind:list={lineages}
    endpoint= {endpoint}
    createRow={createLineage}
    let:item
    let:onSave
    let:onDelete
>
    <LineageRow
        lineage={item}
        onSave={onSave}
        onDelete={onDelete}
        endpoint={endpoint}
    />
</ListUtil>




