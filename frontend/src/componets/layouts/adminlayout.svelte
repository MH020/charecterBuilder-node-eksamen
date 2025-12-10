<script>
  import { Router, Route } from "svelte-routing";
  import AdminSidebar from "../nav/AdminSidebar.svelte";
  import AdminNav from "../nav/AdminNav.svelte";

  import Frontpage from "../../pages/frontpage.svelte";
  import Profile from "../../pages/profile.svelte";
  import AdminPage from "../../pages/adminPage.svelte";
  import SkillsList from "../lists/skillsList.svelte";
  import UsersList from "../lists/usersList.svelte";
  import CharectersheetsList from "../lists/charectersheetsList.svelte";
  import ApptitudesList from "../lists/ApptitudesList.svelte";
</script>

<div class="admin-layout">
    <AdminSidebar />

    <div class="admin-main">
        <AdminNav />
        <main>
            <Router>
                <Route path="/" component={Frontpage} />
                <Route path="/profile" component={Profile} />
                <Route path="/admin_page" component={AdminPage} />
                <Route path="/users" component={UsersList} />
                <Route path="/charactersheets" component={CharectersheetsList} />
                <Route path="/skills" component={SkillsList} />
                <Route path="/aptitudes" component={ApptitudesList} />
            </Router>
        </main>
    </div>
</div>

<style>
.admin-layout {
    display: flex;
    height: 100vh;
}

.admin-main {
    flex: 1;
    display: flex;
    flex-direction: column;
}

main {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
}
</style>
