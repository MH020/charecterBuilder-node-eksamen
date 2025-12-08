<script>
    import { navigate } from "svelte-routing";
    import { fetchGet } from "../../../util/fetchUtil";
    import toastrDisplayHTTPCode from "../../../util/ToastrUtil";
	import CharectersheetsList from "../lists/charectersheetsList.svelte";
	import BaseModal from "../modal/BaseModal.svelte";



	let showModal = false;
	let modalPage = null;
    let data = null; 



		async function loadcharectersheets() {
        const response = await fetchGet('charectersheet')
        if (response.status === 200) {
            toastrDisplayHTTPCode(200, response.message)
            data = response.data
            modalPage = "charectersheet";
			showModal = true;
        } else {
            toastrDisplayHTTPCode(response.status, response.message)
        }

		console.log("Load character clicked!");
	}

	async function displayPlayers() {
        const response = await fetchGet('/users')
        if (response.status === 200) {
            data = response.data
            modalPage = "players";
			showModal = true;
        } else {
            toastrDisplayHTTPCode(response.status, response.message)
        }
	}

	function closeModal() {
		showModal = false;
		modalPage = null;
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


<BaseModal show={showModal} onClose={closeModal}>
	{#if modalPage === "charectersheet"}
		<CharectersheetsList data={data} />
	{:else if modalPage === "players"}

	{/if}
</BaseModal>
