<script>
    import { onMount } from "svelte";
    import {
        fetchDelete,
        fetchGet,
        fetchPost,
        fetchUpdate,
    } from "../../../util/fetchUtil";
    import toastrDisplayHTTPCode from "../../../util/ToastrUtil";
    import SubclassCards from "../cards/SubclassCards.svelte";

    export let clss;
    let endpoint = `/api/classes/${clss.id}/subclasses`;
    let subclasses = [];

    onMount(async () => {
        const response = await fetchGet(endpoint);
        if (response.status === 200) {
            subclasses = response.data;
        }
    });

    function createClassSubclasses() {
        const newSubclass = {
            id: null,  
            name: "",  
            description: "",
            parent: {
                id: clss.id
            },
            isNew: true
        };
        subclasses = [...subclasses, newSubclass];
    }

    async function onDelete(id, deleteID, isNew) {
        if (isNew) {
            subclasses = subclasses.filter((s) => s.id !== id);
        } else {
            const response = await fetchDelete(endpoint, deleteID);
            toastrDisplayHTTPCode(response.status, response.message);
            if (response.status === 200) {
                subclasses = subclasses.filter((item) => item.id !== id);
            }
            return subclasses;
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

        subclasses = subclasses.map((item) =>
            item.isNew
                ? { ...saved, isNew: false }
                : item.id === saved.id
                  ? { ...item, ...saved }
                  : item,
        );
    }
</script>

<div class="class-subclasses">
    <button on:click={createClassSubclasses }>New subclass</button>

    <div class="talents-cards">
        {#each subclasses as card (card.id ?? card)}
            <SubclassCards subclass={card} {onSave} {onDelete} />
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
