<script>
    import { onMount } from "svelte";
    import { fetchGet } from "../../../../util/fetchUtil";
    import { deleteEntity } from "../../../../util/ListUtil";
    import StatlineRow from "../../rows/StatlineRow.svelte";
    import RaceRow from "../../rows/RaceRow.svelte";


    let races = [];
    let sizes = []; 
    let sortType = "all";
    let sortedRaces = [];
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

    async function deleteRace(id, isNew = false) {
        if (isNew) {
            races = races.filter(
                (race) => race.id !== id,
            );
            return;
        }
        races = await deleteEntity(id, endpoint, races);
    }

    $: if (races) {
        sortedRaces = [...races].sort((a, b) => {
            if (sortType === "all") {
                if (a.name < b.name) {
                    return 1;
                }
                if (a.name > b.name) {
                    return -1;
                }
                return 0;
            } else {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            }
        });
    }

    function updateStatlines(updated) {
        races = races.map((statline) => {
            if (statline.isNew) {
                return { ...updated, isNew: false };
            }

            if (statline.id === updated.id) {
                return { ...statline, ...updated };
            }

            return statline;
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
    <button on:click={createRace}> new race ? </button>
</div>

<div>
    {#each sortedRaces as race (race.id)}
        <RaceRow
            race={race}
            onSave={updateStatlines}
            onDelete={deleteRace}
            endpoint={endpoint}
            sizes = {sizes}
        />
    {/each}
</div>
