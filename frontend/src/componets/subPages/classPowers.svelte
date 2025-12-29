<script>
    import PowerCard from "../cards/PowerCard.svelte";
import EditableCardsPages from "../wrappers/editableCardsPages.svelte";

    export let clss;
    const endpoint = `/api/class/${clss.id}/powers`

    $: powers = clss.powers
    const categories = new Map();
    

    $: powers.forEach((p) => {
        const category = p.power.category;

        if (!categories.has(category)) {
            categories.set(category, []);
        }

        categories.get(category).push(p);
    });


    function createPower(){
        const newPower = {
            id: null,
            class_id: clss.id, 
            level: 1, 
            power: {},
            prerequisite_powers: [],
            isNew: true
        }
    }
</script>

{#each Array.from(categories.entries()) as [category, powers]}
    <h3 class="power-section-title">{category.name}</h3>
    <div class="powers-cards">
        <EditableCardsPages
        bind:list={powers}
        endpoint= {endpoint}
        createCard={createPower}
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
    grid-template-columns: repeat(3, 1fr); /* 3 cards per row */
    gap: 5rem; /* space between cards */
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

