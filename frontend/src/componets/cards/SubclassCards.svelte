<script>
    import { navigate } from "svelte-routing";
    import { user } from "../../store/userStore";


  export let subClass;
  export let onSave;
  export let onDelete;

  $: canEdit = $user.role === 'ADMIN' || $user.role === 'OWNER'
  let isEditing = subClass.isNew ?? false;
  let editableSubclass = structuredClone(subClass);

  function startEdit() {
    editableSubclass = structuredClone(subClass);
    isEditing = true;
  }

  function cancel() {
    if (subClass.isNew) {
      onDelete(subClass.id, null, true); 
    } else {
      editableSubclass = structuredClone(subClass);
      isEditing = false;
    }
  }

  async function save() {
    await onSave(editableSubclass);
    isEditing = false;
  }
</script>

<div class="card">
  {#if isEditing}
    <div class="stat-cell">
      <div class="label">Name</div>
      <input type="text" bind:value={editableSubclass.name} />
    </div>

    <div class="stat-cell">
      <div class="label">Description</div>
      <textarea bind:value={editableSubclass.description}></textarea>
    </div>

    <div class="buttons">
      <button on:click={save}>Save</button>
      <button on:click={cancel}>Cancel</button>
    </div>
  {:else}

    <div class="name">{subClass.name}</div>

    <div class="stat-cell">
      <div class="label">Subclass description</div>
      <div class="value">{subClass.description}</div>
    </div>

    <div class="buttons">
      {#if canEdit}
        <button on:click={startEdit}>Edit</button>
        <button on:click={() => onDelete(subClass.id, subClass.id)}>Delete</button>
      {/if}
      <button on:click={() => navigate(`/subclass/?id=${subClass.id}`)}>subclass page</button>
    </div>
  {/if}
</div>

<style>
  .card {
    background-color: #1b1b1b;
    border: 1px solid #333;
    border-radius: 8px;
    padding: 1.5rem;
    width: 100%;
    max-width: 500px;
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  }

  .card .name {
    font-family: "Courier New", monospace;
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--color-accent);
    border-bottom: 2px solid var(--color-accent-dark);
    padding-bottom: 0.25rem;
    margin-bottom: 0.75rem;
    text-transform: uppercase;
  }

  .stat-cell {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .stat-cell .label {
    min-width: 120px;
    font-weight: bold;
    color: var(--color-accent);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .stat-cell .value {
    flex: 1 1 auto;
    color: var(--color-text);
    font-family: "Courier New", monospace;
    word-break: break-word;
  }

  .buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  input, textarea {
    flex: 1;
    padding: 0.25rem 0.5rem;
    background-color: #252525;
    color: var(--color-text);
    border: 1px solid #333;
    border-radius: 4px;
    font-family: "Courier New", monospace;
  }
</style>
