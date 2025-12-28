<script>
  import { Router, Route } from "svelte-routing";
  import { onMount } from "svelte";
  import { fetchGet } from "../util/fetchUtil.js";

  import Frontpage from "./pages/frontpage.svelte";
  import Login from "./pages/login.svelte";
  import Profile from "./pages/profile.svelte";
  import AdminPage from "./pages/adminPage.svelte";
  import NotLoggedinLayout from "./componets/layouts/notLoggedinLayout.svelte";
  import UserLayout from "./componets/layouts/userLayout.svelte";
  import BaseModal from "./componets/modal/BaseModal.svelte";
  import Adminlayout from "./componets/layouts/adminlayout.svelte";
  import ClassPage from "./pages/classPage.svelte";

  let user = null;
  let loading = true;

  onMount(async () => {
    const response = await fetchGet("/api/users/id");
    user = response.status === 200 ? response.data : null;
    loading = false;
  });
</script>

<BaseModal />

{#if !loading}
  <Router>
    {#if !user}
      <Route path="/">
        <NotLoggedinLayout>
          <Frontpage />
        </NotLoggedinLayout>
      </Route>

      <Route path="/login">
        <NotLoggedinLayout>
          <Login />
        </NotLoggedinLayout>
      </Route>

            <Route path="/admin/*">
        <Adminlayout>
          <AdminPage />
        </Adminlayout>
      </Route>

            <Route path="/class/*">
        <Adminlayout>
          <ClassPage />
        </Adminlayout>
      </Route>
    {/if}

    {#if user?.role === "USER"}
      <Route path="/">
        <UserLayout>
          <Frontpage />
        </UserLayout>
      </Route>

      <Route path="/profile">
        <UserLayout>
          <Profile />
        </UserLayout>
      </Route>
    {/if}

    {#if user?.role === "ADMIN" || user?.role === "OWNER"}
      <Route path="/admin/*">
        <Adminlayout>
          <AdminPage />
        </Adminlayout>
      </Route>

      <Route path="/">
        <Adminlayout>
          <Frontpage />
        </Adminlayout>
      </Route>

      <Route path="/profile">
        <Adminlayout>
          <Profile />
        </Adminlayout>
      </Route>
      <Route path="/class/*">
        <Adminlayout>
          <ClassPage />
        </Adminlayout>
      </Route>
    {/if}
  </Router>
{/if}
