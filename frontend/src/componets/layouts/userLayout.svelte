<script>
    import UserNav from "../nav/UserNav.svelte";
</script>



<div class="user-layout">
    <div class="user-main">
        <UserNav />
        <main>
            <slot /> 
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