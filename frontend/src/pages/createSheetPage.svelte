<script>
    import RaceCard from "../componets/cards/RaceCard.svelte";
    import LineageCard from "../componets/cards/LineageCard.svelte";
    import SelectList from "../componets/subPages/createSheet/SelectList.svelte";
    import Createcharacteristics from "../componets/subPages/createSheet/Createcharacteristics.svelte";
    import { activeTabStore, buildingSheet, selectedRace } from "../store/createStore";
    import { get } from "svelte/store";
    import ClassCard from "../componets/cards/ClassCard.svelte";
    import CreateCLassOverview from "../componets/subPages/createSheet/CreateCLassOverview.svelte";
    import SkillCard from "../componets/subPages/createSheet/setupSkills.svelte";
    import HandleApptitudes from "../componets/subPages/createSheet/HandleApptitudes.svelte";

    buildingSheet.set(true)
    let activeTab = get(activeTabStore) || "overview";
  
    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "race", label: "Race" },
        { id: "lineage", label: "Lineage", requiresRace: true  },
        { id: "characteristics", label: "Characteristics", requiresRace: true },
        { id: "classes", label: "Classes", requiresRace: true },
        { id: "aptitudes", label: "Aptitudes", requiresRace: true },
        { id: "skills", label: "Skills", requiresRace: true },
        { id: "comrades", label: "Comrades", requiresRace: true },
    ];

    function selectTab(tabId) {
    activeTab = tabId;
    activeTabStore.set(tabId); 
  }

</script>

<div class="sheet-overview">
        <nav class="tabs">
        {#each tabs as tab}
            <button
            class:active={activeTab === tab.id}
            on:click={() => selectTab(tab.id)}
            >
            {tab.label}
            </button>
        {/each}
        </nav>

    <section class="sheet-content">
      {#if activeTab === "overview"}
      <CreateCLassOverview />

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
        <Createcharacteristics race={$selectedRace} />

      {:else if activeTab === "classes"}
        <SelectList 
        endpoint = {"/api/classes/root"}
        card = {ClassCard}/>

      {:else if activeTab === "aptitudes"}
      <HandleApptitudes />

      {:else if activeTab === "skills"}

      <SkillCard />

      {:else if activeTab === "comrades"}
        
      {/if}
    </section>
</div>
