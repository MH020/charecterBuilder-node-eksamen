<script>
  import DescriptionUtil from "../UI/DescriptionUtil.svelte";

  export let weapon;
  export let shootEvent;

  let ammo = weapon.ammo ?? 30;      
  let clipSize = weapon.clipSize ?? 6;
  let clip = weapon.clip ?? clipSize;

  function shoot() {
    if (clip <= 0) return;
    shootEvent({
        weapon,
        roundsFired: 1,
        clipBefore: clip,
        clipAfter: clip - 1,
        ammoRemaining: ammo
    });

    clip -= 1;
  }

  function reload() {
    const needed = clipSize - clip;
    if (ammo <= 0 || needed <= 0) return;

    const loaded = Math.min(needed, ammo);
    ammo -= loaded;
    clip += loaded;
  }
</script>

<div class="weapon-card">

  <div class="header">
    <div class="designation">
      <div class="name">{weapon.name || "UNKNOWN WEAPON"}</div>
      <div class="category">{weapon.category?.name || "—"}</div>
    </div>

    <div class="tags">
      {#each weapon.classes as WeaponClass}
        <DescriptionUtil item={WeaponClass} />
      {/each}
    </div>
  </div>


  <div class="stats">
    <div class="stat"><span>RNG</span>{weapon.range}</div>
    <div class="stat"><span>ROF</span>{weapon.rof}</div>
    <div class="stat"><span>DMG</span>{weapon.damage}</div>
    <div class="stat"><span>PEN</span>{weapon.pen}</div>
    <div class="stat"><span>WT</span>{weapon.wt}kg</div>
    <div class="stat"><span>HANDS</span>{weapon.hands ?? "—"}</div>
  </div>


  {#if weapon.traits?.length}
    <div class="traits">
      {#each weapon.traits as weaponTrait}
        <DescriptionUtil item={weaponTrait} />
      {/each}
    </div>
  {/if}


  {#if weapon.category.name === "Firearm"}
    <div class="ammo-panel">
      <div class="ammo-readout">
        <div>
          <label>CLIP</label>
          <input type="number" bind:value={clip} min="0" max={clipSize} />
          <span>/ {clipSize}</span>
        </div>

        <div>
          <label>RESERVE</label>
          <input type="number" bind:value={ammo} min="0" />
        </div>
      </div>

      <div class="controls">
        <button class="reload" on:click={reload} disabled={ammo <= 0 || clip === clipSize}>
          RELOAD
        </button>
        <button class="shoot" on:click={shoot} disabled={clip <= 0}>
          FIRE
        </button>
      </div>
    </div>
  {/if}
</div>


<style>
    .weapon-card {
  background-color: #1b1b1b;
  border: 1px solid #333;
  border-radius: 6px;
  padding: 1.25rem;
  margin: 1rem auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 0 15px rgba(0,0,0,0.6);
  font-family: 'Courier New', monospace;
}

/* HEADER */
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 2px solid var(--color-accent-dark);
  padding-bottom: 0.5rem;
}

.designation .name {
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--color-accent);
  text-transform: uppercase;
}

.designation .category {
  font-size: 0.85rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* STATS */
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem 1rem;
}

.stat {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed #333;
  padding-bottom: 2px;
  color: var(--color-text);
}

.stat span {
  color: var(--color-accent);
  font-weight: bold;
  letter-spacing: 0.05em;
}

/* TRAITS */
.traits {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  border-top: 1px solid #333;
  padding-top: 0.5rem;
}

/* AMMO PANEL */
.ammo-panel {
  border-top: 2px solid #333;
  padding-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ammo-readout {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.ammo-readout label {
  display: block;
  font-size: 0.75rem;
  color: var(--color-accent);
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.ammo-readout input {
  width: 60px;
  background: #111;
  border: 1px solid #333;
  color: #ddd;
  font-family: inherit;
  padding: 0.25rem;
}

/* CONTROLS */
.controls {
  display: flex;
  gap: 0.5rem;
}

button {
  flex: 1;
  background: #111;
  border: 1px solid #444;
  color: var(--color-text);
  padding: 0.5rem;
  font-family: inherit;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
}

button:hover:not(:disabled) {
  background: #222;
  border-color: var(--color-accent);
}

button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

button.shoot {
  border-color: #552222;
}

button.reload {
  border-color: #444455;
}

</style>



