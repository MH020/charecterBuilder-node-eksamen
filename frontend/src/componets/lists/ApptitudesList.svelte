<script>
    import { onMount } from "svelte";
    import ApptitudesRow from "../rows/apptitudesRow.svelte";
    import { fetchGet } from "../../../util/fetchUtil";
    import ListUtil from "../wrappers/EditableList.svelte";

    let apptitudesList = [];
    const endpoint = "/api/aptitudes"

    onMount(async () => {
        const response = await fetchGet(endpoint);
        console.log(response);
        if (response.status === 200) {
            apptitudesList = response.data;
        }
    });

    function createApptitude() {
        const newApptitude = {
            id: null,
            name: "",
            isNew: true,
        };
        apptitudesList = [...apptitudesList, newApptitude];
    }


</script>

<ListUtil
    bind:list={apptitudesList}
    endpoint= {endpoint}
    createRow={createApptitude}
    let:item
    let:onSave
    let:onDelete
>
    <ApptitudesRow
        apptitude={item}
        onSave={onSave}
        onDelete={onDelete}
        endpoint={endpoint}
    />
</ListUtil>

