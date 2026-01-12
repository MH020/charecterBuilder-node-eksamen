<script>
    import toastr from "toastr";
    import { baseSheet, selectedLineage, selectedRace } from "../../store/createStore";

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
        
        baseSheet.update(sheet => {
            return { ...sheet, lineage_id: item.id }; 
        });
    }
</script>

<div class="lineage-card { $selectedLineage?.id === item.id ? 'selected' : '' }">
    <div class="card-header">
        <h3>{item.name || "Unnamed Lineage"}</h3>
        <button on:click={selectLineage}>
            { $selectedLineage?.id === item.id ? "Selected" : "Select" }
        </button>
    </div>

    <div class="card-grid">
        <div class="card-cell">
            <div class="label">Description</div>
            <div class="value">{item.description || "----"}</div>
        </div>

        <div class="card-cell">
            <div class="label">Defining Features</div>
            <div class="value">{item.defining_features || "----"}</div>
        </div>

        <div class="card-cell">
            <div class="label">Required Race</div>
            <div class="value">{item.required_race?.name || "----"}</div>
        </div>

        <div class="card-cell">
            <div class="label">Characteristic Bonuses</div>
            <div class="tags">
                {#each item.bonuses as bonus}
                    <div>{bonus.characteristic_name} +{bonus.bonus}</div>
                {/each}
            </div>
        </div>

        <div class="card-cell">
            <div class="label">Aptitudes</div>
            <div class="tags">
                {#each item.aptitudes as aptitude}
                    <div>{aptitude.aptitude_name || "----"}</div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
.lineage-card {
    display: flex;
    flex-direction: column;
    background-color: #1a1a1a;
    border: 1px solid #333;
    border-left: 4px solid #ffb86c; 
    border-radius: 6px;
    padding: 12px 16px;
    margin-bottom: 12px;
    color: #e0e0e0;
    box-shadow: 0 2px 6px rgba(0,0,0,0.7);
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}

.lineage-card.selected {
    border-left-color: #50fa7b;
    box-shadow: 0 0 12px rgba(80,250,123,0.6);
    transform: scale(1.01);
}

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

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 2px;
}

.tags div {
    background-color: #333;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 0.85rem;
    text-align: center;
}
</style>
