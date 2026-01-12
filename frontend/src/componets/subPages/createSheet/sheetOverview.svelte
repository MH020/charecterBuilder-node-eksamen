<script>

export let sheet

    $: characteristics = sheet?.characteristics ?? [];


    function bonus(value) {
        return Math.floor((value - 10) / 2);
    }
</script>


    <div class="class-name">
        <h1>{sheet.name}</h1>
    </div>


    <div class="sheet-container">

<div class="sheet-CHARACTERISTICS">
    <h1>CHARACTERISTICS</h1>

    <div class="characteristics-grid">
        {#each characteristics as stat}
            <div class="characteristic-box">
                <div class="stat-name">{stat.name}</div>

                <div class="stat-value">{stat.value}</div>

                <div class="stat-bonus">
                    {bonus(stat.value) >= 0
                        ? `+${bonus(stat.value)}`
                        : bonus(stat.value)}
                </div>
            </div>
        {/each}
    </div>
</div>

    </div>