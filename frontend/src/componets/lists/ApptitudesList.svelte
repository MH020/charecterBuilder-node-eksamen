<script>
    import { onMount } from "svelte";
    import ApptitudesRow from "../rows/apptitudesRow.svelte";
    import { fetchDelete, fetchGet } from "../../../util/fetchUtil";
    import toastrDisplayHTTPCode from "../../../util/ToastrUtil";
    import { deleteEntity } from "../../../util/ListUtil";
    import ListUtil from "../util/ListUtil.svelte";

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
    endpoint={endpoint}
    createRow={createApptitude}
    RowComponent={ApptitudesRow}
/>

