<script>
    import toastr from "toastr";
    import { fetchUpdate } from "../../../util/fetchUtil";

    export let charactersheetId;
    export let characteristics = [];

    let editable = [];

    $: if (characteristics?.length) {
        editable = characteristics.map(c => ({
            id: c.id, 
            characteristic_id: c.characteristic.id,
            name: c.characteristic.name,
            description: c.characteristic.description,
            value: c.stat_amount
        }));
    }

    function calcBonus(value) {
        return Math.floor((value - 10) / 2);
    }

    function updateValue(index, event) {
        const val = parseInt(event.target.value);
        editable[index].value = isNaN(val) ? 0 : val;
        editable = [...editable]; 
    }

    async function saveChanges() {
        const payload = editable.map(e => ({
            id: e.id,
            stat_amount: e.value
        }));

        const response = await fetchUpdate(
            `/api/charectersheets/${charactersheetId}/characteristics`,
            payload
        );

        if (response.status === 200) {
            toastr.success("Characteristics updated");
        } else {
            toastr.error("Failed to save characteristics");
        }
    }
</script>

<div class="characteristics-grid">
    {#each editable as stat, i (stat.id)}
        <div class="char-box">
            <p class="char-name" title={stat.description}>
                {stat.name}
            </p>

            <input
                type="number"
                bind:value={stat.value}
                on:input={(e) => updateValue(i, e)}
            />

            <div class="bonus" class:negative={calcBonus(stat.value) < 0}>
                {calcBonus(stat.value) >= 0
                    ? `+${calcBonus(stat.value)}`
                    : calcBonus(stat.value)}
            </div>
        </div>
    {/each}

    <button class="send-btn" on:click={saveChanges}>
        Save Characteristics
    </button>
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