<script>
    export let name;
    export let description;
    export let main_aptitude;
    export let secondary_aptitude;
    export let editSkill;
    export let deleteSkill;
    let showTooltip = false;
</script>

<div class="skill-row">
    <div class="skill-name">
        <span class="name">{name}</span>
        <button
            class="description-btn"
            on:mouseenter={() => showTooltip = true}
            on:mouseleave={() => showTooltip = false}
            aria-describedby="tooltip-description"
        >
            description
        </button>
        {#if showTooltip}
        <div id="tooltip-description" role="tooltip" class="tooltip">
            {description}
        </div>
        {/if}
    </div>

    <div class="aptitudes">
        <span>Main: {main_aptitude}</span>
        <span>Secondary: {secondary_aptitude}</span>
    </div>

    <div class="buttons">
        <button on:click={() => editSkill()}>
            Edit
        </button>
        <button on:click={() => deleteSkill()}>
            Delete
        </button>
    </div>
</div>

<style>

.skill-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #1b1b1b; 
    color: #e0e0e0; 
    border: 1px solid #444;
    padding: 10px 15px;
    margin-bottom: 6px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    position: relative;
    transition: background-color 0.2s;
}

.skill-row:hover {
    background-color: #2a2a2a;
}


.skill-name {
    display: flex;
    align-items: center;
    position: relative; 
}

.name {
    font-weight: bold;
    margin-right: 8px;
    color: #ffb86c; 
}


.description-btn {
    background: none;
    border: none;
    padding: 0 4px;
    text-decoration: underline;
    color: #8be9fd;
    cursor: pointer;
    font-size: 0.9em;
    position: relative;
}

.tooltip {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 120%;
    background-color: #111;
    color: #f8f8f2;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 0.9em;
    white-space: pre-wrap;
    box-shadow: 0 0 12px rgba(0,0,0,0.8);
    z-index: 10;
    max-width: 250px; 
    text-align: left;
}


.aptitudes span {
    margin-right: 15px;
    font-size: 0.95em;
    color: #f1fa8c; 
}


.buttons button {
    background-color: #444;
    border: 1px solid #666;
    color: #f8f8f2;
    padding: 4px 8px;
    margin-left: 5px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 0.85em;
    transition: all 0.2s;
}

.buttons button:hover {
    background-color: #555;
    border-color: #888;
}
</style>
