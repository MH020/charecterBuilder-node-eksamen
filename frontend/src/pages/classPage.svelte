<script>
  import { onMount } from "svelte";
  import { fetchGet } from "../../util/fetchUtil";
  import ClassOverview from "../componets/subPages/ClassOverview.svelte";
  import ClassTalents from "../componets/subPages/classTalents.svelte";
  import ClassPowers from "../componets/subPages/classPowers.svelte";

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
  id = new URLSearchParams(url.search).get("id");

  const response = await fetchGet(`/api/classes/${id}/full`);
  if (response.status === 200) {
    currentClass = response.data;
    //localStorage.setItem("clss", JSON.stringify(currentClass));
  }
});

</script>

<div class="class-overview">
  {#if currentClass}
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
        <ClassTalents bind:clss = {currentClass}  />
      {:else if activeTab === "powers"}
        <ClassPowers bind:clss = {currentClass}/>
      {/if}
    </section>
  {:else}
    <p>Loading class…</p>
  {/if}
</div>
