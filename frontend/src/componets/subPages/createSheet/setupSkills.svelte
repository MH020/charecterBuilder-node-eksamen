<script>
    import { onMount } from "svelte";
    import DescriptionUtil from "../../UI/DescriptionUtil.svelte";
    import {
    createdSheet,
        postSheet,
        Selectedcharacteristics,
        selectedLevel,
        selectedSkills,
    } from "../../../store/createStore";
    import { fetchGet } from "../../../../util/fetchUtil";
    import toastr from "toastr";

    const trainingLevels = ["U", "T", "E", "M", "L"];
    const levelValue = { U: 0, T: 2, E: 4, M: 6, L: 8 };
    const levelRequirements = { U: 0, T: 0, E: 7, M: 15, L: 15 };
    let skills = [];

    let totalSelected = 0;

    $: intelligenceBonus = Array.isArray($Selectedcharacteristics)
        ? ($Selectedcharacteristics.find((c) => c.name === "Intelligence")
              ?.bonus ?? 0)
        : 0;

    $: selectable =
        4 + Math.ceil(($selectedLevel ?? 0) / 2) + intelligenceBonus;

    $: totalSelected = skills.reduce(
        (sum, skill) => sum + (skill.training_level || 0),
        0,
    );
    $: remainingSelectable = selectable - totalSelected;

    onMount(async () => {
        const skillResponse = await fetchGet("/api/skills");

        if (skillResponse.status === 200) {
            skills = skillResponse.data;
            skills = skillResponse.data.map((skill) => ({
                ...skill,
                training_level: 0,
            }));
        }
    });

    function cycleTraining(skill) {
        const current = skill.training_level ?? 0;
        const next = (current + 1) % trainingLevels.length;
        const nextLevelName = trainingLevels[next];
        const costDifference = next - current;

        if (costDifference > remainingSelectable) {
            skills = skills.map((s) =>
                s.id === skill.id ? { ...s, training_level: 0 } : s,
            );
            return;
        }

        if (($selectedLevel ?? 0) < (levelRequirements[nextLevelName] ?? 0)) {
            skills = skills.map((skill) =>
                skill.id === skill.id
                    ? { ...skill, training_level: 0, talent_bonus: 0 }
                    : skill,
            );
            return;
        }

        skills = skills.map((s) =>
            s.id === skill.id ? { ...s, training_level: next } : s,
        );
    }

    function getBonus(skill) {
        const levelIndex = skill.training_level ?? 0;
        const levelName = trainingLevels[levelIndex];

        if (levelName === "U") return 0 + Number(skill.talent_bonus || 0);

        return (
            ($selectedLevel ?? 0) +
            levelValue[levelName] +
            Number(skill.talent_bonus || 0)
        );
    }

    function sendToStore() {
        selectedSkills.set(skills);
        toastr.success("skills added");
    }

</script>

<div class="selection-counter">
    Remaining selections: <strong>{remainingSelectable}</strong> / {selectable}
</div>

<div class="skills-grid">
    <button class="send-btn" on:click={sendToStore}>
        Save skills
    </button>

    {#if $createdSheet !== null}
        <button class="send-btn" on:click={postSheet}>
        Save sheet 
        </button>
    {/if}
            <button class="send-btn" on:click={postSheet}>
        Save sheet 
        </button>

    {#each skills as skill}
        <div class="skill-row">
            <div class="skill-info">
                <DescriptionUtil item={skill} />
                <span>Main: {skill.main_aptitude?.name || "----"}</span>
                <span
                    >Secondary: {skill.secondary_aptitude?.name || "----"}</span
                >
            </div>

            <div class="talent-bonus-input">
                <label for="talent-{skill.id}">Talent Bonus:</label>
                <input
                    id="talent-{skill.id}"
                    type="number"
                    bind:value={skill.talent_bonus}
                    min="0"
                    step="1"
                />
            </div>

            <div class="training-boxes">
                <button
                    type="button"
                    class="training-level"
                    on:click={() => cycleTraining(skill)}
                    aria-label="Set {skill.name} training level"
                >
                    {trainingLevels[skill.training_level]}
                </button>

                <div class="bonus-box">
                    +{getBonus(skill)}
                </div>
            </div>
        </div>
    {/each}
</div>

<style>
    .skills-grid {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .selection-counter {
        margin-bottom: 8px;
        color: #c0c0c0;
        font-weight: bold;
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
