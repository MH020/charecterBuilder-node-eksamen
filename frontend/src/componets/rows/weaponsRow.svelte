<script>
    import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
    import { modalSelectCallback, openModal } from "../../store/modalStore";
    import CategoryList from "../lists/categoryList.svelte";

    export let weapon
    export let deleteWeapon
    export let isEditing;
    let editableWeapon = {};
    let classTooltip = [];
    let traitTooltip = [];

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

    function cancelEdit() {
        isEditing = false;
        editableWeapon = structuredClone(weapon);
    }

    function selectCategory(){
        modalSelectCallback.set((category) => {
        editableWeapon.category = category;

        modalSelectCallback.set(null);
        });
        openModal(CategoryList);
    }

    function selectAvailability(){

    }

    function selectWeaponClass(){
        
    }


</script>

<div class="row">
  {#if isEditing}

    <div class="cell-box">
    <div class="label">Category</div>
    <button on:click={selectCategory}>
        {editableWeapon.category.name} 
    </button>
    </div>

    <div class="cell-box">
      <div class="label">Name</div>
      <input bind:value={editableWeapon.name} />
    </div>
    {#if editableWeapon.hands}
        <div class="cell-box">
        <div class="label">hands</div>
        <input bind:value={editableWeapon.hands} />
        </div>
    {/if}
    <div class="cell-box">
        <div class="label">range</div>
        <input bind:value={editableWeapon.range} />
    </div>

    <div class="cell-box">
        <div class="label">RoF</div>
        <input bind:value={editableWeapon.rof} />
    </div>

    <div class="cell-box">
        <div class="label">damage</div>
        <input bind:value={editableWeapon.damage} />
    </div>

    <div class="cell-box">
        <div class="label">pen</div>
        <input bind:value={editableWeapon.pen} />
    </div>

    <div class="cell-box">
        <div class="label">clip</div>
        <input bind:value={editableWeapon.clip} />
    </div>

    <div class="cell-box">
        <div class="label">reload</div>
        <input bind:value={editableWeapon.reload} />
    </div>

    <div class="cell-box">
        <div class="label">wt</div>
        <input bind:value={editableWeapon.wt} />
    </div>


    <div class="cell-box">
    <div class="label">availability</div>
    <button on:click={selectAvailability}>
        {editableWeapon.availability.name} 
    </button>
    </div>


    <button on:click={selectWeaponClass}>select class</button>

    <div class="cell-box">
      <div class="label">Class</div>
      <div class="tags">
        {#each editableWeapon.classes as WeaponClass, index}
          <button class="tag"
               on:mouseenter={() => classTooltip[index] = true}
               on:mouseleave={() => classTooltip[index] = false}>
            {WeaponClass.name || "----"}
            {#if classTooltip[index]}
              <div class="tooltip">{WeaponClass.description || "No description"}</div>
            {/if}
          </button>
        {/each}
      </div>
    </div>

    <button on:click={selectWeaponClass}>select class</button>

    <div class="cell-box">
      <div class="label">Traits</div>
      <div class="tags">
        {#each editableWeapon.traits as WeaponTrait, index}
          <button class="tag"
               on:mouseenter={() => traitTooltip[index] = true}
               on:mouseleave={() => traitTooltip[index] = false}>
            {WeaponTrait.name || "----"}
            {#if traitTooltip[index]}
              <div class="tooltip">{WeaponTrait.description || "No description"}</div>
            {/if}
          </button>
        {/each}
      </div>
    </div>




    <div class="buttons">
        <button on:click={saveEdit}>Save</button>
        
        <button on:click={cancelEdit}>Cancel</button>
    </div>
  {:else}

    <div class="cell-box">
      <div class="label">category:</div>
      <div>{weapon.category.name || "----"}</div>
    </div>
  
    <div class="cell-box">
      <div class="label">Name</div>
      <div>{weapon.name || "----"}</div>
    </div>

    <div class="cell-box">
      <div class="label">Class</div>
      <div class="tags">
        {#each weapon.classes as WeaponClass, index}
          <button class="tag"
               on:mouseenter={() => classTooltip[index] = true}
               on:mouseleave={() => classTooltip[index] = false}>
            {WeaponClass.name || "----"}
            {#if classTooltip[index]}
              <div class="tooltip">{WeaponClass.description || "No description"}</div>
            {/if}
          </button>
        {/each}
      </div>
    </div>

    {#if weapon.hands}
    <div class="cell-box">
      <div class="label">Hands</div>
      <div>{weapon.hands || "----"}</div>
    </div>   
    {/if}
    <div class="cell-box">
      <div class="label">Range</div>
      <div>{weapon.range || "----"}</div>
    </div>

    <div class="cell-box">
      <div class="label">RoF</div>
      <div>{weapon.rof || "----"}</div>
    </div>

    <div class="cell-box">
      <div class="label">Damage</div>
      <div>{weapon.damage || "----"}</div>
    </div>


    <div class="cell-box">
      <div class="label">Pen</div>
      <div>{weapon.pen || "----"}</div>
    </div>


    <div class="cell-box">
      <div class="label">Traits</div>
      <div class="tags">
        {#each weapon.traits as WeaponTrait, index}
          <button class="tag"
               on:mouseenter={() => traitTooltip[index] = true}
               on:mouseleave={() => traitTooltip[index] = false}>
            {WeaponTrait.name || "----"}
            {#if traitTooltip[index]}
              <div class="tooltip">{WeaponTrait.description || "No description"}</div>
            {/if}
          </button>
        {/each}
      </div>
    </div>


    <div class="cell-box">
      <div class="label">Wt. (kg)</div>
      <div>{weapon.wt || "----"}</div>
    </div>


    <div class="cell-box">
      <div class="label">Availability</div>
      <div>{weapon.availability?.name || "----"}</div>
    </div>

    <div class="buttons">
        <button on:click={() => startEditing()}>Edit</button>
    <button on:click={() => deleteWeapon()}>Delete </button>
    </div>
  {/if}
</div>


