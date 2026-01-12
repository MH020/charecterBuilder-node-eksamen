<script>
    import {
        fetchDelete,
        fetchPost,
        fetchUpdate,
    } from "../../../../util/fetchUtil";
    import toastrDisplayHTTPCode from "../../../../util/ToastrUtil";
    import ClassTalentCard from "../../cards/ClassTalentCard.svelte";

    export let clss;
    const endpoint = "booo"

    $: talents = clss.talents;
        console.log(clss)

    function createClassTalent() {
        const newClassTalent = {
            class_id: clss.id, 
            id: null,
            level: 1,
            talent: {
                id: null,
                name: "",
                description: "",
                type: "",
                asi: false,
                prerequisite_talent: {},
                required_race: {},
                required_lineage: {},
                aptitudes: [],
                isNew: true,
            },
            isNew: true,
        };
        clss.talents = [...talents, newClassTalent];
    }

    async function onDelete(id, deleteID, isNew) {
        if (isNew) {
            clss.talents = clss.talents.filter((p) => p.id !== id);
        } else {
            const response = await fetchDelete(endpoint, deleteID);
            toastrDisplayHTTPCode(response.status, response.message);
            if (response.status === 200) {
                clss.talents = clss.talents.filter((item) => item.id !== id);
            }
            return clss.talents;
        }
    }

    async function onSave(updated) {
        let saved;

        if (updated.isNew) {
            const response = await fetchPost(endpoint, updated);
            if (response.status === 201) {
                saved = response.created;
            } else {
                return;
            }
        } else {
            const response = await fetchUpdate(endpoint, updated);
            if (response.status === 200) {
                saved = updated;
            } else {
                return;
            }
        }

        clss.talents = clss.talents.map((item) =>
            item.isNew
                ? { ...saved, isNew: false }
                : item.id === saved.id
                  ? { ...item, ...saved }
                  : item,
        );
    }
</script>

<div class="class-talents">

    <button on:click={createClassTalent}>New Card</button>


    <div class="talents-cards">
        {#each talents as card}
            <ClassTalentCard classTalent={card} {onSave} {onDelete} />
        {/each}
    </div>
</div>

<style>
.talents-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 5rem; 
}



</style>
