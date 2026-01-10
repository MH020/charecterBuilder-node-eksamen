<script>
  import { onMount } from "svelte";
  import { fetchGet } from "../../util/fetchUtil";
  import ClassOverview from "../componets/subPages/ClassOverview.svelte";
  import ClassTalents from "../componets/subPages/classTalents.svelte";
  import ClassPowers from "../componets/subPages/classPowers.svelte";
  import ClassSubclasses from "../componets/subPages/classSubclasses.svelte";

  let currentSheet;
  let id;

  let activeTab = "overview";
  
    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "talents", label: "Talents and Ability" },
        { id: "weapons", label: "Weapons" },
        { id: "inventory", label: "inventory" },
        { id: "powers", label: "powers" },
        { id: "Comrade", label: "Comrades" },
    ];

  onMount(async () => {
    const url = new URL(window.location.href);
    id = new URLSearchParams(url.search).get("id");

    const response = await fetchGet(`/api/classes/${id}/full`);
    if (response.status === 200) {
      currentSheet = response.data;
    }
  });

</script>

<div class="sheet-overview">
  {#if currentSheet}
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
        <ClassOverview bind:clss={currentSheet} />
      {:else if activeTab === "talents"}
        <ClassTalents bind:clss={currentSheet} />
      {:else if activeTab === "powers"}
        <ClassPowers bind:clss={currentSheet} />
      {:else if activeTab === "subclasses"}
        <ClassSubclasses bind:clss={currentSheet} />
      {/if}
    </section>
  {:else}
    <p>Loading sheet.....</p>
  {/if}
</div>
