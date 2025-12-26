<script>
    import ClassOverview from "../componets/subPages/ClassOverview.svelte";

  export let clss;


  let activeTab = 'overview';

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'talents', label: 'Talents' },
    { id: 'powers', label: 'Powers' }
  ];
</script>

<div class="class-overview">


  <nav class="nav tabs">
    {#each tabs as tab}
      <button 
        class:active={activeTab === tab.id}
        on:click={() => activeTab = tab.id}>
        {clss.name} {tab.label}
      </button>
    {/each}
  </nav>


  <section class="class-content">
    {#if activeTab === 'overview'}
      <ClassOverview {clss} />
    {:else if activeTab === 'talents'}
      <ClassTalents {clss} />
    {:else if activeTab === 'powers'}
      <ClassPowers {clss} />
    {/if}
  </section>

</div>

<style>
  .tabs button {
    padding: 0.5em 1em;
    margin-right: 0.5em;
    border: none;
    background: #eee;
    cursor: pointer;
  }
  .tabs button.active {
    background: #ccc;
    font-weight: bold;
  }
  .class-content {
    margin-top: 1em;
  }
</style>
