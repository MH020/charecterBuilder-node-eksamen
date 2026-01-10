<script>
    import { onMount } from "svelte";
    import { fetchGet } from "../../../../util/fetchUtil";


        export let endpoint
        export let card
        let items = null; 


        onMount(async () => {
        const response = await fetchGet(endpoint);
        if (response.status === 200 ) {
            items = response.data;
            console.log(items)
        }
    });
</script>


{#if items !== null}
{#each items as item}
    <svelte:component this={card} item={item} />
{/each}

{:else}

<h1>loading ....</h1>
    
{/if}
