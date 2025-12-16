<script>
    import { onMount } from "svelte";
    import { closeModal,modalSelectCallback } from "../../store/modalStore";
    import { fetchGet } from "../../../util/fetchUtil";

    export let lineageBonus = {};
    let options = [];
    let selectedOption = null;

    onMount(async () => {
        const response = await fetchGet("/api/characteristic");
        if (response.status === 200) {
            options = response.data;
        }
    });


    $: if (selectedOption) {
        lineageBonus.characteristic_id = selectedOption.id;
        lineageBonus.characteristic_name = selectedOption.name;
    }
</script>

<div class="row">
    <select bind:value={selectedOption}>
    <option value="" disabled selected>Select an characteristic</option>
    {#each options as option}
        <option value={option.id}>{option.name}</option>
    {/each}
    </select>
    <p>Selected ID: {selectedOption ? selectedOption.name : 'None'}</p>

    <div class="cell-box">
        <div class="label">bonus</div>
        <input bind:value={lineageBonus.bonus } />
    </div>

    <div class="buttons">
        <button
            on:click={() => {
                $modalSelectCallback(lineageBonus);
                closeModal();
            }}
        >
            select</button
        >
    </div>
</div>
