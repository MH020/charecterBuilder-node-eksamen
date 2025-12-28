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

