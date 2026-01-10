<script>
    import { onMount } from "svelte";
    import ApptitudesRow from "../rows/apptitudesRow.svelte";
    import { fetchDelete, fetchGet } from "../../../util/fetchUtil";
    import toastrDisplayHTTPCode from "../../../util/ToastrUtil";
    import { deleteEntity } from "../../../util/ListUtil";
    import ListUtil from "../wrappers/EditableList.svelte";

    let aptitudesList = [];
    const endpoint = "/api/aptitudes"

    onMount(async () => {
        const response = await fetchGet(endpoint);
        console.log(response);
        if (response.status === 200) {
            aptitudesList = response.data;
        }
    });

    function createAptitude() {
        const newAptitude = {
            id: null,
            name: "",
            isNew: true,
        };
        aptitudesList = [...aptitudesList, newAptitude];
    }


</script>

<ListUtil
    bind:list={aptitudesList}
    endpoint= {endpoint}
    createRow={createAptitude}
    let:item
    let:onSave
    let:onDelete
>
    <ApptitudesRow
        aptitude={item}
        onSave={onSave}
        onDelete={onDelete}
        endpoint={endpoint}
    />
</ListUtil>

