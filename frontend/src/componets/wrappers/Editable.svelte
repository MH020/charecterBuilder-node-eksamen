<script>
  import { fetchPost, fetchUpdate } from "../../../util/fetchUtil";

  export let item;
  export let endpoint;
  export let onSave;
  export let onDelete;
  export let editable

  let isEditing = item.isNew;
  
  function startEditing() {
    isEditing = true;
    editable;
  }

  async function save() {
    let updated;

    if (item.isNew) {
      const response = await fetchPost(endpoint, editable);
      if (response.status === 201) {
        updated = response.created;
      }
    } else {
      await fetchUpdate(endpoint, editable);
      updated = editable;
    }

    onSave(updated);
    isEditing = false;
  }

  function cancel() {
    isEditing = false;

    if (item.isNew) {
      onDelete(item.id, true);
    } else {
      editable;
    }
  }

  function remove() {
    onDelete(item.id);
  }
</script>

<slot
  {item}
  {isEditing}
  {startEditing}
  {save}
  {cancel}
  {remove}
/>
