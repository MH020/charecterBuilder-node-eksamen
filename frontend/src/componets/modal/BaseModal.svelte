<script>
    export let show = false;
    export let onClose = () => {};
</script>

{#if show}
<div class="modal-overlay">
        <button class="close-button" on:click={onClose}>✕</button>
        <slot>

        </slot> 
</div>
{/if}

<style>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #fff;
}
</style>
