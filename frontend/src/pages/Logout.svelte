<script>
    import { onMount, tick } from "svelte";
    import { fetchPost } from "../../util/fetchUtil";
    import { navigate } from "svelte-routing";
    import { user } from "../store/userStore";

    onMount(async () => {

    await fetchPost("/api/logout")
    user.set({ id: null, username: '', email: '', role: '' });
    await tick();
    navigate("/")
    });
</script>