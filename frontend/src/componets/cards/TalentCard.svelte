<script>
    import DescriptionUtil from "../UI/DescriptionUtil.svelte";

  export let talent;
</script>


<div class="card">

    <div class="name">{talent.name }</div>

    <div class="stat-cell">
        <div class="label">Talent description</div>
        <div class="value">{talent.description }</div>
    </div>
    {#if talent.type}
          <div class="stat-cell">
        <div class="label">type</div>
        <div class="value">{talent.type }</div>
    </div>
    {/if}

    {#if talent.prerequisite_talent}
          <div class="stat-cell">
        <div class="label">prerequisite talent</div>
        <DescriptionUtil item = {talent.prerequisite_talent} />
    </div>
    {/if}

    {#if talent.required_race}
      <div class="stat-cell">
        <div class="label">required race</div>
        <div class="value">{talent.required_race.name }</div>
    </div>
    {/if}

    {#if talent.apptitudes}
          <div class="stat-cell">
        <div class="label">aptitudes</div>
        <div class="value">
            {#each talent.aptitudes as aptitude, i}
            {aptitude.name}{i < talent.aptitudes.length - 1 ? ', ' : ''}
            {/each}
        </div>
    </div>
    {/if}


</div>

<style>
  .card {
    background-color: #1b1b1b; /* dark panel */
    border: 1px solid #333;
    border-radius: 8px;
    padding: 1.5rem;
    width: 100%;
    max-width: 500px;
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
    gap: 1rem; /* space between sections */
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
}

.card .name {
    font-family: 'Courier New', monospace;
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--color-accent);
    border-bottom: 2px solid var(--color-accent-dark);
    padding-bottom: 0.25rem;
    margin-bottom: 0.75rem;
    text-transform: uppercase;
}

.stat-cell {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 0.5rem;
}

.stat-cell .label {
    min-width: 120px;
    font-weight: bold;
    color: var(--color-accent);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.stat-cell .value {
    flex: 1 1 auto;
    color: var(--color-text);
    font-family: 'Courier New', monospace;
    word-break: break-word;
}

</style>

