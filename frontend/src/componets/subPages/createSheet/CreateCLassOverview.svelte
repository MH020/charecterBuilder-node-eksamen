<script>
    import { buildingSheet, selectedLevel, selectedName } from "../../../store/createStore";

    let name = "";
    let level = 1;

    function save() {
        selectedName.set(name);
        selectedLevel.set(level)
        buildingSheet.set(true)
    }

</script>

<div class="create-charecter-page">


    <div class="description-box">
        <h2>Character Creation</h2>

        <p> Though all may serve their Emperor, no two guardsmen are the same. 
            They all bring varying backgrounds, specialties, skills, and, most importantly of all, 
            personalities. This will take you though all the steps in order to make your charecter. 
            For the Emperor!   
        </p>
    </div>

<div class="form-row">

    <div class="char-box">
        <label for="char-name">Name</label>
        <input
            id="char-name"
            type="text"
            bind:value={name}
            placeholder="Enter your name"
        />
    </div>

    <div class="char-box">
        <label for="char-level">Level</label>
        <select
            id="char-level"
            bind:value={level}
        >
            {#each Array(20) as _, i}
                <option value={i + 1}>Level {i + 1}</option>
            {/each}
        </select>
    </div>

</div>


    <button class="send-btn" on:click={save}>
        Save
    </button>

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