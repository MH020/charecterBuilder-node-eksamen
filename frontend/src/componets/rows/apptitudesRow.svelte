<script>
    import { openModal,modalStore, modalSelectCallback,closeModal } from "../../store/modalStore";

    export let apptitude; 
    export let editApptitude
    export let deleteApptitude

    console.log(apptitude)

    let showTooltip = false;
    let isEditing = false


    let editableName = apptitude.name;

    function saveEdit(){
        isEditing = false

        editApptitude({
            name: editableName,
        });
    }

    function cancelEdits() {
        isEditing = false;
        editableName = name;
    }

    $: stack = $modalStore
    $:topModal = stack.length ? stack[stack.length -1] : null; 

</script>

<div class="row">
    <div class="id">
        <span>{apptitude.id}</span>
    </div>

    <div class="row_name">
        {#if isEditing}
            <input bind:value={editableName} />   
        {:else}     
            <span>{apptitude.name}</span>
        {/if}
    </div>

    <div class="row_buttons">
        <button on:click={() => editApptitude()}>
            Edit
        </button>
        <button on:click={() => deleteApptitude()}>
            Delete
        </button>
        {#if $modalSelectCallback}
            <button on:click={() => {$modalSelectCallback(apptitude); closeModal();}}>
            select
        </button>
        {/if}
    </div>
</div>


<style>

.row {
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

.row:hover {
    background-color: #2a2a2a;
}


.row_name {
    display: flex;
    align-items: center;
    position: relative; 
}

.row_name {
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


.row_buttons {
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
