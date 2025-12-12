<script>
    import { onMount } from 'svelte';
    import { fetchDelete, fetchGet } from '../../../../util/fetchUtil';
    import toastrDisplayHTTPCode from '../../../../util/ToastrUtil';
    import CategoryRow from '../../rows/CategoryRow.svelte';

    let availabilityies = [];
    let sortType = "all"; 
    let sortedAvailabilityies= [];

 
    onMount(async () => {
        const response = await fetchGet("/api/availability")
        if (response.status === 200) {
                availabilityies = response.data
        } 
    });



    function createAvailability(){
        const newAvailability = {
            id: null,  
            name: "null",        
            isNew: true

        };
        availabilityies = [...availabilityies, availabilityies];
    }

    async function deleteAvailability(availability){
        const response = await fetchDelete("/api/category", availability.id)
        toastrDisplayHTTPCode(response.status, response.message)
        if (response.status === 200){
            availabilityies = availabilityies.filter(availability => availability.id !== availability.id)
        }
    }

    //sorting needed 

    function toggleSort() {

    }
</script>

<div class="button-panel">
    <button on:click={toggleSort}>
        sort by... {sortType === "all" ? "A -> Z" : "Z -> A"}
    </button>
    <button on:click={createAvailability}>
        new availability 
    </button>
</div>

<div>
    {#each availabilityies as availability (availability.id)}
        <CategoryRow category={availability} 
        deleteCategory={() => deleteAvailability(availability)}
        isEditing={availability.isNew}/>
    {/each}
</div>




