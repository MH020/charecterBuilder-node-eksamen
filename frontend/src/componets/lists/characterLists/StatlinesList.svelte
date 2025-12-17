<script>
    import { onMount } from "svelte";
    import { fetchGet } from "../../../../util/fetchUtil";
    import { deleteEntity } from "../../../../util/ListUtil";
    import StatlineRow from "../../rows/StatlineRow.svelte";


    let Statlines = [];
    let sortType = "all";
    let sortedStatlines = [];

    onMount(async () => {
        const response = await fetchGet("/api/races/statlines");
        console.log(response);
        if (response.status === 200) {
            Statlines = response.data;
        }
    });

    function createStatline() {
        const newStatline = {
            id: null,
            name: "",
            weapon_skill: 0,
            ballistic_skill: 0, 
            strength: 0,
            toughness: 0,
            agility: 0,
            intelligence: 0,
            perception: 0,
            willpower: 0,
            fellowship: 0,
            isNew: true,
        };
        Statlines = [...Statlines, newStatline];
    }

    async function deleteStatline(id, isNew = false) {
        if (isNew) {
            Statlines = Statlines.filter(
                (apptitude) => apptitude.id !== id,
            );
            return;
        }
        Statlines = await deleteEntity(
            id,
            "/api/races/statlines",
            Statlines,
        );
    }

    $: if (Statlines) {
        sortedStatlines = [...Statlines].sort((a, b) => {
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
        Statlines = Statlines.map((statline) => {
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
    <button on:click={createStatline}> new statline </button>
</div>

<div>
    {#each sortedStatlines as statline (statline.id)}
        <StatlineRow
            statline={statline}
            onSave={updateStatlines}
            onDelete={deleteStatline}
        />
    {/each}
</div>
