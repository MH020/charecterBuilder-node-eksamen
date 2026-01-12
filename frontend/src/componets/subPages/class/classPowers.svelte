<script>
    import { fetchDelete, fetchPost, fetchUpdate } from "../../../../util/fetchUtil";
    import toastrDisplayHTTPCode from "../../../../util/ToastrUtil";
    import { user } from "../../../store/userStore";
    import PowerCard from "../../cards/PowerCard.svelte";



    export let clss;

    $: canEdit = $user.role === 'ADMIN' || $user.role === 'OWNER'

    const endpoint = `/api/class/${clss.id}/powers`;

    $: powers = clss.powers;

    const new_category = { name: "new powers", isNew: true };

    $: categories = (() => {
        const map = new Map();

        for (const p of powers) {
            const cat = p.power.category ?? new_category;

            if (!map.has(cat.name)) {
                map.set(cat.name, {
                    ...cat,
                    powers: [],
                });
            }

            map.get(cat.name).powers.push(p);
        }

        if (!map.has(new_category.name)) {
            map.set(new_category.name, {
                ...new_category,
                powers: [],
            });
        }

        return [...map.values()];
    })();

    function createPower() {
        const newPower = {
            id: null,
            class_id: clss.id,
            level: 1,
            power: {
                category: new_category,
            },
            prerequisite_powers: [],
            isNew: true,
        };
        clss.powers = [...clss.powers, newPower];
        console.log(clss.powers);
    }

    async function onDelete(id, deleteID, isNew) {
        if (isNew) {
            clss.powers = clss.powers.filter((p) => p.id !== id);
        } else {
            const response = await fetchDelete(endpoint, deleteID);
            toastrDisplayHTTPCode(response.status, response.message);
            if (response.status === 200) {
                clss.powers = clss.powers.filter((item) => item.id !== id);
            }
            return clss.powers;
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

        clss.powers = clss.powers.map((item) =>
            item.isNew
                ? { ...saved, isNew: false }
                : item.id === saved.id
                  ? { ...item, ...saved }
                  : item,
        );
    }
</script>

{#each categories as category}
    <h3 class="power-section-title">{category.name}</h3>

    {#if category.isNew}
        {#if canEdit}
        <button on:click={createPower}>New Card</button>
        {/if}
    {/if}

    {#each category.powers as card (card.id)}
        <div class="powers-cards">
            <PowerCard PowerElement={card} {onSave} {onDelete} />
        </div>
    {/each}
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

        font-family: "Courier New", monospace;
        font-size: 1.4rem;
        font-weight: bold;
        letter-spacing: 0.08em;
        text-transform: uppercase;

        color: var(--color-accent);

        border-bottom: 2px solid var(--color-accent-dark);
        position: relative;
    }
</style>
