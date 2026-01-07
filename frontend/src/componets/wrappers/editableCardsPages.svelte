<script>
    import { deleteEntity } from "../../../util/ListUtil";
    export let list = [];
    export let endpoint;


    async function onDelete(id, isNew) {
        if (isNew) {
            list = list.filter(item => item.id !== id);
        } else {
            list = await deleteEntity(id, endpoint, list);
        }
    }

function onSave(updated) {
    list = list.map(item =>
        item.isNew
            ? { ...updated, isNew: false }
            : item.id === updated.id
            ? { ...item, ...updated }
            : item
    );

}
</script>


{#each list as card (card.id)}
    <slot
        item={card}
        onSave={onSave}
        onDelete={onDelete}
    />
{/each}


