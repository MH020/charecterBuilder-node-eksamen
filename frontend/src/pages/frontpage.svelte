<script>
	import UserCharectersheetList from "../componets/lists/userCharectersheetList.svelte";
	import BaseModal from "../componets/modal/BaseModal.svelte";
    import { fetchGet } from "../../util/fetchUtil";
    import redirectAfterlogin from "../store/redirect";
    import { navigate } from 'svelte-routing';

	let showModal = false;
	let modalPage = null;
    let data = null; 
	function newCharecter() {
	}

	async function loadCharecter() {
        const response = await fetchGet('/users/id/charectersheet')
        if (response.status === 200) {
            data = response.data
            modalPage = "load";
			showModal = true;
        } else {
            navigate("/login")
        }

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
		<UserCharectersheetList data={data} />
	{:else if modalPage === "campaigns"}

	{/if}
</BaseModal>
