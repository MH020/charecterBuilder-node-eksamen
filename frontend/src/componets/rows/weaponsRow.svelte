<script>
  export let weapon;
  export let isEditing = false;
  let editableWeapon = {};
  let classTooltip = [];
  let traitTooltip = [];

  function startEditing() {
    isEditing = true;
    editableWeapon = structuredClone(weapon);
  }

  function cancelEdit() {
    isEditing = false;
    editableWeapon = structuredClone(weapon);
  }
</script>

<div class="row">
  {#if isEditing}
    <div class="cell-box">
      <div class="label">Name</div>
      <input bind:value={editableWeapon.name} />
    </div>
  {:else}
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

    <div class="cell-box">
      <div class="label">Hands</div>
      <div>{weapon.hands || "----"}</div>
    </div>

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
  {/if}
</div>


