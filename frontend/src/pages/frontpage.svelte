<script>
	import UserCharectersheetList from "../componets/lists/userCharectersheetList.svelte";
	import BaseModal from "../componets/modal/BaseModal.svelte";


    import { navigate } from 'svelte-routing';
    
	let showModal = false;
	let modalPage = null;

	function newCharecter() {
	}

	function loadCharecter() {
		console.log("Load character clicked!");
		modalPage = "load";
		showModal = true;
	}

	function Campaigns() {
		console.log("Campaigns clicked!");
		modalPage = "campaigns";
		showModal = true;
	}

	function closeModal() {
		showModal = false;
		modalPage = null;
	}
</script>

<div class="panel-container">
	<div class="button-row">

		<button class="icon-button" on:click={newCharecter}>
			<img alt="New character" class="new-load-buttons" />
		</button>

		<button class="icon-button" on:click={loadCharecter}>
			<img alt="Load character" class="new-load-buttons" />
		</button>

		<button class="icon-button" on:click={Campaigns}>
			<img alt="Campaigns" class="new-load-buttons" />
		</button>

	</div>
</div>

<BaseModal show={showModal} onClose={closeModal}>
	{#if modalPage === "load"}
		<UserCharectersheetList />
	{:else if modalPage === "campaigns"}

	{/if}
</BaseModal>
