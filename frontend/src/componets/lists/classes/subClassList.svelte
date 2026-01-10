<script>
    import { onMount } from 'svelte';
    import { fetchGet } from '../../../../util/fetchUtil';
    import { deleteEntity } from '../../../../util/ListUtil';
    import ArmorRow from '../../rows/armorRow.svelte';
    import ListUtil from '../../wrappers/EditableList.svelte';
    import ClassRow from '../../rows/ClassRow.svelte';
    
    export let classId
    let classes = [];
    let endpoint = `/api/class/:${classId}/subclasses`

    onMount(async () => {
        const response = await fetchGet(endpoint);
        console.log(response)
        if (response.status === 200) {
            classes = response.data;
        }
    });

    function createClass() {
        const newClass = {
            id: null,  
            name: "",  
            description: "",
            parent: {},
            isNew: true
        };
        classes = [...classes, newClass];
    }

</script>

<ListUtil
    bind:list={classes}
    endpoint= {endpoint}
    createRow={createClass}
    let:item
    let:onSave
    let:onDelete
>
    <ClassRow
        clss={item}
        onSave={onSave}
        onDelete={onDelete}
        endpoint={endpoint}
    />
</ListUtil>

