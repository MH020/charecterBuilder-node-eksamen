<script>
	import UserCharectersheetList from "../componets/lists/userCharectersheetList.svelte";
	import BaseModal from "../componets/modal/BaseModal.svelte";
    import { fetchGet } from "../../util/fetchUtil";
    import { navigate } from 'svelte-routing';
    import toastrDisplayHTTPCode from "../../util/ToastrUtil";
    import {lockBodyScroll, unlockBodyScroll} from "../../util/scrolling.js"
    import { onDestroy } from 'svelte';

	let showModal = false;
	let modalPage = null;
    let data = null; 


    $: if (showModal) {
        lockBodyScroll();
    } else {
        unlockBodyScroll();
    }

    onDestroy(() => {
        unlockBodyScroll(); 
    });

	function newCharecter() {
	}

	async function loadCharecter() {
        const response = await fetchGet('/users/id/charectersheet')
        if (response.status === 200) {
            toastrDisplayHTTPCode(200, response.message)
            data = response.data
            modalPage = "load";
			showModal = true;
        } else {
            toastrDisplayHTTPCode(response.status, response.message)
            navigate("/login")
        }

		console.log("Load character clicked!");
	}

	async function Campaigns() {
		console.log("Campaigns clicked!");
		modalPage = "campaigns";
        const response = await fetchGet('/users/id/charectersheet')
        if (response.status === 200) {
            data = response.data
            modalPage = "campaigns";
			showModal = true;
        } else {
            toastrDisplayHTTPCode(response.status, response.message)
            navigate("/login")
        }
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
