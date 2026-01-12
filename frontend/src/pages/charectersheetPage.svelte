<script>
  import { onMount } from "svelte";
  import { fetchGet } from "../../util/fetchUtil";

  import CharacterSheetCharacteristics from "../componets/subPages/CharacterSheetCharacteristics.svelte";
  import CharacterSheetSkills from "../componets/subPages/CharacterSheetSkills.svelte";

  let currentSheet;
  let id;
  let activeTab = "overview";

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "talents", label: "Talents" },
    { id: "powers", label: "Powers" },
    { id: "weapons", label: "Weapons" },
    { id: "inventory", label: "Inventory" },
    { id: "comrades", label: "Comrades" }
  ];

  onMount(async () => {
    const url = new URL(window.location.href);
    id = new URLSearchParams(url.search).get("id");

    const response = await fetchGet(`/api/charectersheets/${id}/full`);
    if (response.status === 200) {
      currentSheet = response.data;
    }
  });

  function save(){

  }
</script>

{#if currentSheet}
<div class="character-sheet">

  <!-- HEADER -->
  <header class="sheet-header">
    <div class="name-block">
      <label>Name</label>
      <input type="text" bind:value={currentSheet.sheet.name} />
    </div>

    <div class="level-block">
      <label>Level</label>
      <select bind:value={currentSheet.sheet.level}>
        {#each Array(20) as _, i}
          <option value={i + 1}>{i + 1}</option>
        {/each}
      </select>
    </div>
  </header>

  <!-- BODY -->
  <div class="sheet-body">

    <!-- LEFT COLUMN: CORE STATS -->
    <aside class="stats-panel">
      <div class="stat-card">
        <label>Fate</label>
        <input type="number" bind:value={currentSheet.sheet.fate_points} />
      </div>

      <div class="stat-card">
        <label>Fortitude</label>
        <input type="number" bind:value={currentSheet.sheet.fortitude} />
      </div>

      <div class="stat-card">
        <label>Insanity</label>
        <input type="number" bind:value={currentSheet.sheet.insanity} />
      </div>

      <div class="stat-card">
        <label>Corruption</label>
        <input type="number" bind:value={currentSheet.sheet.corruption} />
      </div>

      <div class="stat-card">
        <label>Sanctification</label>
        <input type="number" bind:value={currentSheet.sheet.sanctification} />
      </div>
    </aside>

    <!-- RIGHT COLUMN: TABS -->
    <main class="content-panel">
      <nav class="tabs">
        {#each tabs as tab}
          <button
            class:active={activeTab === tab.id}
            on:click={() => (activeTab = tab.id)}
          >
            {tab.label}
          </button>
        {/each}
      </nav>

      <section class="tab-content">
        {#if activeTab === "overview"}
          <CharacterSheetCharacteristics
            characteristics={currentSheet.charecter_characteristics}
            charactersheetId={currentSheet.id}
          />

          <CharacterSheetSkills
            skills={currentSheet.charecter_skills}
            charactersheetId={currentSheet.id}
          />

        {:else}
          <p class="placeholder">Coming soon…</p>
        {/if}
      </section>
    </main>

  </div>

  <footer class="sheet-footer">
    <button class="save-btn" on:click={save}>Save Character</button>
  </footer>

</div>
{:else}
<p class="loading">Loading character sheet…</p>
{/if}


<style>
.character-sheet {
  max-width: 1200px;
  margin: auto;
  padding: 1.5rem;
  font-family: "Cinzel", serif;
  color: #e6e6e6;
  background: #1b1b1b;
  border: 2px solid #444;
  border-radius: 10px;
}

/* HEADER */
.sheet-header {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.sheet-header label {
  font-size: 0.8rem;
  text-transform: uppercase;
  opacity: 0.8;
}

.sheet-header input,
.sheet-header select {
  width: 100%;
  padding: 0.4rem;
  background: #111;
  border: 1px solid #555;
  color: #fff;
}

/* BODY */
.sheet-body {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 1.5rem;
}

/* STATS PANEL */
.stats-panel {
  display: grid;
  gap: 0.75rem;
}

.stat-card {
  background: #222;
  padding: 0.75rem;
  border: 1px solid #444;
  border-radius: 6px;
}

.stat-card label {
  font-size: 0.75rem;
  opacity: 0.7;
}

.stat-card input {
  width: 100%;
  background: #111;
  border: 1px solid #555;
  color: #fff;
  text-align: center;
}

/* TABS */
.tabs {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.tabs button {
  background: #222;
  border: 1px solid #444;
  color: #aaa;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
}

.tabs button.active {
  background: #444;
  color: #fff;
}

/* CONTENT */
.tab-content {
  background: #222;
  border: 1px solid #444;
  padding: 1rem;
  min-height: 300px;
}

/* FOOTER */
.sheet-footer {
  margin-top: 1.5rem;
  text-align: right;
}

.save-btn {
  background: #7b1e1e;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
}

.save-btn:hover {
  background: #a32a2a;
}

.loading {
  text-align: center;
  padding: 2rem;
}


</style>