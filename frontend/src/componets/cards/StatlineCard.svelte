<script>
  export let statline;
</script>


<div class="statline-card">

  <div class="name">{statline.name }</div>

  <div class="stat-cell">
    <div class="label">Weapon Skill</div>
    <div class="value">{statline.weapon_skill }</div>
  </div>

  <div class="stat-cell">
    <div class="label">Ballistic Skill</div>
    <div class="value">{statline.ballistic_skill }</div>
  </div>

  <div class="stat-cell">
    <div class="label">Strength</div>
    <div class="value">{statline.strength }</div>
  </div>

  <div class="stat-cell">
    <div class="label">Toughness</div>
    <div class="value">{statline.toughness }</div>
  </div>

  <div class="stat-cell">
    <div class="label">Agility</div>
    <div class="value">{statline.agility }</div>
  </div>

  <div class="stat-cell">
    <div class="label">Intelligence</div>
    <div class="value">{statline.intelligence }</div>
  </div>

  
  <div class="stat-cell">
    <div class="label">Perception</div>
    <div class="value">{statline.perception }</div>
  </div>

  <div class="stat-cell">
    <div class="label">Willpower</div>
    <div class="value">{statline.willpower }</div>
  </div>

  <div class="stat-cell">
    <div class="label">Fellowship</div>
    <div class="value">{statline.fellowship }</div>
  </div>
</div>

<style>
  .statline-card {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    background: #f9f9f9;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #ddd;
    width: 100%;
    max-width: 400px;
    font-family: "Arial", sans-serif;
  }

  .stat-cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0.5rem;
    background: #fff;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
  }

  .stat-cell .label {
    font-weight: bold;
    font-size: 0.85rem;
    margin-bottom: 0.25rem;
    text-transform: capitalize;
  }

  .stat-cell .value {
    font-size: 1.1rem;
    color: #333;
  }

  .statline-card .name {
    grid-column: span 3;
    font-weight: bold;
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 0.5rem;
  }
</style>
