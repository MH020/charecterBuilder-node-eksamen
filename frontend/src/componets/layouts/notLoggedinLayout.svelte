<script>
    import { Route, Router } from "svelte-routing";
    import NotLoggedInNav from "../nav/NotLoggedInNav.svelte";
    import Frontpage from "../../pages/frontpage.svelte";
    import Login from "../../pages/login.svelte";
</script>



<div class="user-layout">
    <div class="user-main">
        <NotLoggedInNav />
        <main>
            <Router>
                <Route path="/"><Frontpage /></Route>
                <Route path="/login"><Login /></Route>
            </Router>
        </main>
    </div>
</div>

<style>
.user-layout {
    display: flex;
    height: 100vh;
}

.user-main {
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