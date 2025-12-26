<script>
  import { onMount } from "svelte";
  import { fetchGet } from "../../util/fetchUtil";
  import ClassOverview from "../componets/subPages/ClassOverview.svelte";
  import { classDataStore } from "../store/classStore";

    let activeTab = "overview";

    const tabs = [
    { id: "overview", label: "Overview" },
    { id: "talents", label: "Talents" },
    { id: "powers", label: "Powers" },
  ];

    $: currentClass = $classDataStore;

  $: if (currentClass.classID && (!currentClass.clss || currentClass.clss.id !== currentClass.classID)) {
    fetchGet(`/api/classes/${currentClass.classID}/full`).then(response => {
      if (response.status === 200) {
        classDataStore.update(store => {
          store.clss = response.data;
          return store;
        });
      }
    });
  }

</script>

<div class="class-overview">
  {#if currentClass.clss}
    <h2>{currentClass.clss.name}</h2>

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

    <section class="class-content">
      {#if activeTab === "overview"}
        <ClassOverview clss={currentClass.clss} />
      {:else if activeTab === "talents"}
        <p>Talents go here</p>
      {:else if activeTab === "powers"}
        <p>Powers go here</p>
      {/if}
    </section>

  {:else}
    <p>Loading class…</p>
  {/if}
</div>

