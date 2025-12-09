<script>
    import {modalStore, closeModal} from '../../store/modalStore.js'
    $: stack = $modalStore
    $:topModal = stack.length ? stack[stack.length -1] : null; 
    export let show = false;
    export let onClose = () => {};
</script>

{#if show}
<div class="modal-overlay">
    <div class="modal-box">
        <button class="close-button" on:click={onClose}>X</button>
        <slot></slot>
    </div>
</div>
{/if}

<style>

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8); 
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}


.modal-box {
    background: #1b1b1b; 
    color: #e0e0e0;
    padding: 2rem;
    border-radius: 6px;
    position: relative;
    min-width: 500px;
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;
    font-family: 'Courier New', monospace;
    box-shadow: 0 8px 16px rgba(0,0,0,0.9);
    border: 1px solid #444;
}


.close-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: none;
    border: 1px solid #666;
    color: #f8f8f2;
    font-size: 1.5rem;
    cursor: pointer;
    border-radius: 3px;
    padding: 2px 6px;
    transition: all 0.2s;
}

.close-button:hover {
    background-color: #333;
    border-color: #888;
    color: #ff6e6e; 
}


.modal-box::-webkit-scrollbar {
    width: 8px;
}

.modal-box::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 4px;
}

.modal-box::-webkit-scrollbar-track {
    background: #222;
    border-radius: 4px;
}
</style>
