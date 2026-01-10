<script>
    import { onMount } from 'svelte';
    import { fetchDelete, fetchGet } from '../../../../util/fetchUtil';
    import toastrDisplayHTTPCode from '../../../../util/ToastrUtil';
    import AvailabilityRow from '../../rows/availabilityRow.svelte';
    import ListUtil from '../../wrappers/EditableList.svelte';

    let availabilities = [];
    let sortType = "asc";
    let endpoint = "/api/availability" //refactor

    onMount(async () => {
        const response = await fetchGet(endpoint);
        if (response.status === 200) {
            availabilities = response.data;
        }
    });


    $: sortedAvailabilities = [...availabilities].sort((a, b) => {
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
        availabilities = [...availabilities, newAvailability];
    }

</script>

<ListUtil
    bind:list={availabilities}
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