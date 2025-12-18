<script>
    import io from 'socket.io-client';
    import { onDestroy, onMount } from 'svelte';
    

    const BASE_URL = import.meta.env.VITE_BASE_URL || window.location.origin

    let socket;
    let entries = []
    let logEntry
    let logEntryMessage = '';

        onMount(() => {
        socket = io(BASE_URL, {
            withCredentials: true
        });

        socket.on("log:entry", (event) => {
            entries = [...entries, event];
        })
    });

        onDestroy(() => {
        socket?.disconnect();
    });


    function submitEvent() {
        if (!logEntryMessage.trim()) return;

        const newLogEntry = {
            id: entries.length + 1,
            message: logEntryMessage,
            crit: false
        };

        socket.emit('log:entry', newLogEntry);
        logEntryMessage = '';
    }

</script>

<div class="log" bind:this={logEntry}>
    {#each entries as entry (entry.id)}
        <div class="entry {entry.crit ? 'crit' : ''}">
            {(entry.message)}
        </div>
    {/each}
</div>

<input type="text" bind:value={logEntryMessage} placeholder="Type your message..." />
<button on:click={submitEvent}>Send</button>


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