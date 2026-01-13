

<script>
    import { onMount } from "svelte";
    import { fetchGet } from "../../../util/fetchUtil";
    import WeaponsCard from "../cards/weaponsCard.svelte";
    import CombatLogWindow from "../windows/CombatLogWindow.svelte";

    let weapons = [];
    let logEntryMessage = ""
    let combatLog;

    export let player; 

    const endpoint = "/api/weapons"

    onMount(async () => {
        const response = await fetchGet(endpoint)
        if (response.status === 200) {
            weapons = response.data
        } 
    });

    function shootEvent({ weapon, roundsFired, clipBefore, clipAfter, ammoRemaining }) {
    let message = `${player.name} fires their ${weapon.name}`;

    message += ` (${roundsFired} round${roundsFired > 1 ? "s" : ""}).`;
    message += ` Clip: ${clipAfter}/${clipBefore}.`;

    if (clipAfter === 0) {
        message += ` **CLICK!** Weapon is empty.`;
    }

    combatLog.postLog(message);
    }


</script>

<CombatLogWindow bind:this={combatLog} />

{#each weapons as weapon}
    <WeaponsCard  
    weapon = {weapon}
    shootEvent = {shootEvent}/>
{/each}