<script>
    import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
    import { closeModal, modalSelectCallback, openModal } from "../../store/modalStore";
    import CategoryList from "../lists/ItemsList/categoryList.svelte";

    export let weaponClass
    export let deleteWeaponClass
    export let isEditing;

    let editableCategory = {};

    function startEditing(){
        isEditing = true;
        editableCategory = structuredClone(weaponClass);

    }

    async function saveEdit(){
        const updated = {...editableCategory };

        if(weaponClass.isNew){
            const response = await fetchPost("/api/weapon/classes", updated)
            console.log("created?",response)
            if(response.status === 201){
                weaponClass = response.created
            }

        } else {
            fetchUpdate("/api/weapon/classes",updated);
        }
        isEditing = false
    }

    function cancelEdit() {
        isEditing = false;
        editableCategory = structuredClone(weaponClass);
    }


</script>

<div class="row">
  {#if isEditing}
    <div class="cell-box">
      <div class="label">Name</div>
      <input bind:value={editableCategory.name} />
    </div>
    <div class="cell-box">
        <div class="label">description</div>
        <input bind:value={editableCategory.description} />
    </div>

    <div class="buttons">
        <button on:click={saveEdit}>Save</button>
        
        <button on:click={cancelEdit}>Cancel</button>
    </div>
  {:else}
    <div class="cell-box">
      <div class="label">Name</div>
      <div>{weaponClass.name || "----"}</div>
    </div>

    <div class="cell-box">
      <div class="label">description</div>
      <div>{weaponClass.description || "----"}</div>
    </div>

    <div class="buttons">
        {#if !$modalSelectCallback}
            <button on:click={() => startEditing()}>Edit</button>
            <button on:click={() => deleteWeaponClass()}>Delete </button>
        {:else}
            <button on:click={() => {$modalSelectCallback(weaponClass); closeModal();}}> select</button>
        {/if}
    </div>
  {/if}
</div>


