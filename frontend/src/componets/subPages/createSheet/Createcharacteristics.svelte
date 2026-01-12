<script>
    import toastr from "toastr";
    import { Selectedcharacteristics } from "../../../store/createStore";
    import { onMount } from "svelte";
    import { fetchGet } from "../../../../util/fetchUtil";

    export let race;

    let characteristics = [];
    let stats = {};

    onMount(async () => {
        const response = await fetchGet("/api/characteristics");
        if (response.status === 200) {
            characteristics = response.data;
        } else {
            toastr.error("Failed to load characteristics");
        }
    });

    $: if (race?.base_statline && characteristics.length > 0) {
        const newStats = {};
        characteristics.forEach(c => {
            const key = statKey(c.name); 
            newStats[c.name] = race.base_statline[key] ?? 0;
        });
        stats = newStats;
    }

    function statKey(name) {
        return name.toLowerCase().replace(/\s/g, "_");
    }

    function calcBonus(value) {
        return Math.floor((value - 10) / 2);
    }

    function updateStat(characteristic, event) {
        const key = characteristic.name;
        const minValue = race.base_statline?.[statKey(key)] ?? 0;
        const val = parseInt(event.target.value);
        stats = { ...stats, [key]: val >= minValue ? val : minValue };
    }

    function sendToStore() {
        const list = characteristics.map(c => ({
            id: c.id,
            name: c.name,
            value: stats[c.name],
            bonus: calcBonus(stats[c.name])
        }));
        Selectedcharacteristics.set(list);
        console.log(list)
        toastr.success("Characteristics saved");
    }
</script>


<div class="characteristics-grid">
    {#if characteristics.length === 0}
        <p class="loading-text">Loading characteristics...</p>
    {:else}
        {#each characteristics as characteristic}
            <div class="char-box">
                <p>{characteristic.name}</p>
                <input
                    type="number"
                    bind:value={stats[characteristic.name]}
                    min={race.base_statline?.[statKey(characteristic.name)] ?? 0}
                    on:input={(e) => updateStat(characteristic, e)}
                />
                <div class="bonus" class:negative={calcBonus(stats[characteristic.name]) < 0}>
                    {calcBonus(stats[characteristic.name]) >= 0
                        ? `+${calcBonus(stats[characteristic.name])}`
                        : calcBonus(stats[characteristic.name])}
                </div>
            </div>
        {/each}

        <button class="send-btn" on:click={sendToStore}>
            Save Characteristics
        </button>
    {/if}
</div>

<style>
.characteristics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
    width: 100%;
    max-width: 800px;
    margin: 0 auto 20px auto;
}

.loading-text {
    color: var(--color-accent);
    font-weight: bold;
    text-align: center;
}

.char-box {
    background-color: #1b1b1b; 
    border: 1px solid #444; 
    border-radius: 8px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: background 0.2s;
}

.char-box:hover {
    background-color: #222; 
}

.char-box p {
    font-weight: bold;
    color: var(--color-accent);
    margin-bottom: 8px;
    text-align: center;
}

.char-box input[type="number"] {
    width: 60px;
    padding: 6px;
    border-radius: 6px;
    border: 1px solid #444;
    background-color: var(--color-btn-bg);
    color: var(--color-text);
    text-align: center;
    margin-bottom: 6px;
}

.char-box input[type="number"]:focus {
    outline: 2px solid var(--color-accent);
}

.bonus {
    font-weight: bold;
    color: var(--color-accent);
}

.bonus.negative {
    color: #ff5555;
}

.send-btn {
    grid-column: 1 / -1;
    justify-self: center;
    padding: 10px 20px;
    background-color: var(--color-btn-bg);
    color: var(--color-accent);
    border: 1px solid var(--color-accent-dark);
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    text-transform: uppercase;
    box-shadow: 0 2px 6px rgba(0,0,0,0.5);
    transition: all 0.2s ease-in-out;
    margin-top: 10px;
}

.send-btn:hover {
    background-color: var(--color-btn-hover-bg);
    color: #ffcc80;
    border-color: var(--color-accent);
}
</style>
