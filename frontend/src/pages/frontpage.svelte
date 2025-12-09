<script>
	import UserCharectersheetList from "../componets/lists/userCharectersheetList.svelte";
	import BaseModal from "../componets/modal/BaseModal.svelte";
    import { fetchGet } from "../../util/fetchUtil";
    import { navigate } from 'svelte-routing';
    import toastrDisplayHTTPCode from "../../util/ToastrUtil";
    import {lockBodyScroll, unlockBodyScroll} from "../../util/scrolling.js"
    import { onDestroy } from 'svelte';
	import {modalStore, openModal, closeModal} from "../store/modalStore.js"

	$: stack = $modalStore
    $:topModal = stack.length ? stack[stack.length -1] : null; 

	function newCharecter() {
	}

	async function loadCharecter() {
        const response = await fetchGet('/users/id/charectersheet')
        if (response.status === 200) {
            toastrDisplayHTTPCode(200, response.message)
			openModal("load", response.data);
        } else {
            toastrDisplayHTTPCode(response.status, response.message)
            navigate("/login")
        }

		console.log("Load character clicked!");
	}

	async function Campaigns() {
		console.log("Campaigns clicked!");
        const response = await fetchGet('/users/id/charectersheet')
        if (response.status === 200) {
			openModal("campaigns", response.data);
        } else {
            toastrDisplayHTTPCode(response.status, response.message)
            navigate("/login")
        }
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

{#if topModal}
<BaseModal show={true} onClose={closeModal}>
	{#if topModal.page === "load"}
		<UserCharectersheetList data={topModal.data} />

		
	{:else if topModal.page === "campaigns"}

	{:else if topModal.page === "newCharacter"}
		<h2>New Character</h2>


	{/if}
</BaseModal>
{/if}