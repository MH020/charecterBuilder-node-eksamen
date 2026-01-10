<script>
    import toastr from "toastr";
    import toastrDisplayHTTPCode from "../../../util/ToastrUtil";
    import { selectedLineage, selectedRace } from "../../store/createStore";
    import { openModal } from "../../store/modalStore";
    import ClassPage from "../../pages/classPage.svelte";
    import { navigate } from "svelte-routing";

    export let item;

    function selectLineage() {
        if (item.required_race) {
            if ($selectedRace?.id !== item.required_race.id) {
            toastr.error("you cannot select this lineage since you do not have the correct race", 
            `you need to be a ${item.required_race?.name} to select this lineage`)
            return
            }
        }
        selectedLineage.set(item);
    }

  function GoToClassPage(id) {
    navigate(`/classes/${id}`); 
  }
    

</script>

<div class="lineage-card { $selectedLineage?.id === item.id ? 'selected' : '' }">
    <div class="card-header">
        <h3>{item.name }</h3>
        <button on:click={selectLineage}>
            { $selectedLineage?.id === item.id ? "Selected" : "Select" }
        </button>
    </div>

    <div class="card-redirect">
        <button on:click={selectLineage}>
            { $selectedLineage?.id === item.id ? "Selected" : "Select" }
        </button>
    </div>

    <div class="card-grid">
        <div class="card-cell">
            <div class="label">Description</div>
            <div class="value">{item.description || "----"}</div>
        </div>
    </div>
</div>

<style>

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.card-header h3 {
    margin: 0;
    font-size: 1.3rem;
    font-family: "Courier New", monospace;
    color: #ffb86c;
    text-shadow: 0 1px 1px rgba(0,0,0,0.5);
}

.card-header button {
    background-color: #282828;
    color: #50fa7b;
    font-weight: bold;
    border: 1px solid #50fa7b;
    padding: 6px 14px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
}

.card-header button:hover {
    background-color: #50fa7b;
    color: #121212;
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
}

.card-cell {
    display: flex;
    flex-direction: column;
    background-color: #222;
    border: 1px solid #444;
    border-radius: 4px;
    padding: 8px;
}

.label {
    font-weight: bold;
    color: #ffb86c;
    font-size: 0.9rem;
    margin-bottom: 4px;
    text-shadow: 0 1px 0 rgba(0,0,0,0.5);
}

.value {
    font-size: 0.95rem;
    color: #c0c0c0;
}


</style>
