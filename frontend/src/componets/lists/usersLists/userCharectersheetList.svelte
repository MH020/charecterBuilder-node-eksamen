<script>

    import { onMount } from 'svelte';

    export let data;
    let charectersheetList = [];
    let uniqueClasses;
    let selectedClass = "all"; 
    let filteredSheets = [];
    let selectedSort = "recent";


    onMount(async () => {
            charectersheetList = data
            uniqueClasses = new Set(charectersheetList.map(sheet => sheet.class))
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
        <p>currently you dont have any sheets</p>
    {/if}
</div>


<style>
    
div > label {
    display: inline-block;
    margin-right: 1.5rem;
    font-weight: bold;
    font-family: sans-serif;
}

select {
    margin-left: 0.5rem;
    padding: 0.3rem 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 0.95rem;
}


.sheet-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
}


.sheet-card {
    background-color: #fff;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.sheet-card h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    color: #333;
}

.sheet-card p {
    margin: 0.3rem 0;
    font-size: 0.9rem;
    color: #555;
}

.sheet-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.sheet-list p {
    grid-column: 1 / -1;
    font-style: italic;
    color: #888;
    text-align: center;
}

div {
    margin-bottom: 1rem;
}
</style>
