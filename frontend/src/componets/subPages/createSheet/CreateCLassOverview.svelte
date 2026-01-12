<script>
    import { baseSheet, buildingSheet} from "../../../store/createStore";

    function save() {
        baseSheet.set(newSheet)
        buildingSheet.set(true)
        console.log(newSheet)
    }


    let newSheet = {
        name: "",
        level: 1,
        race_id: null,
        lineage_id: null, 
        fate_points: 0, 
        fortitude: 0,
        insanity: 0,
        corruption: 0,
        sanctification: 0, 
    }

</script>


<div class="create-character-page">
    <div class="description-box">
        <h2>Character Creation</h2>
        <p>
            Though all may serve their Emperor, no two guardsmen are the same.
            They all bring varying backgrounds, specialties, skills, and, most importantly of all,
            personalities. This will take you through all the steps in order to make your character.
            For the Emperor!
        </p>
    </div>

    <div class="form-row">
        <div class="char-box">
            <label for="char-name">Name</label>
            <input
                id="char-name"
                type="text"
                bind:value={newSheet.name}
                placeholder="Enter your name"
            />
        </div>

        <div class="char-box">
            <label for="char-level">Level</label>
            <select id="char-level" bind:value={newSheet.level}>
                {#each Array(20) as _, i}
                    <option value={i + 1}>Level {i + 1}</option>
                {/each}
            </select>
        </div>
    </div>

    <div class="form-row">
        <div class="char-box">
            <label for="fate-points">Fate Points</label>
            <input id="fate-points" type="number" bind:value={newSheet.fate_points} min="0" />
        </div>

        <div class="char-box">
            <label for="fortitude">Fortitude</label>
            <input id="fortitude" type="number" bind:value={newSheet.fortitude} min="0" />
        </div>
    </div>

    <div class="form-row">
        <div class="char-box">
            <label for="insanity">Insanity</label>
            <input id="insanity" type="number" bind:value={newSheet.insanity} min="0" />
        </div>

        <div class="char-box">
            <label for="corruption">Corruption</label>
            <input id="corruption" type="number" bind:value={newSheet.corruption} min="0" />
        </div>
    </div>

    <div class="form-row">
        <div class="char-box">
            <label for="sanctification">Sanctification</label>
            <input id="sanctification" type="number" bind:value={newSheet.sanctification} min="0" />
        </div>
    </div>

    <button class="send-btn" on:click={save}>Save</button>
</div>


<style>
.form-row {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 16px;
    margin-bottom: 20px;
}

.char-box {
    display: flex;
    flex-direction: column;
}

.char-box label {
    margin-bottom: 6px;
    font-size: 0.85rem;
    color: #ffb86c;
    font-weight: bold;
    letter-spacing: 0.5px;
}

.char-box input,
.char-box select {
    background-color: #222;
    border: 1px solid #444;
    border-radius: 4px;
    padding: 10px 12px;
    color: #e0e0e0;
    font-size: 0.95rem;
    font-family: inherit;
}

.char-box input::placeholder {
    color: #777;
}

.char-box input:focus,
.char-box select:focus {
    outline: none;
    border-color: #50fa7b;
    box-shadow: 0 0 6px rgba(80, 250, 123, 0.4);
}



</style>