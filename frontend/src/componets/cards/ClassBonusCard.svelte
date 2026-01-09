<script>
    import { onMount } from "svelte";
    import { closeModal,modalSelectCallback } from "../../store/modalStore";
    import { fetchGet } from "../../../util/fetchUtil";

    export let classBonuses = {};
    let options = [];
    let selectedOption = null;

    onMount(async () => {
        const response = await fetchGet("/api/characteristics");
        if (response.status === 200) {
            options = response.data;
            console.log(options)
        }
    });


    $: if (selectedOption) {
        classBonuses.characteristic = selectedOption;

    }
</script>

<div class="row">
    <select bind:value={selectedOption}>
    <option value="" disabled selected>Select an characteristic</option>
    {#each options as option}
        <option value={option}>{option.name}</option>
    {/each}
    </select>
    <p>Selected ID: {selectedOption ? selectedOption.name : 'None'}</p>

    <div class="cell-box">
        <div class="label">bonus</div>
        <input bind:value={classBonuses.bonus } />
    </div>

    <div class="buttons">
        <button
            on:click={() => {
                $modalSelectCallback(classBonuses);
                closeModal();
            }}
        >
            select</button
        >
    </div>
</div>
