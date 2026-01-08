<script>
    import { selectMultibleFromModal } from "../../../util/ListUtil";
    import ApptitudesList from "../lists/ApptitudesList.svelte";
  import DescriptionUtil from "../UI/DescriptionUtil.svelte";

  export let classTalent;
  export let onSave;
  export let onDelete;
    console.log(classTalent)
  let isEditing = classTalent.isNew ?? false;
  let editableTalent = structuredClone(classTalent);

  function startEdit() {
    editableTalent = structuredClone(classTalent);
    isEditing = true;
  }

  function cancel() {
    if (classTalent.isNew) {
      onDelete(classTalent.id, null, true); 
    } else {
      editableTalent = structuredClone(classTalent);
      isEditing = false;
    }
  }

  async function save() {
    await onSave(editableTalent);
    isEditing = false;
  }
</script>

<div class="card">
  {#if isEditing}
    <div class="stat-cell">
      <div class="label">Name</div>
      <input type="text" bind:value={editableTalent.talent.name} />
    </div>

    <div class="stat-cell">
      <div class="label">Description</div>
      <textarea bind:value={editableTalent.talent.description}></textarea>
    </div>

      <div class="stat-cell">
        <div class="label">Type</div>
        <input type="text" bind:value={editableTalent.talent.type} />
      </div>

    {#if editableTalent.talent.prerequisite_talent !== undefined}
      <div class="stat-cell">
        <div class="label">Prerequisite Talent</div>
        <DescriptionUtil item={editableTalent.talent.prerequisite_talent} />
      </div>
    {/if}


    {#if editableTalent.talent.aptitudes !== undefined}
        <button
            on:click={() =>
                selectMultibleFromModal(ApptitudesList, (selected) => {
                    const list = editableTalent.talent.aptitudes || [];
                    const newApptitude = {
                        aptitude_id: selected.id,
                        aptitude_name: selected.name,
                    };

                    const exists = list.some(
                        (aptitude) => aptitude.aptitude_id === newApptitude.aptitude_id,
                    );

                    editableTalent = {
                        ...editableTalent,
                        aptitudes: exists
                            ? list.filter(
                                  (aptitude) => aptitude.aptitude_id !== newApptitude.aptitude_id
                              )
                            : [...list, newApptitude],
                    };
                    console.log(editableTalent);
                })}
        >
            select apptitudes
        </button>

        <div class="cell-box">
            <div class="label">aptitudes</div>
            <div class="tags">
                {#each editableTalent.aptitudes as aptitude, index}
                    <div>{aptitude.aptitude_name || "----"}</div>
                {/each}
            </div>
        </div>
    {/if}

    <div class="buttons">
      <button on:click={save}>Save</button>
      <button on:click={cancel}>Cancel</button>
    </div>
  {:else}
    <div class="name">{classTalent.talent.name}</div>

    <div class="stat-cell">
      <div class="label">Talent description</div>
      <div class="value">{classTalent.talent.description}</div>
    </div>

    {#if classTalent.talent.type}
      <div class="stat-cell">
        <div class="label">Type</div>
        <div class="value">{classTalent.talent.type}</div>
      </div>
    {/if}

    {#if classTalent.talent.prerequisite_talent}
      <div class="stat-cell">
        <div class="label">Prerequisite Talent</div>
        <DescriptionUtil item={classTalent.talent.prerequisite_talent} />
      </div>
    {/if}

    {#if classTalent.talent.required_race}
      <div class="stat-cell">
        <div class="label">Required Race</div>
        <div class="value">{classTalent.talent.required_race.name}</div>
      </div>
    {/if}

    {#if classTalent.talent.aptitudes?.length}
      <div class="stat-cell">
        <div class="label">Aptitudes</div>
        <div class="value">
          {#each classTalent.talent.aptitudes as aptitude, i}
            {aptitude.name}{i < classTalent.aptitudes.length - 1 ? ", " : ""}
          {/each}
        </div>
      </div>
    {/if}

    <div class="buttons">
      <button on:click={startEdit}>Edit</button>
      <button on:click={() => onDelete(classTalent.id, classTalent.talent.id)}>Delete</button>
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
