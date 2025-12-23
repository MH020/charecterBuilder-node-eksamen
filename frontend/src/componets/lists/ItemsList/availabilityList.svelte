<script>
    import { onMount } from 'svelte';
    import { fetchDelete, fetchGet } from '../../../../util/fetchUtil';
    import toastrDisplayHTTPCode from '../../../../util/ToastrUtil';
    import AvailabilityRow from '../../rows/availabilityRow.svelte';
    import ListUtil from '../../util/ListUtil.svelte';

    let availabilityies = [];
    let sortType = "asc";
    let endpoint = "/api/availability"

    onMount(async () => {
        const response = await fetchGet(endpoint);
        if (response.status === 200) {
            availabilityies = response.data;
        }
    });


    $: sortedAvailabilityies = [...availabilityies].sort((a, b) => {
        if (!a.name || !b.name) return 0;
        return sortType === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
    });

    function createAvailability() {
        const newAvailability = {
            id: null,  
            name: "",        
            isNew: true

        };
        availabilityies = [...availabilityies, newAvailability];
    }

</script>

<ListUtil
    bind:list={availabilityies}
    endpoint= {endpoint}
    createRow={createAvailability}
    let:item
    let:onSave
    let:onDelete
>
    <AvailabilityRow
        availability={item}
        onSave={onSave}
        onDelete={onDelete}
        endpoint={endpoint}
    />
</ListUtil>