<script>
    import { onMount } from "svelte";
    import { fetchGet } from "../../../../util/fetchUtil";
    import { deleteEntity } from "../../../../util/ListUtil";
    import StatlineRow from "../../rows/StatlineRow.svelte";
    import RaceRow from "../../rows/RaceRow.svelte";


    let sizes = [];
    let sortType = "all";
    let sortedSizes = [];
    const endpoint = "/api/size"

    onMount(async () => {
        const response = await fetchGet(endpoint);
        console.log(response);
        if (response.status === 200) {
            sizes = response.data;
        }
    });

    function createSize() {
        const newSize = {
            id: null,
            name: "",
            score: 0,
            isNew: true
        };
        sizes = [...sizes, newSize];
    }

    async function deleteRace(id, isNew = false) {
        if (isNew) {
            sizes = sizes.filter(
                (race) => race.id !== id,
            );
            return;
        }
        sizes = await deleteEntity(id, endpoint, sizes);
    }

    $: if (sizes) {
        sortedSizes = [...sizes].sort((a, b) => {
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
        sizes = sizes.map((statline) => {
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
    <button on:click={createSize}> new race ? </button>
</div>

<div>
    {#each sortedSizes as race (race.id)}
        <RaceRow
            race={race}
            onSave={updateStatlines}
            onDelete={deleteRace}
            endpoint={endpoint}
        />
    {/each}
</div>
