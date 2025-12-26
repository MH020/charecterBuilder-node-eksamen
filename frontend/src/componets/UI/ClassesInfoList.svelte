<script>
    export let name = "";
    export let listItems = [];
    console.log("listitems?", listItems)
</script>

<div class="class-overview">
    <div class="cell-box">
        <div class="label">{name}:</div>
        <div class="tags">
            {#each listItems as item}
                <h1>{item.name}</h1>
            {/each}
        </div>
    </div>
</div>
