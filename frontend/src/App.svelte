<script>
  import { Router, Route } from "svelte-routing";
  import { onMount } from "svelte";
  import Frontpage from "./pages/frontpage.svelte";
  import Login from "./pages/login.svelte";
  import Profile from "./pages/profile.svelte";
  import AdminPage from "./pages/adminPage.svelte";
  import NotLoggedinLayout from "./componets/layouts/notLoggedinLayout.svelte";
  import UserLayout from "./componets/layouts/userLayout.svelte";
  import BaseModal from "./componets/modal/BaseModal.svelte";
  import Adminlayout from "./componets/layouts/adminlayout.svelte";
  import ClassPage from "./pages/classPage.svelte";
    import CreateSheetPage from "./pages/createSheetPage.svelte";
    import CharectersheetsList from "./componets/lists/charectersheetsList.svelte";
    import CharectersheetPage from "./pages/charectersheetPage.svelte";
    import { softRefresh, user } from "./store/userStore.js";


let loading = true;

onMount(async () => {
  try {
    await softRefresh();
    console.log($user)
  } catch (err) {
    console.error(err);
  } finally {
    loading = false;
  }
});
</script>

<BaseModal />

{#if !loading}
  <Router>
    {#if $user.id === null}
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
    {/if}
    {#if $user?.role === "USER"}
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

      <Route path="/newSheet">
        <UserLayout>
          <CreateSheetPage />
        </UserLayout>
      </Route>

      <Route path="/class/*">
        <UserLayout>
          <ClassPage />
        </UserLayout>
      </Route>

      <Route path="/subclass/*">
        <UserLayout>
          <ClassPage />
        </UserLayout>
      </Route>

      <Route path="/charactersheets">
        <UserLayout>
          <CharectersheetsList />
        </UserLayout>
      </Route>

      <Route path="/charactersheet/*">
        <UserLayout>
          <CharectersheetPage />
        </UserLayout>
      </Route>
    {/if}
    {#if $user?.role === "ADMIN" || $user?.role === "OWNER"}

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

      <Route path="/admin/*">
        <Adminlayout>
          <AdminPage />
        </Adminlayout>
      </Route>

      <Route path="/newSheet">
        <Adminlayout>
          <CreateSheetPage />
        </Adminlayout>
      </Route>

      <Route path="/class/*">
        <Adminlayout>
          <ClassPage />
        </Adminlayout>
      </Route>

      <Route path="/subclass/*">
        <Adminlayout>
          <ClassPage />
        </Adminlayout>
      </Route>

      <Route path="/charactersheets">
        <Adminlayout>
          <CharectersheetsList />
        </Adminlayout>
      </Route>

      <Route path="/charactersheet/*">
        <Adminlayout>
          <CharectersheetPage />
        </Adminlayout>
      </Route>
    {/if}

  </Router>
{/if}

