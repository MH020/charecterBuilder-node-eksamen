<script>
    import { onMount } from "svelte";
    import { fetchGet } from "../../../../util/fetchUtil";
    import { SelectedApptitudes, Selectedclass, selectedLineage } from "../../../store/createStore";
    import toastr from "toastr";

    let apptitudesList = [];
    let duplicateSelections = {};

    onMount(async () => {
        const res = await fetchGet("/api/aptitudes");
        if (res.status === 200) {
            apptitudesList = res.data;
        }
    });

    $: currentApptitudes = [
        ...($selectedLineage?.aptitudes ?? []).map(a => ({
            id: a.aptitude_id,
            name: a.aptitude_name
        })),
        ...($Selectedclass?.aptitudes ?? []).map(a => ({
            id: a.aptitude.id,
            name: a.aptitude.name
        }))
    ];

    $: seen = new Set();
    $: displayApptitudes = currentApptitudes.map(a => {
        if (seen.has(a.id)) {
            return { ...a, duplicate: true };
        }
        seen.add(a.id);
        return { ...a, duplicate: false };
    });

    $: availableApptitudes = apptitudesList.filter(
        a => !currentApptitudes.some(c => c.id === a.id)
    );


    function saveApptitudes() {
    const finalApptitudes = displayApptitudes.map((a, index) => {
        if (!a.duplicate) return a;

        const key = a.id + '-' + index;
        const replacementId = duplicateSelections[key];

        if (!replacementId) return a; 

        const replacement = apptitudesList.find(ap => ap.id === Number(replacementId));

        return {
            id: replacement.id,
            name: replacement.name
        };
    }); 
    toastr.success("apptitudes are saved")
    console.log(finalApptitudes)
    SelectedApptitudes.set(finalApptitudes);
}


$: unresolvedDuplicates =
    displayApptitudes.some((a, i) =>
        a.duplicate && !duplicateSelections[a.id + '-' + i]
    );


</script>

<div class="aptitudes-grid">
    {#each displayApptitudes as a, index}
        {#if !a.duplicate}
            <span class="aptitudes-name">{a.name}</span>
        {:else}
            <select bind:value={duplicateSelections[a.id + '-' + index]}>
                <option value="">Select replacement</option>
                {#each availableApptitudes as opt}
                    <option value={opt.id}>{opt.name}</option>
                {/each}
            </select>
        {/if}
    {/each}

    <button
    class="save-btn"
    on:click={saveApptitudes}
    disabled={unresolvedDuplicates}
>
    Save Aptitudes
</button>
</div>


<style>
    .aptitudes-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 12px;
    background: #121416;
    border: 1px solid #2a2e33;
    border-radius: 6px;
}


.aptitudes-name {
    padding: 6px 10px;
    background: #1c1f23;
    border: 1px solid #3a3f45;
    border-radius: 4px;
    color: #ffb86c;
    font-family: monospace;
    font-weight: 600;
    letter-spacing: 0.03em;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.4);
}

.aptitudes-grid select {
    padding: 6px 10px;
    background: #16191d;
    color: #c7d1b8;
    border: 1px solid #4b5320;
    border-radius: 4px;
    font-family: monospace;
    font-weight: 600;
    cursor: pointer;
    min-width: 160px;
    transition: all 0.15s ease;
}

.aptitudes-grid select:hover {
    border-color: #9ba45c;
}

.aptitudes-grid select:focus {
    outline: none;
    border-color: #ffb86c;
    box-shadow: 0 0 0 2px rgba(255, 184, 108, 0.25);
}


.save-btn {
    margin-left: auto;
    padding: 8px 18px;
    background: linear-gradient(180deg, #3f5f3f, #2c402c);
    border: 1px solid #6b8e23;
    border-radius: 4px;
    color: #e6f2c2;
    font-family: monospace;
    font-weight: 700;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: all 0.15s ease;
    text-transform: uppercase;
}

.save-btn:hover:not(:disabled) {
    background: linear-gradient(180deg, #4f774f, #365a36);
    border-color: #9ba45c;
}

.save-btn:active:not(:disabled) {
    transform: translateY(1px);
}


.save-btn:disabled {
    background: #1a1d1a;
    border-color: #2f332f;
    color: #5f665f;
    cursor: not-allowed;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.5);
}
</style>