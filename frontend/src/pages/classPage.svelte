<script>
  import { onMount } from "svelte";
  import { fetchGet } from "../../util/fetchUtil";
  import ClassOverview from "../componets/subPages/ClassOverview.svelte";
  import ClassTalents from "../componets/subPages/classTalents.svelte";
  import ClassPowers from "../componets/subPages/classPowers.svelte";
  import ClassSubclasses from "../componets/subPages/classSubclasses.svelte";
    import { refresh } from "../store/userStore";
    import { navigate } from "svelte-routing";
    import { buildingSheet } from "../store/createStore";

  let currentClass;
  let id = "";
  let activeTab = "overview";
  
  $: tabs = [];

  onMount(async () => {
    const url = new URL(window.location.href);
    id = new URLSearchParams(url.search).get("id");
    refresh()
    const response = await fetchGet(`/api/classes/${id}/full`);
    if (response.status === 200) {
      currentClass = response.data;
      tabs = createTabs(currentClass)
    }
  });

  function createTabs(currentClass) {
    if (currentClass && currentClass?.parent_id === null) {
      tabs = [
        { id: "overview", label: "Overview" },
        { id: "talents", label: "Talents" },
        { id: "powers", label: "Powers" },
        { id: "subclasses", label: "Subclasses" },
      ];
    } else {
      tabs = [
        { id: "overview", label: "Overview" },
        { id: "talents", label: "Talents" },
        { id: "powers", label: "Powers" },
      ];
    }
    return tabs;
  }

  function goToParent() {
    if (currentClass?.parent_id) {
      navigate(`/class/?id=${currentClass.parent_id}`);
    }
  }

  function returnToSheet() {
    navigate("/newSheet") 
  }
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

   
      {#if currentClass?.parent_id}
        <button on:click={goToParent}>Parent Class</button>
      {/if}

      {#if $buildingSheet}
        <button on:click={returnToSheet}>Return to Sheet</button>
      {/if}


    </nav>

    <section class="class-content">
      {#if activeTab === "overview"}
        <ClassOverview bind:clss={currentClass} />
      {:else if activeTab === "talents"}
        <ClassTalents bind:clss={currentClass} />
      {:else if activeTab === "powers"}
        <ClassPowers bind:clss={currentClass} />
      {:else if activeTab === "subclasses"}
        <ClassSubclasses bind:clss={currentClass} />
      {/if}
    </section>
  {:else}
    <p>Loading class…</p>
  {/if}
</div>
