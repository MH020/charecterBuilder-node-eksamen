<script>
    import { onMount } from 'svelte';
    import WeaponsRow from '../../rows/weaponsRow.svelte';
    import { fetchGet } from '../../../../util/fetchUtil';
    import { deleteEntity} from '../../../../util/ListUtil';

    let lineages = [];
    let sortType = "all"; 

    onMount(async () => {
        const response = await fetchGet("/api/lineage")
        if (response.status === 200) {
            lineages = response.data
        } 
    });

    function createLineage() {
        const newLineage = {
            id: null,     
            name: "",
            description: "",
            defining_features: "",
            required_race_id: null,
            required_race: {},
            bonuses: [],
            aptitudes: [],
            isNew: true
        };

        lineages = [...lineages, newLineage];
    }

    async function deleteLineage(id, isNew = false) {
        if(isNew){

            lineages = lineages.filter(lineage => lineage.id !== id);
            return;
        }
        lineages = await deleteEntity(id,"/api/lineage",lineages);
    }

        function updateLineages(updated) {
        lineages = lineages.map((lineage) => {
            if (lineage.isNew) {
                return { ...updated, isNew: false };
            }

            if (lineage.id === updated.id) {
                return { ...lineage, ...updated };
            }

            return lineage;
        });
    }

    //sorting needed 

    function toggleSort() {

    }
</script>

<div class="button-panel">
    <button on:click={toggleSort}>
        sort by... {sortType === "all" ? "A -> Z" : "Z -> A"}
    </button>
    <button on:click={createLineage}>
        new weapon 
    </button>
</div>

<div>
    {#each lineages as lineage (lineage.id)}
        <WeaponsRow {lineage} 
        onSave={updateLineages}
        onDelete={deleteLineage}
        />
    {/each}
</div>




