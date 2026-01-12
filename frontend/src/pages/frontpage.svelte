<script>
	import UserCharectersheetList from "../componets/lists/userCharectersheetList.svelte";
	import BaseModal from "../componets/modal/BaseModal.svelte";
    import { fetchGet } from "../../util/fetchUtil";
    import { navigate } from 'svelte-routing';
    import toastrDisplayHTTPCode from "../../util/ToastrUtil";
	import {modalStore, openModal, closeModal} from "../store/modalStore.js"
    import CombatLogWindow from "../componets/windows/combatLogWindow.svelte";


	function newCharecter() {
		navigate("/newSheet")
	}

	async function loadCharecter() {
        const response = await fetchGet('/users/charectersheets')
        if (response.status === 200) {


        } else {

            navigate("/login")
        }

		console.log("Load character clicked!");
	}


</script>

<div class="panel-container">
  <div class="button-row">
	<button
        on:click={() => {navigate("/newSheet")}}>
        Create new character
	</button>

	<button
        on:click={() => {loadCharecter}}>
        load characters
	</button>


    <CombatLogWindow />

  </div>
</div>

