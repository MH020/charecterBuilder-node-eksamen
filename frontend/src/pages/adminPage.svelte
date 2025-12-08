<script>
    import AdminSidebar from "../componets/nav/AdminSidebar.svelte";
</script>

<div class="admin-layout">
  <AdminSidebar />

  <main>

    <h2>Admin page</h2>

  </main>
</div>

<style>
  .admin-layout {
    display: flex;
    height: 100%;
  }

  main {
    flex: 1;
    padding: 1rem;
  }
</style>
