<script>
    import { fetchGet } from "../../../util/fetchUtil";
    import toastrDisplayHTTPCode from "../../../util/ToastrUtil";
	import CharectersheetsList from "../lists/charectersheetsList.svelte";
	import BaseModal from "../modal/BaseModal.svelte";
	import {modalStore, openModal, closeModal} from "../../store/modalStore.js"



		async function loadcharectersheets() {
        const response = await fetchGet('charectersheet')
        if (response.status === 200) {
            toastrDisplayHTTPCode(200, response.message)
			openModal("charectersheet", response.data)
        } else {
            toastrDisplayHTTPCode(response.status, response.message)
        }

		console.log("Load character clicked!");
	}

	async function displayPlayers() {
        const response = await fetchGet('/users')
        if (response.status === 200) {
			openModal("players", response.data)
        } else {
            toastrDisplayHTTPCode(response.status, response.message)
        }
	}



</script>

<aside class="sidebar">
  <h2 class="title">Admin Tools</h2>

  <nav>
		<button class="icon-button" on:click={loadcharectersheets}>
			<img alt="character" class="new-load-buttons" />
		</button>

		<button class="icon-button" on:click={displayPlayers}>
			<img alt="players" class="new-load-buttons" />
		</button>

  </nav>
</aside>


<BaseModal show={$modalStore.show} onClose={closeModal}>
	{#if $modalStore.page === "charectersheet"}
		<CharectersheetsList data={$modalStore.data} />
	{:else if $modalStore.page === "players"}

	{/if}
</BaseModal>
