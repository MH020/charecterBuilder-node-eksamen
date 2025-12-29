<script>
    import TalentCard from "../cards/ClassTalentCard.svelte";

    export let clss 

    $: talents = clss.talents
</script>

    <div class="class-talents">
            <div class="talents-cards">
                {#each talents as thisTalent}
                    <TalentCard Talent = {thisTalent} />
                {/each}
            </div>
    </div>

<style>
.talents-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 cards per row */
    gap: 5rem; /* space between cards */
}
</style>

