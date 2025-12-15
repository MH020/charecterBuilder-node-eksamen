<script>
    import { onMount } from 'svelte';
    import { fetchDelete, fetchGet } from '../../../../util/fetchUtil';
    import toastrDisplayHTTPCode from '../../../../util/ToastrUtil';
    import AvailabilityRow from '../../rows/availabilityRow.svelte';

    let availabilityies = [];
    let sortType = "asc";

    onMount(async () => {
        const response = await fetchGet("/api/availability");
        if (response.status === 200) {
            availabilityies = response.data;
        }
    });

    function toggleSort() {
        sortType = sortType === "asc" ? "desc" : "asc";
    }

    $: sortedAvailabilityies = [...availabilityies].sort((a, b) => {
        if (!a.name || !b.name) return 0;
        return sortType === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
    });

    function createAvailability() {
        const newAvailability = {
            id: null,  
            name: "null",        
            isNew: true

        };
        availabilityies = [...availabilityies, newAvailability];
    }

    async function deleteAvailability(id) {
        const response = await fetchDelete("/api/availability", id);
        toastrDisplayHTTPCode(response.status, response.message);

        if (response.status === 200) {
            availabilityies = availabilityies.filter(availability => availability.id !== id);
        }
    }

    function saveAvailability(updated) {
        availabilityies = availabilityies.map(availability =>
            availability.id === updated.id ? updated : availability
        );
    }

    
</script>

<div class="button-panel">
    <button on:click={toggleSort}>
        sort by... {sortType === "asc" ? "A → Z" : "Z → A"}
    </button>

    <button on:click={createAvailability}>
        new availability
    </button>
</div>

{#each sortedAvailabilityies as availability (availability.id)}
    <AvailabilityRow
        {availability}
        onSave={saveAvailability}
        onDelete={deleteAvailability}
    />
{/each}
