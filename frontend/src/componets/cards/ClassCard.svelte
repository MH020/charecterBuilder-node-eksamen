<script>
    import { fetchGet } from "../../../util/fetchUtil";
    import { Selectedclass } from "../../store/createStore";
    import { navigate } from "svelte-routing";

    export let item;

    async function selectClass() {
    const response = await fetchGet(`/api/classes/${item.id}/full`);
    if (response.status === 200) {
        Selectedclass.set(response.data);
    }
    }

  function GoToClassPage(id) {
    navigate(`/class/?id=${id}`); 
  }
    

</script>

<div class="class-card { $Selectedclass?.id === item.id ? 'selected' : '' }">
<div class="card-header">
    <h3>{item.name}</h3>

    <div class="header-actions">
        <button class="view-btn" on:click={() => GoToClassPage(item.id)}>
            View
        </button>

        <button on:click={selectClass}>
            { $Selectedclass?.id === item.id ? "Selected" : "Select" }
        </button>
    </div>
</div>

    <div class="card-grid">
        <div class="card-cell">
            <div class="label">Description</div>
            <div class="value">{item.description || "----"}</div>
        </div>
    </div>
</div>

<style>

.header-actions {
    display: flex;
    gap: 8px;
}

.view-btn {
    background-color: transparent;
    color: #ffb86c;
    border: 1px solid #ffb86c;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.2s, color 0.2s;
}

.view-btn:hover {
    background-color: #ffb86c;
    color: #121212;
}


.class-card {
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

.class-card.selected {
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


</style>
