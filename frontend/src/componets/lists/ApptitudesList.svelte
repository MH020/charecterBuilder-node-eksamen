<script>
    import { onMount } from 'svelte';
    import ApptitudesRow from '../rows/apptitudesRow.svelte';
    import { fetchDelete,fetchGet } from '../../../util/fetchUtil';
    import toastrDisplayHTTPCode from '../../../util/ToastrUtil';



    let apptitudesList = [];
    let sortType = "all"; 
    let sortedApptitudes = [];

    onMount(async () => {
        const response = await fetchGet("/api/aptitudes")
        console.log(response)
        if (response.status === 200) {
            apptitudesList = response.data
        } 
    });

    function editApptitude(apptitude){
        console.log("edit")
    }

    function newSkill(){
        
    }

    async function deleteApptitude(apptitude){
        const response = await fetchDelete("/api/apptitudes", apptitude.id)
        toastrDisplayHTTPCode(response.status, response.message)
        if (response.status === 200){
            apptitudesList = apptitudesList.filter(apptitudes => apptitudes.id !== apptitude.id)
        }
    }

    $: if (apptitudesList) {
        sortedApptitudes = [...apptitudesList].sort((a, b) => {
            if (sortType === "all") {
                if (a.name < b.name){
                    return 1;
                } if(a.name > b.name) {
                    return -1 
                }
                return 0 

            } else {
                if (a.name < b.name){
                    return -1;
                } if(a.name > b.name) {
                    return 1
                }
                return 0; 
            }
        });
    }

    function toggleSort() {
        sortType = sortType === "all" ? "asc" : "all";
    }
</script>

<div class="button-panel">
    <button on:click={toggleSort}>
        Sort {sortType === "all" ? "A -> Z" : "Z -> A"}
    </button>
    <button on:click={toggleSort}>
        new skill
    </button>
</div>

<div>
    {#each sortedApptitudes as apptitude (apptitude.name)}
        <ApptitudesRow
            apptitude={apptitude} 
            editApptitude={() => editApptitude(apptitude)} 
            deleteApptitude={() => deleteApptitude(apptitude)} 
        />
    {/each}
</div>




