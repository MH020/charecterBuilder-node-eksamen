<script>
    export let race;


    const characteristics = [
        "agility",
        "ballistic_skill",
        "fellowship",
        "intelligence",
        "perception",
        "strength",
        "toughness",
        "weapon_skill",
        "willpower"
    ];

    let stats = {};
    
    characteristics.forEach(name => {
        stats[name] = race.base_statline[name] || 0;
    });

    function calcBonus(value) {
        return Math.floor((value - 10) / 2);
    }

    function updateStat(name, event) {
        const minValue = race.base_statline[name] || 0;
        const val = parseInt(event.target.value);
        stats[name] = val >= minValue ? val : minValue;
    }
</script>

<div class="characteristics-grid">
    {#each characteristics as name}
        <div class="char-box">
            <input type="number"
                   bind:value={stats[name]}
                   min={race.base_statline[name]}
                   on:input={(e) => updateStat(name, e)}
            />
            <div class="bonus">Bonus: {calcBonus(stats[name]) >= 0 ? `+${calcBonus(stats[name])}` : calcBonus(stats[name])}</div>
        </div>
    {/each}
</div>

<style>
.characteristics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
}

.char-box {
    display: flex;
    flex-direction: column;
    background-color: #222;
    border: 1px solid #444;
    border-radius: 6px;
    padding: 8px;
    align-items: center;
}

input {
    width: 60px;
    padding: 4px 6px;
    border-radius: 4px;
    border: 1px solid #333;
    background-color: #121212;
    color: #c0c0c0;
    text-align: center;
    font-size: 1rem;
    margin-bottom: 4px;
}

.bonus {
    color: #50fa7b;
    font-weight: bold;
}
</style>
