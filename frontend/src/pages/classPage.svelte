<script>
  import { onMount } from "svelte";
  import { fetchGet } from "../../util/fetchUtil";
  import ClassOverview from "../componets/subPages/ClassOverview.svelte";
  let currentClass ;

  let id = "";
  let activeTab = "overview";

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "talents", label: "Talents" },
    { id: "powers", label: "Powers" },
  ];

  onMount(async () => {
    
    const url = new URL(window.location.href);
    const queryParams = new URLSearchParams(url.search);
    id = queryParams.get("id");

    const storedClass = localStorage.getItem("clss");
    currentClass = storedClass ? JSON.parse(storedClass) : null;

    if (!currentClass || currentClass.id !== id) {
      const response = await fetchGet(`/api/classes/${id}/full`)
      console.log(response);
      if (response.status === 200) {
        currentClass = response.data;
        localStorage.setItem("clss", JSON.stringify(currentClass));
          console.log("currentclass ?", currentClass);
      }
    }
  });

</script>

<div class="class-overview">
  {#if currentClass}
    <h2>{currentClass.name}</h2>

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
        <ClassOverview bind:clss={currentClass} />
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
