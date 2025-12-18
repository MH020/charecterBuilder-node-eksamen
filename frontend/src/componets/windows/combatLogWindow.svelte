<script>
    import io from 'socket.io-client';
    import { onDestroy, onMount } from 'svelte';
    

    const BASE_URL = import.meta.env.VITE_BASE_URL || window.location.origin

    let socket;
    let entries = []
    let logEntry

        onMount(() => {
        socket = io(BASE_URL, {
            withCredentials: true
        });

        socket.on("combat:event", (event) => {
            entries = [...entries, event];
        })
    });

        onDestroy(() => {
        socket?.disconnect();
    });

    function SubmitEvent(){
        const NewlogEntry = {id: entries.length + 1, message: ``}
    }

</script>

<div class="log" bind:this={logEntry}>
    {#each entries as entry (entry.id)}
        <div class="entry {entry.crit ? 'crit' : ''}">
            {(entry.message)}
        </div>
    {/each}
</div>


<style>
    .log {
        height: 300px;
        overflow-y: auto;
        background: #111;
        color: #ddd;
        font-family: monospace;
        padding: 8px;
        border: 1px solid #333;
    }

    .entry {
        padding: 2px 0;
    }

    .crit {
        color: #ff5555;
    }
</style>