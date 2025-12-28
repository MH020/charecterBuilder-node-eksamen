<script>
    import AdminSidebar from "../nav/AdminSidebar.svelte";
    import AdminNav from "../nav/AdminNav.svelte";
</script>

<div class="admin-layout">
    <div class="sidebar">
    <AdminSidebar />
</div>

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

.sidebar {
    width: 250px;
    flex-shrink: 0;
}

.admin-main main {
    padding: 1rem;
    flex: 1;
}
</style>
