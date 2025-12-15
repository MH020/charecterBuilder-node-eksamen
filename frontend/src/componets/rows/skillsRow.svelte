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
        modalSelectCallback.set((selectedAptitude) => {
        editableMain = selectedAptitude;

        modalSelectCallback.set(null);
        });
        openModal(ApptitudesList);
    }

    function setSecoundaryApptitude() {
        modalSelectCallback.set((selectedAptitude) => {
        editableSecondary = selectedAptitude;

        modalSelectCallback.set(null);
        });
        openModal(ApptitudesList);
    }
</script>


<div class="row">
    <div class="row-name">
        {#if isEditing}
            <input bind:value={editableName} />   

            <span class="name">{skill.name || "----"}</span>

            <textarea bind:value={editableDescription} rows="3" cols="30"></textarea>
        {:else}
            <span class="name">{skill.name || "----"}</span>

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
