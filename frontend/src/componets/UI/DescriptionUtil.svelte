        <script>
            export let item
            let showTooltip
        </script>
        
        <button
            class="description-btn"
            on:mouseenter={() => (showTooltip = true)}
            on:mouseleave={() => (showTooltip = false)}
            aria-describedby="tooltip-description"
        >
            description
        </button>

        {#if showTooltip}
            <div id="tooltip-description" role="tooltip" class="tooltip">
                {item.description}
            </div>
        {/if}