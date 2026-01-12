<script>
    import { baseSheet, selectedRace } from "../../store/createStore";
    import StatlineCard from "../cards/StatlineCard.svelte";

    export let item;

    function selectRace() {
        selectedRace.set(item);
                baseSheet.update(sheet => {
            return { ...sheet, race_id: item.id }; 
        });
    }

</script>

<div class="race-card { $selectedRace?.id === item.id ? 'selected' : '' }">
    <div class="card-header">
        <h3>{item.name}</h3>
        <button on:click={selectRace}>
            { $selectedRace?.id === item.id ? "Selected" : "Select" }
        </button>
    </div>

    <div class="card-grid">
        <div class="card-cell">
            <div class="label">Size</div>
            <div class="value">{item.size?.name}</div>
        </div>

        <div class="card-cell">
            <div class="label">Description</div>
            <div class="value">{item.description}</div>
        </div>

        <div class="card-cell">
            <div class="label">Wounds</div>
            <div class="value">{item.wounds}</div>
        </div>


        <div class="card-cell statline-container full-width">
            <div class="label">Base Statline</div>
            <StatlineCard statline={item.base_statline} />
        </div>

        <div class="card-cell statline-container full-width">
            <div class="label">Max Statline</div>
            <StatlineCard statline={item.max_statline} />
        </div>
    </div>
</div>

<style>
.race-card {
    display: flex;
    flex-direction: column;
    background-color: #1a1a1a;
    border: 1px solid #333;
    border-left: 4px solid #ffb86c;
    border-radius: 6px;
    padding: 16px 20px; 
    margin-bottom: 16px;
    color: #e0e0e0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.7);
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}

.race-card.selected {
    border-left-color: #50fa7b;
    box-shadow: 0 0 12px rgba(80,250,123,0.6);
    transform: scale(1.01);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.card-header h3 {
    margin: 0;
    font-size: 1.5rem;
    font-family: "Courier New", monospace;
    color: #ffb86c;
    text-shadow: 0 1px 1px rgba(0,0,0,0.5);
}

.card-header button {
    background-color: #282828;
    color: #50fa7b;
    font-weight: bold;
    border: 1px solid #50fa7b;
    padding: 8px 16px;
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
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); 
    gap: 16px; 
}

.card-cell {
    display: flex;
    flex-direction: column;
    background-color: #222;
    border: 1px solid #444;
    border-radius: 4px;
    padding: 12px;
}

.label {
    font-weight: bold;
    color: #ffb86c;
    font-size: 0.95rem;
    margin-bottom: 6px;
    text-shadow: 0 1px 0 rgba(0,0,0,0.5);
}

.value {
    font-size: 1rem;
    color: #c0c0c0;
}

.statline-container {
    display: flex;
    flex-direction: column;
}


.card-cell.full-width {
    grid-column: 1 / -1; 
}
</style>

