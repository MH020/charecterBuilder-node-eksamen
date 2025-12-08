<script>
    import AdminSidebar from "../nav/AdminSidebar.svelte";
    import AdminNav from "../nav/AdminNav.svelte";
</script>

<div class="admin-layout">
    <AdminSidebar />

    <div class="admin-main">
        <AdminNav />
        <main>
            <slot /> 
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
