<script>
    import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
    import { modalSelectCallback, openModal } from "../../store/modalStore";
    import AvailabilityList from "../lists/ItemsList/availabilityList.svelte";
    import CategoryList from "../lists/ItemsList/categoryList.svelte";
    import WeaponClassList from "../lists/weaponLists/weaponClassList.svelte";
    import WeaponTraitList from "../lists/weaponLists/weaponTraitList.svelte";

    export let weapon
    export let onSave;     
    export let onDelete;   

    let editableWeapon = structuredClone(weapon);
    let isEditing = weapon.isNew;
    let classTooltip = [];
    let traitTooltip = [];

    function startEditing(){
        isEditing = true;
        //need to stop lists from being null or things break
        editableWeapon.classes ||= [];
        editableWeapon.traits ||= [];

    }

    async function saveEdit() {
        let updated;

        if (weapon.isNew) {
            const response = await fetchPost("/api/weapons", editableWeapon);
            if (response.status === 201) {
                updated = response.created;
            }
        } else {
            await fetchUpdate("/api/weapons", editableWeapon);
            updated = editableWeapon;
        }

        onSave(updated);   
        isEditing = false;
    }

    function cancelEdit() {
        isEditing = false;

        if (weapon.isNew) {

            onDelete(weapon.id, true); 
        } else {
            editableWeapon = structuredClone(weapon);
        }
    }

      function deleteRow() {
        onDelete(weapon.id);  
    }

    function selectCategory(){
        modalSelectCallback.set((category) => {
        editableWeapon.category = category;

        modalSelectCallback.set(null);
        });
        openModal(CategoryList);
    }

    function selectAvailability(){
        modalSelectCallback.set((availability) => {
            editableWeapon.availability = availability;

            modalSelectCallback.set(null);
        });
        openModal(AvailabilityList);

    }

function selectMultibleFromModal(list, component){

    modalSelectCallback.set((selectedElement) => {
        console.log(selectedElement)

        const index = list.findIndex(item => item.id === selectedElement.id);

        if (index >= 0) {
            list.splice(index, 1);       
        } else {
            list.push(selectedElement);    
        }
        editableWeapon = { ...editableWeapon };
        console.log(editableWeapon)

        modalSelectCallback.set(null);
    });

    openModal(component);
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


    <button on:click={()=> selectMultibleFromModal(editableWeapon.classes, WeaponClassList)}>select class</button>

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

    <button on:click={()=> selectMultibleFromModal(editableWeapon.traits, WeaponTraitList)}>select Weapon Trait</button>

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
        <button on:click={startEditing}>Edit</button>
    <button on:click={deleteRow}>Delete </button>
    </div>
  {/if}
</div>


