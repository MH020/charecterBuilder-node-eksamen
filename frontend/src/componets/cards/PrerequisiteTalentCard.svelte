<script>
  export let Talent;
</script>


<div class="card">

    <div class="name">{Talent.name }</div>

    <div class="stat-cell">
        <div class="label">Weapon Skill</div>
        <div class="value">{Talent.weapon_skill }</div>
    </div>

    <div class="stat-cell">
        <div class="label">Talent description</div>
        <div class="value">{Talent.description }</div>
    </div>

    <div class="stat-cell">
        <div class="label">type</div>
        <div class="value">{Talent.type }</div>
    </div>

    <div class="stat-cell">
        <div class="label">prerequisite talent</div>
        <div class="value">{Talent.prerequisite_talent.name }</div>
    </div>

    <div class="stat-cell">
        <div class="label">required race</div>
        <div class="value">{Talent.required_race.name }</div>
    </div>

    <div class="stat-cell">
        <div class="label">aptitudes</div>
        <div class="value">
            {#each Talent.aptitudes as aptitude, i}
            {aptitude.name}{i < Talent.aptitudes.length - 1 ? ', ' : ''}
            {/each}
        </div>
    </div>

</div>


<style>
  .card {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    background-color: #1b1b1b;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #333;
    color: var(--color-text);
    font-family: 'Courier New', monospace;
    box-shadow: 0 2px 6px rgba(0,0,0,0.7);
  }

  .card .name {
    grid-column: span 3;
    font-weight: bold;
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 0.5rem;
    color: var(--color-accent);
    text-shadow: 0 0 4px #664;
  }

  .stat-cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0.5rem;
    background-color: #121212;
    border: 1px solid #333;
    border-radius: 4px;
  }

  .stat-cell .label {
    font-weight: bold;
    font-size: 0.85rem;
    margin-bottom: 0.25rem;
    color: #ffb86c;
    text-transform: capitalize;
  }

  .stat-cell .value {
    font-size: 1rem;
    color: var(--color-text);
  }
</style>
