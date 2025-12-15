<script>
  import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";
  import {
    selectMultibleFromModal,
    selectSingleFromModal,
  } from "../../../util/ListUtil";
  import { modalSelectCallback, openModal } from "../../store/modalStore";
  import AvailabilityList from "../lists/ItemsList/availabilityList.svelte";
  import CategoryList from "../lists/ItemsList/categoryList.svelte";
  import WeaponClassList from "../lists/weaponLists/weaponClassList.svelte";
  import WeaponTraitList from "../lists/weaponLists/weaponTraitList.svelte";

  export let weapon;
  export let onSave;
  export let onDelete;

  let editableWeapon = structuredClone(weapon);
  let isEditing = weapon.isNew;
  let classTooltip = [];
  let traitTooltip = [];

  function startEditing() {
    isEditing = true;
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
</script>

<div class="row">
  {#if isEditing}
    <div class="cell-box">
      <div class="label">Category</div>
      <button
        on:click={() =>
          selectSingleFromModal(editableWeapon, "category", CategoryList)}
      >
        {editableWeapon.category.name || "category"}
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
      <button
        on:click={() =>
          selectSingleFromModal(editableWeapon,"availability",AvailabilityList,
)}
      >
        {editableWeapon.availability.name || "Availability"}
      </button>
    </div>

    <button
      on:click={() =>
        selectMultibleFromModal(WeaponClassList, (selected) => {
          const list = editableWeapon.classes || [];

          const exists = list.some((c) => c.id === selected.id);

          editableWeapon = {
            ...editableWeapon,
            classes: exists
              ? list.filter((wc) => wc.id !== selected.id)
              : [...list, selected],
          };
        })}
    >
      select class
    </button>

    <div class="cell-box">
      <div class="label">Class</div>
      <div class="tags">
        {#each editableWeapon.classes as WeaponClass, index}
          <button
            class="tag"
            on:mouseenter={() => (classTooltip[index] = true)}
            on:mouseleave={() => (classTooltip[index] = false)}
          >
            {WeaponClass.name || "----"}
            {#if classTooltip[index]}
              <div class="tooltip">
                {WeaponClass.description || "No description"}
              </div>
            {/if}
          </button>
        {/each}
      </div>
    </div>

    <button
      on:click={() =>
        selectMultibleFromModal(WeaponTraitList, (selected) => {
          const list = editableWeapon.traits || [];

          const exists = list.some((trait) => trait.id === selected.id);

          editableWeapon = {
            ...editableWeapon,
            classes: exists
              ? list.filter((trait) => trait.id !== selected.id)
              : [...list, selected],
          };
        })}
    >
      select trait
    </button>

    <div class="cell-box">
      <div class="label">Traits</div>
      <div class="tags">
        {#each editableWeapon.traits as WeaponTrait, index}
          <button
            class="tag"
            on:mouseenter={() => (traitTooltip[index] = true)}
            on:mouseleave={() => (traitTooltip[index] = false)}
          >
            {WeaponTrait.name || "----"}
            {#if traitTooltip[index]}
              <div class="tooltip">
                {WeaponTrait.description || "No description"}
              </div>
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
          <button
            class="tag"
            on:mouseenter={() => (classTooltip[index] = true)}
            on:mouseleave={() => (classTooltip[index] = false)}
          >
            {WeaponClass.name || "----"}
            {#if classTooltip[index]}
              <div class="tooltip">
                {WeaponClass.description || "No description"}
              </div>
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
          <button
            class="tag"
            on:mouseenter={() => (traitTooltip[index] = true)}
            on:mouseleave={() => (traitTooltip[index] = false)}
          >
            {WeaponTrait.name || "----"}
            {#if traitTooltip[index]}
              <div class="tooltip">
                {WeaponTrait.description || "No description"}
              </div>
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
      <div>{weapon.availability.name || "----"}</div>
    </div>

    <div class="buttons">
      <button on:click={startEditing}>Edit</button>
      <button on:click={deleteRow}>Delete </button>
    </div>
  {/if}
</div>
