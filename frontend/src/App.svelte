<script>
  import { Router, Link, Route } from "svelte-routing";
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';
  import { fetchGet } from '../util/fetchUtil.js';
  import 'toastr/build/toastr.min.css';
  import Login from "./pages/login.svelte";
  import Profile from "./pages/profile.svelte";
  import AdminNav from "./componets/nav/AdminNav.svelte";
  import NotLoggedInNav from "./componets/nav/NotLoggedInNav.svelte";
  import UserNav from "./componets/nav/UserNav.svelte";
  import Frontpage from "./pages/frontpage.svelte";
  import AdminPage from "./pages/adminPage.svelte";

  let user = null;
  let loading = true

  onMount(async () => {
    const response = await fetchGet('/users/id')

    if (response.status === 200) {
      user = response.data; 
    } else {
      user = null; 
    }

    loading = false;

  });
  
</script>


<Router>

    {#if !loading}
    {#if user?.role === "admin"}
      <AdminNav />
    {:else if user?.role === "user"}
      <UserNav />
    {:else}
      <NotLoggedInNav />
    {/if}
  {/if}
  
  <div>
    <Route path='/'><Frontpage /></Route>

    <Route path='/login'><Login /></Route>

    <Route path='/profile'><Profile /></Route>


    <Route path='/admin_page'><AdminPage /></Route>
  </div>
</Router>
