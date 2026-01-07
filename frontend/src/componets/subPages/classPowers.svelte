<script>
    import PowerCard from "../cards/PowerCard.svelte";
import EditableCardsPages from "../wrappers/editableCardsPages.svelte";

    export let clss;
    const endpoint = `/api/class/${clss.id}/powers`


    $: powers = clss.powers


    const new_category = { name: "new powers", isNew: true };

    $: categories = (() => {
        const map = new Map();

        for (const p of powers) {
            const cat = p.power.category ?? new_category;

            if (!map.has(cat.name)) {
                map.set(cat.name, {
                    ...cat,
                    powers: []
                });
            }

            map.get(cat.name).powers.push(p);
        }

        if (!map.has(new_category.name)) {
            map.set(new_category.name, {
                ...new_category,
                powers: []
            });
        }

        return [...map.values()];
    })();

    

    

    function createPower(){
        const newPower = {
            id: null,
            class_id: clss.id, 
            level: 1, 
            power: {
                category: new_category, 
            },
            prerequisite_powers: [],
            isNew: true
        }
        clss.powers = [...clss.powers, newPower];
        console.log(clss.powers)
    }


</script>


{#each categories as category }

    <h3 class="power-section-title">{category.name}</h3>


    {#if category.isNew}
    <button on:click={createPower}>New Card</button>
    {/if}


    <div class="powers-cards">
        <EditableCardsPages
        list={category.powers}
        endpoint= {endpoint}
        let:item
        let:onSave
        let:onDelete
        >
        <PowerCard
        PowerElement = {item}
        onSave={onSave}
        onDelete={onDelete}
        endpoint={endpoint}
        />

        </EditableCardsPages>
</div>
{/each}


<style>
.powers-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 5rem; 
}

.power-section-title {
    margin: 3rem 0 1.5rem;
    padding-bottom: 0.5rem;

    font-family: 'Courier New', monospace;
    font-size: 1.4rem;
    font-weight: bold;
    letter-spacing: 0.08em;
    text-transform: uppercase;

    color: var(--color-accent);

    border-bottom: 2px solid var(--color-accent-dark);
    position: relative;
}

</style>

