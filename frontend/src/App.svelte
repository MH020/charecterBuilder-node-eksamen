<script>
  import { Router, Link, Route } from "svelte-routing";
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';
  import { fetchGet } from '../util/fetchUtil.js';

  import 'toastr/build/toastr.min.css';
  import Login from "./pages/login.svelte";
  import Profile from "./pages/profile.svelte";
  import Adminlayout from "./componets/layouts/adminlayout.svelte";
  import NotLoggedinLayout from "./componets/layouts/notLoggedinLayout.svelte";
  import UserLayout from "./componets/layouts/userLayout.svelte";
  import Frontpage from "./pages/frontpage.svelte";
  import AdminPage from "./pages/adminPage.svelte";
  import SkillsList from "./componets/lists/skillsList.svelte";
  import UsersList from "./componets/lists/usersList.svelte";
  import CharectersheetsList from "./componets/lists/charectersheetsList.svelte";
  import ApptitudesList from "./componets/lists/ApptitudesList.svelte";
  import BaseModal from "./componets/modal/BaseModal.svelte";
  import WeaponsList from "./componets/lists/weaponLists/weaponsList.svelte";

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
    {#if user?.role === "ADMIN" || user?.role ==="OWNER" }
      <Adminlayout>
        <!-- General pages -->
        <Route path="/"><Frontpage /></Route>
        <Route path="/profile"><Profile /></Route>

        <!-- Admin pages -->
        <Route path="/admin_page"><AdminPage /></Route>
        <Route path="/users"><UsersList /></Route>
        <Route path="/charactersheets"><CharectersheetsList /></Route>
        <Route path="/skills"><SkillsList /></Route>
        <Route path="/aptitudes"><ApptitudesList /></Route>
      </Adminlayout>
      
    {:else if user?.role === "USER"}
      <UserLayout>
        <Route path="/"><Frontpage /></Route>
        <Route path="/profile"><Profile /></Route>
        <Route path="/skills"><SkillsList /></Route>
        <Route path="/aptitudes"><ApptitudesList /></Route>
      </UserLayout>
      
    {:else}
      <NotLoggedinLayout>
        <Route path="/"><Frontpage /></Route>
        <Route path="/login"><Login /></Route>


                <!-- Admin pages -->
        <Route path="/admin_page"><AdminPage /></Route>
        <Route path="/users"><UsersList /></Route>
        <Route path="/charactersheets"><CharectersheetsList /></Route>
        <Route path="/skills"><SkillsList /></Route>
        <Route path="/aptitudes"><ApptitudesList /></Route>
        <Route path="/weapons"><WeaponsList /></Route>
      </NotLoggedinLayout>
    {/if}
  {/if}
</Router>

