<script>
    import { openModal, modalStore, modalSelectCallback, closeModal } from "../../store/modalStore";
    import ApptitudesList from "../lists/ApptitudesList.svelte";
    import { fetchUpdate, fetchDelete, fetchPost } from "../../../util/fetchUtil";


    export let skill
    export let deleteSkill
    export let isEditing;

    let showTooltip = false;


    let editableName = ""
    let editableDescription = ""
    let editableMain = {}
    let editableSecondary = {}


    function startEditing(){
        isEditing = true;
        editableName = skill.name;
        editableDescription = skill.description;
        editableMain = skill.main_aptitude;
        editableSecondary = skill.secondary_aptitude;

    }

    async function saveEdit(){

        const updated = {   
            id: skill.id,            
            name: editableName,
            description: editableDescription,
            main_aptitude: editableMain,
            secondary_aptitude: editableSecondary
        }
        if(skill.isNew){
            const response = await fetchPost("/api/skills", updated)
            console.log("created?",response)
            if(response.status === 201){
                updated.id = response.created.id 
            }

        } else {
            fetchUpdate("/api/skills",updated);
        }
        skill = updated
        isEditing = false
    }

    function cancelEdits() {
        isEditing = false;
        editableName = skill.name;
        editableDescription = skill.description;
        editableMain = skill.main_aptitude;
        editableSecondary = skill.secondary_aptitude;
    }

    function setMainApptitude() {
        console.log(ApptitudesList)
        modalSelectCallback.set((selectedAptitude) => {
        editableMain = selectedAptitude;
        console.log("selected apptitude", selectedAptitude)
        modalSelectCallback.set(null);
        });
        openModal(ApptitudesList);
    }

    function setSecoundaryApptitude() {

        modalSelectCallback.set((selectedAptitude) => {
        editableSecondary = selectedAptitude;
        console.log(selectedAptitude)
        modalSelectCallback.set(null);
        });
        openModal(ApptitudesList);
    }
</script>


<div class="skill-row">
    <div class="skill-name">
        {#if isEditing}
            <input bind:value={editableName} />   
        {:else}     
        <span class="name">{skill.name || "----"}</span>
        {/if}
        {#if isEditing}

        <textarea bind:value={editableDescription} rows="3" cols="30"></textarea>
        {:else}
        <button
            class="description-btn"
            on:mouseenter={() => showTooltip = true}
            on:mouseleave={() => showTooltip = false}
            aria-describedby="tooltip-description"
        >
            description
        </button>
        {/if}
        {#if showTooltip}
        <div id="tooltip-description" role="tooltip" class="tooltip">
            {skill.description}
        </div>
        {/if}
    </div>

    <div class="aptitudes">
        {#if isEditing}
            <button class="edit-button" on:click={setMainApptitude}>
			    <img alt="main apptitude" class="edit-button" />
		    </button>
        	    <button class="edit-button" on:click={setSecoundaryApptitude}>
			    <img alt="secounday apptitude" class="edit-button" />
		    </button>
            <span>Main: {editableMain.name || skill.main_aptitude.name || "----"}</span>
            <span>Secondary: {editableSecondary.name || skill.secondary_aptitude.name || "-----"}</span>
        {:else}     
        <span>Main: {skill.main_aptitude.name}</span>
        <span>Secondary: {skill.secondary_aptitude.name}</span>

        {/if}
    </div>

    <div class="buttons">
<div class="buttons">
    {#if isEditing}
        <button on:click={saveEdit}>
            Save
        </button>
        <button on:click={cancelEdits}>
            Cancel
        </button>
    {:else}
        <button on:click={() => startEditing()}>
            Edit
        </button>
    <button on:click={() => deleteSkill()}>
        Delete
    </button>
    {/if}
</div>
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
