<script>
    import NotLoggedInNav from "../nav/NotLoggedInNav.svelte";
</script>



<div class="user-layout">
    <div class="user-main">
        <NotLoggedInNav />
        <main>
            <slot /> 
        </main>
    </div>
</div>

<style>
.user-layout {
    display: flex;
    min-height: 100vh; 
}

.user-main {
    flex: 1;
    display: flex;
    flex-direction: column;
}

main {
    flex: 1;
    padding: 1rem;
}
</style>