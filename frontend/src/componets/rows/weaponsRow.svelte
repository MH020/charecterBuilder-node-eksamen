<script>
    import { openModal, modalStore, modalSelectCallback, closeModal } from "../../store/modalStore";
    import ApptitudesList from "../lists/ApptitudesList.svelte";
    import { fetchUpdate, fetchDelete, fetchPost } from "../../../util/fetchUtil";


    export let weapon
    export let deleteWeapon
    export let isEditing;

    let showTooltip = false;
    let editableWeapon = {};



    function startEditing(){
        isEditing = true;
        editableWeapon = structuredClone(weapon);

    }

    async function saveEdit(){
        const updated = {...editableWeapon };

        if(weapon.isNew){
            const response = await fetchPost("/api/skills", updated)
            console.log("created?",response)
            if(response.status === 201){
                weapon = response.created
            }

        } else {
            fetchUpdate("/api/skills",updated);
        }
        isEditing = false
    }

    function cancelEdits() {
        isEditing = false;
        editableWeapon = structuredClone(weapon);
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


<div class="row">
    <div class="row-name">
        {#if isEditing}
            <input bind:value={editableWeapon.name} />   
        {:else}     
        <span class="name">{weapon.name || "----"}</span>
        <span class="class">{weapon.weapon_class.name || "----"}</span>
        <span class="class">{weapon.range || "----"}</span>
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
