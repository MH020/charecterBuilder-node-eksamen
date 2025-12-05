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

    onMount(async () => {
    const response = await fetchGet('/users/id')
    if (response.status !== 200) {

  });
  
</script>


<Router>
  
  <div>
    <Route path='/'>
      <h1>
        THE WALL OF GUNS 
      </h1>
      <h2><span>Coming Soon™</span></h2>
    </Route>
    <Route path='/login'><Login /></Route>
    <Route path='/profile'><Profile /></Route>
  </div>
</Router>

