<script>
  import { Router } from "svelte-routing";
  import { onMount } from 'svelte';
  import { fetchGet } from '../util/fetchUtil.js';

  import 'toastr/build/toastr.min.css';
  import Adminlayout from "./componets/layouts/adminlayout.svelte";
  import NotLoggedinLayout from "./componets/layouts/notLoggedinLayout.svelte";
  import UserLayout from "./componets/layouts/userLayout.svelte";
    import BaseModal from "./componets/modal/BaseModal.svelte";

  let user = null;
  let loading = true

  onMount(async () => {
    const response = await fetchGet('/api/users/id')

    if (response.status === 200) {
      user = response.data; 
      console.log("user", user)
    } else {
      user = null; 
    }

    loading = false;
    console.log("user", user)
  });
</script>

<BaseModal></BaseModal>

<Router>
  {#if !loading}
    {#if user?.role === "admin"}
      <Adminlayout />

    {:else if user?.role === "user"}
      <UserLayout />

    {:else}
      <NotLoggedinLayout />
    {/if}
  {/if}
</Router>

