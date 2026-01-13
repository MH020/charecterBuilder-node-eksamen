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

        socket.on("log:entry", (event) => {
            entries = [...entries, event];
        })
    });

        onDestroy(() => {
        socket?.disconnect();
    });


    export function postLog(message, { crit = false, type = "combat" } = {}) {
    const newLogEntry = {
        id: entries.length + 1,
        message,
        crit,
        type,
        time: new Date().toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        })
    };

    socket.emit("log:entry", newLogEntry);
}

</script>

<div class="log" bind:this={logEntry}>
    <div class="log-header">
        COMBAT LOG 
    </div>

    {#each entries as entry (entry.id)}
        <div class="entry {entry.type} {entry.crit ? 'crit' : ''}">
            <span class="timestamp">[{entry.time}]</span>
            <span class="message">{entry.message}</span>
        </div>
    {/each}
</div>



<style>
.log {
    height: 300px;
    overflow-y: auto;
    background: linear-gradient(#0e0e0e, #111);
    color: #cfcfcf;
    font-family: 'Courier New', monospace;
    border: 2px solid #2a2a2a;
    box-shadow: inset 0 0 25px rgba(0,0,0,0.8);
}

.log-header {
    position: sticky;
    top: 0;
    background: #151515;
    padding: 6px 8px;
    border-bottom: 2px solid #333;
    color: var(--color-accent);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 0.75rem;
    z-index: 1;
}

.entry {
    display: flex;
    gap: 8px;
    padding: 4px 8px;
    border-bottom: 1px dashed #222;
    animation: feedIn 0.25s ease-out;
}

.timestamp {
    color: #777;
    min-width: 72px;
    font-size: 0.75rem;
}

.message {
    flex: 1;
    line-height: 1.3;
}


.entry.system {
    color: #888;
    font-style: italic;
}

.entry.combat {
    color: #ddd;
}

.entry.damage {
    color: #ffb347;
}

.entry.crit {
    color: #ff5555;
    font-weight: bold;
    text-shadow: 0 0 6px rgba(255,85,85,0.5);
}

.log::-webkit-scrollbar {
    width: 6px;
}
.log::-webkit-scrollbar-thumb {
    background: #333;
}
.log::-webkit-scrollbar-track {
    background: #111;
}

/* ENTRY ANIMATION */
@keyframes feedIn {
    from {
        opacity: 0;
        transform: translateY(4px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>