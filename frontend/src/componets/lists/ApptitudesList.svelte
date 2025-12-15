<script>
    import { onMount } from "svelte";
    import ApptitudesRow from "../rows/apptitudesRow.svelte";
    import { fetchDelete, fetchGet } from "../../../util/fetchUtil";
    import toastrDisplayHTTPCode from "../../../util/ToastrUtil";
    import { deleteEntity } from "../../../util/ListUtil";

    let apptitudesList = [];
    let sortType = "all";
    let sortedApptitudes = [];

    onMount(async () => {
        const response = await fetchGet("/api/aptitudes");
        console.log(response);
        if (response.status === 200) {
            apptitudesList = response.data;
        }
    });

    function createApptitude() {
        const newApptitude = {
            id: null,
            name: "",
            isNew: true,
        };
        apptitudesList = [...apptitudesList, newApptitude];
    }

    async function deleteApptitude(id, isNew = false) {
        if (isNew) {
            apptitudesList = apptitudesList.filter(
                (apptitude) => apptitude.id !== id,
            );
            return;
        }
        apptitudesList = await deleteEntity(
            id,
            "/api/weapon/traits",
            apptitudesList,
        );
    }

    $: if (apptitudesList) {
        sortedApptitudes = [...apptitudesList].sort((a, b) => {
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

    function updateWeaponTrait(updated) {
        apptitudesList = apptitudesList.map((apptitude) => {
            if (apptitude.isNew) {
                return { ...updated, isNew: false };
            }

            if (apptitude.id === updated.id) {
                return { ...apptitude, ...updated };
            }

            return apptitude;
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
    <button on:click={createApptitude}> new Apptitude </button>
</div>

<div>
    {#each sortedApptitudes as apptitude (apptitude.name)}
        <ApptitudesRow
            {apptitude}
            onSave={updateWeaponTrait}
            onDelete={deleteApptitude}
        />
    {/each}
</div>
