<script>
    import { fetchGet, fetchModal } from "../../../util/fetchUtil";
    import toastrDisplayHTTPCode from "../../../util/ToastrUtil";
	import CharectersheetsList from "../lists/charectersheetsList.svelte";
	import BaseModal from "../modal/BaseModal.svelte";
	import {modalStore, openModal, closeModal} from "../../store/modalStore.js"



	async function loadcharectersheets() {
		fetchModal("/charectersheet", "charectersheet");
	}

    function displayPlayers() {
        fetchModal("/users", "players");
    }



</script>

<aside class="sidebar">
  <h2 class="title">Admin Tools</h2>

  <nav>
		<button class="icon-button" on:click={loadcharectersheets}>
			<img alt="charactersheets" class="sidebar-button" />
		</button>

		<button class="icon-button" on:click={displayPlayers}>
			<img alt="players" class="sidebar-button" />
		</button>

  </nav>
</aside>


<BaseModal show={$modalStore.show} onClose={closeModal}>
	{#if $modalStore.page === "charectersheet"}
		<CharectersheetsList data={$modalStore.data} />
	{:else if $modalStore.page === "players"}

	{/if}
</BaseModal>
