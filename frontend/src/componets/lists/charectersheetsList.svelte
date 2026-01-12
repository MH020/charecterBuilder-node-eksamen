<script>
    import { onMount } from "svelte";
    import { fetchDelete, fetchGet } from "../../../util/fetchUtil";
    import SheetCard from "../cards/SheetCard.svelte"
    import toastrDisplayHTTPCode from "../../../util/ToastrUtil";
    import { refresh } from "../../store/userStore";



    let sheets = [];
    let endpoint = "/api/charectersheets"

    onMount(async () => {
        refresh()
        const response = await fetchGet(endpoint);
        console.log(response)
        if (response.status === 200) {
            sheets = response.data;
        }
    });


    async function onDelete(id) {
        const response = await fetchDelete(endpoint, id);

        toastrDisplayHTTPCode(response.status, response.message);

        if (response.status === 200) {
            sheets = sheets.filter(sheet => sheet.id !== id);
        }
    }
    

</script>

{#each sheets as sheet (sheet.id)}
    <SheetCard
    sheet = {sheet} 
    onDelete = {onDelete}
    />
{/each}

