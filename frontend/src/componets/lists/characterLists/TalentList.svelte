<script>
    import { onMount } from "svelte";
    import { fetchGet } from "../../../../util/fetchUtil";
    import { deleteEntity } from "../../../../util/ListUtil";
    import StatlineRow from "../../rows/StatlineRow.svelte";
    import RaceRow from "../../rows/RaceRow.svelte";
    import TalentRow from "../../rows/TalentRow.svelte";


    let talents = []; 
    let sortType = "all";
    let sortedTalents = [];
    const endpoint = "/api/talents"

    onMount(async () => {
        const response = await fetchGet(endpoint);
        if (response.status === 200 ) {
            talents = response.data;
        }
    });

    function createTalent() {
        const newTalent = {
            id: null,
            name: "",
            description: "",
            type: "", 
            asi: false,
            prerequisite_talent: {},
            required_race: {},
            required_lineage: {},
            aptitudes: [],
            isNew: true
        };
        talents = [...talents, newTalent];
    }

    async function deleteTalent(id, isNew = false) {
        if (isNew) {
            talents = talents.filter(
                (talent) => talent.id !== id,
            );
            return;
        }
        talents = await deleteEntity(id, endpoint, talents);
    }

    $: if (talents) {
        sortedTalents = [...talents].sort((a, b) => {
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

    function updateTalents(updated) {
        talents = talents.map((talent) => {
            if (talent.isNew) {
                return { ...updated, isNew: false };
            }

            if (talent.id === updated.id) {
                return { ...talent, ...updated };
            }

            return talent;
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
    <button on:click={createTalent}> new talent </button>
</div>

<div>
    {#each sortedTalents as talent (talent.name)}
        <TalentRow
            talent={talent}
            onSave={updateTalents}
            onDelete={deleteTalent}
            endpoint={endpoint}
        />
    {/each}
</div>
