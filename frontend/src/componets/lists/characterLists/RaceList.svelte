<script>
    import { onMount } from "svelte";
    import { fetchGet } from "../../../../util/fetchUtil";
    import { deleteEntity } from "../../../../util/ListUtil";
    import StatlineRow from "../../rows/StatlineRow.svelte";
    import RaceRow from "../../rows/RaceRow.svelte";
    import ListUtil from "../../util/ListUtil.svelte";


    let races = [];
    let sizes = []; 
    const endpoint = "/api/races"

    onMount(async () => {
        const response = await fetchGet(endpoint);
        const sizeResponse = await fetchGet("/api/sizes")
        if (response.status === 200 || sizeResponse.status === 200) {
            races = response.data;
            sizes = sizeResponse.data; 
        }
    });

    function createRace() {
        const newRace = {
            id: null,
            name: "",
            description: "",
            wounds: 0, 
            base_statline: {},
            max_statline: {},
            size: {},
            isNew: true
        };
        races = [...races, newRace];
    }
</script>

<ListUtil
    bind:list={races}
    endpoint= {endpoint}
    createRow={createRace}
    let:item
    let:onSave
    let:onDelete
>
    <RaceRow
        race={item}
        sizes={sizes}
        onSave={onSave}
        onDelete={onDelete}
        endpoint={endpoint}
    />
</ListUtil>