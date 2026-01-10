<script>
  export let item;
  let showToolTip = false;

  function show() {
    showToolTip = true;
  }
  function hide() {
    showToolTip = false;
  }
</script>

<span
  class="tag-with-tooltip"
  role="button"
  tabindex="0"
  aria-describedby="tooltip-description"
  on:mouseenter={show}
  on:mouseleave={hide}
  on:focus={show}
  on:blur={hide}
>
  {item.name}

  {#if showToolTip}
    <div id="tooltip-description" role="tooltip" class="tooltip">
      {item.description}
    </div>
  {/if}
</span>


<style>
    .tag-with-tooltip {
    position: relative;
    color: var(--color-accent);
    cursor: pointer;
}

.tag-with-tooltip .tooltip {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 120%;
    background-color: #111;
    color: var(--color-text);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.85rem;
    white-space: pre-wrap;
    z-index: 10;
    min-width: 180px;
    max-width: 250px;
    box-shadow: 0 0 12px rgba(0,0,0,0.8);
}
</style>
