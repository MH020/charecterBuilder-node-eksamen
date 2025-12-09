<script>
    import { fetchGet, fetchModal } from "../../../util/fetchUtil";
    import toastrDisplayHTTPCode from "../../../util/ToastrUtil";
	import BaseModal from "../modal/BaseModal.svelte";
	import {modalStore, openModal, closeModal} from "../../store/modalStore.js"
	import CharectersheetsList from "../lists/charectersheetsList.svelte";
	import SkillsList from "../lists/skillsList.svelte";
  import ApptitudesList from "../lists/ApptitudesList.svelte";

	async function loadcharectersheets() {
		fetchModal("/charectersheet", "charectersheet");
	}

    function displayPlayers() {
        fetchModal("/users", "players");
    }

    function displayskills() {
        fetchModal("/api/skills", "skills");
    }

    function displayApptitudes() {
        fetchModal("/api/aptitudes", "aptitudes");
    }

    $: stack = $modalStore
    $:topModal = stack.length ? stack[stack.length -1] : null; 



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

		<button class="icon-button" on:click={displayskills}>
			<img alt="skills" class="sidebar-button" />
		</button>

    <button class="icon-button" on:click={displayApptitudes}>
			<img alt="Apptitudes" class="sidebar-button" />
		</button>

  </nav>
</aside>

{#if topModal}
<BaseModal show={true} onClose={closeModal}>
	{#if topModal.page === "charectersheet"}
		<CharectersheetsList data={topModal.data} />
	{:else if topModal.page === "players"}
	<CharectersheetsList data={topModal.data} />
	{:else if topModal.page === "skills"}
	<SkillsList data={topModal.data} />
  {:else if topModal.page === "aptitudes"}
	<ApptitudesList data={topModal.data} />
	{/if} 
</BaseModal>
{/if}

<style>
	.sidebar {
  position: fixed;     
  top: 0;
  left: 0;
  height: 100vh;       
  width: 220px;        
  background-color: #1e1e2f;
  color: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 2px 0 5px rgba(0,0,0,0.2);
  z-index: 100;
}

.sidebar .title {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: center;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
}

.icon-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.icon-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.icon-button img {
  width: 24px;
  height: 24px;
}

</style>
