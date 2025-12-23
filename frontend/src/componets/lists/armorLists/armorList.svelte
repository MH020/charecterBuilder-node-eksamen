<script>
    import { onMount } from 'svelte';
    import { fetchGet } from '../../../../util/fetchUtil';
    import { deleteEntity } from '../../../../util/ListUtil';
    import ArmorRow from '../../rows/armorRow.svelte';
    import ListUtil from '../../util/ListUtil.svelte';

    let armors = [];
    let sortType = "asc";
    let endpoint = "/api/armors"

    onMount(async () => {
        const response = await fetchGet(endpoint);
        if (response.status === 200) {
            armors = response.data;
        }
    });

    function toggleSort() {
        sortType = sortType === "asc" ? "desc" : "asc";
    }

    $: sortedArmors = [...armors].sort((a, b) => {
        if (!a.name || !b.name) return 0;
        return sortType === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
    });

    function createArmor() {
        const newArmor = {
            id: null,  
            name: "",  
            description: "",
            head_ap: 0,
            body_ap: 0,
            right_arm_ap: 0, 
            left_arm_ap: 0, 
            right_leg_ap: 0, 
            left_leg_ap: 0, 
            wt: 0,  
            availability: {},
            isNew: true

        };
        armors = [...armors, newArmor];
    }

</script>

<ListUtil
    bind:list={armors}
    endpoint= {endpoint}
    createRow={createArmor}
    let:item
    let:onSave
    let:onDelete
>
    <ArmorRow
        armor={item}
        onSave={onSave}
        onDelete={onDelete}
        endpoint={endpoint}
    />
</ListUtil>

