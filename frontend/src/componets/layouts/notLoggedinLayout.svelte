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


