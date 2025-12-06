<script>

    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';
    import { fetchGet } from '../../../util/fetchUtil';

    let charectersheetList = [];
    let uniqueClasses;
    let selectedClass = "all"; 
    let filteredSheets = [];
    let selectedSort = "recent";


    onMount(async () => {
        const response = await fetchGet('/users/id/charectersheet')
        if (response.status === 200) {
            charectersheetList = await response.data
            uniqueClasses = new Set(charectersheetList.map(sheet => sheet.class))
        }
    });


    $: {
        let classSheets = selectedClass === "all" ? charectersheetList : charectersheetList.filter(sheet => sheet.class === selectedClass);

        if(selectedSort === "recent"){
            filteredSheets = [...classSheets].sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime());
        } else {
            filteredSheets = Array.from([...classSheets].sort((a, b) =>  new Date(a.updated).getTime() - new Date(b.updated).getTime()));
        }
    }

</script>


<div>
    <label>
        Class:
        <select bind:value={selectedClass}>
            <option value="all">All Classes</option>
            {#each uniqueClasses as className}
                <option value={className}>{className}</option>
            {/each}
        </select>
    </label>

    <label>
        Sort:
        <select bind:value={selectedSort}>
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest</option>
        </select>
    </label>
</div>

<div class="sheet-list">
    {#each filteredSheets as sheet}
        <div class="sheet-card">
            <h3>{sheet.name}</h3>
            <p>Class: {sheet.class}</p>
            <p>Level: {sheet.level}</p>
            <p>Updated: {sheet.updated}</p>
        </div>
    {/each}

    {#if filteredSheets.length === 0}
        <p>No sheets for this class.</p>
    {/if}
</div>