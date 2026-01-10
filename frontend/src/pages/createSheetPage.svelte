<script>
    import RaceCard from "../componets/cards/RaceCard.svelte";
    import LineageCard from "../componets/cards/LineageCard.svelte";
    import SelectList from "../componets/subPages/createSheet/SelectList.svelte";
    import Createcharacteristics from "../componets/subPages/createSheet/Createcharacteristics.svelte";

  let id;

  let activeTab = "overview";
  
    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "race", label: "Race" },
        { id: "lineage", label: "Lineage", requiresRace: true  },
        { id: "characteristics", label: "Characteristics", requiresRace: true },
        { id: "classes", label: "Classes", requiresRace: true },
        { id: "comrades", label: "Comrades", requiresRace: true },
    ];

</script>

<div class="sheet-overview">
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

    <section class="sheet-content">
      {#if activeTab === "overview"}

      {:else if activeTab === "race"}
        <SelectList 
        endpoint = {"/api/races"}
        card = {RaceCard}
        />
      {:else if activeTab === "lineage"}
        <SelectList 
        endpoint = {"/api/lineages"}
        card = {LineageCard}/>
        
      {:else if activeTab === "characteristics"}
        <Createcharacteristics 
        race = {}/>

      {:else if activeTab === "classes"}

      {:else if activeTab === "comrades"}
        
      {/if}
    </section>
</div>
