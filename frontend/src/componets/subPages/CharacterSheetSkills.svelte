<script>
    import toastr from "toastr";
    import { fetchUpdate } from "../../../util/fetchUtil";
    import DescriptionUtil from "../UI/DescriptionUtil.svelte";


    export let charactersheetId;
    export let skills = [];
    export let characterLevel = 1;

    const trainingLevels = ["U", "T", "E", "M", "L"];
    const levelValue = { U: 0, T: 2, E: 4, M: 6, L: 8 };

    let editable = [];

    $: if (skills?.length) {
        editable = skills.map(s => ({
            id: s.id, 
            name: s.skill.name,
            description: s.skill.description,
            main: s.skill.main_aptitude?.name,
            secondary: s.skill.secondary_aptitude?.name,
            training_level: s.training_level ?? 0,
            talent_bonus: s.talent_bonus ?? 0
        }));
    }

    function cycleTraining(index) {
        editable[index].training_level =
            (editable[index].training_level + 1) % trainingLevels.length;

        editable = [...editable];
    }

    function calcBonus(skill) {
        const levelName = trainingLevels[skill.training_level];
        if (levelName === "U") return skill.talent_bonus;

        return (
            characterLevel +
            levelValue[levelName] +
            skill.talent_bonus
        );
    }

    async function saveSkills() {
        const payload = editable.map(s => ({
            id: s.id,
            training_level: s.training_level,
            talent_bonus: s.talent_bonus
        }));

        const response = await fetchUpdate(
            `/api/charectersheets/${charactersheetId}/skills`,
            payload
        );

        if (response.status === 200) {
            toastr.success("Skills updated");
        } else {
            toastr.error("Failed to update skills");
        }
    }
</script>

<div class="skills-grid">
    {#each editable as skill, i (skill.id)}
        <div class="skill-row">
            <div class="skill-info">
                <DescriptionUtil item={skill} />
                <span>Main: {skill.main || "—"}</span>
                <span>Secondary: {skill.secondary || "—"}</span>
            </div>

            <div class="talent-bonus-input">
                <label>Talent</label>
                <input
                    type="number"
                    min="0"
                    bind:value={skill.talent_bonus}
                />
            </div>

            <div class="training-boxes">
                <button
                    class="training-level"
                    on:click={() => cycleTraining(i)}
                >
                    {trainingLevels[skill.training_level]}
                </button>

                <div class="bonus-box">
                    +{calcBonus(skill)}
                </div>
            </div>
        </div>
    {/each}

    <button class="send-btn" on:click={saveSkills}>
        Save Skills
    </button>
</div>

<style>
    .skills-grid {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .skill-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #1a1a1a;
        border: 1px solid #333;
        border-radius: 6px;
        padding: 10px 12px;
    }

    .training-boxes {
        display: flex;
        gap: 8px;
        align-items: center;
    }

    .training-level {
        width: 40px;
        height: 40px;
        background-color: #222;
        border: 1px solid #444;
        border-radius: 6px;
        color: #c0c0c0;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .training-level:hover {
        border-color: #ffb86c;
        background-color: #333;
    }

    .bonus-box {
        width: 40px;
        height: 40px;
        background-color: #50fa7b;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: #121212;
    }

    .talent-bonus-input {
        margin-bottom: 12px;
        display: flex;
        gap: 8px;
        align-items: center;
        color: #c0c0c0;
    }
    .talent-bonus-input input {
        width: 60px;
        padding: 4px 6px;
        border-radius: 4px;
        border: 1px solid #444;
        background-color: #222;
        color: #c0c0c0;
    }
</style>