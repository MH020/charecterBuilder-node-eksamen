<script>
    import io from 'socket.io-client';
    import { onMount } from 'svelte';
    

    const BASE_URL = import.meta.env.VITE_BASE_URL || window.location.origin

    let socket;

        onMount(() => {
        socket = io(BASE_URL, {
            withCredentials: true
        });
    });

</script>