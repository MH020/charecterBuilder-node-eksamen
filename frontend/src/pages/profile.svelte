<script>
  import { onMount } from 'svelte';
    import { refresh, user } from '../store/userStore';
 


  onMount(() => {
    refresh()
  });

</script>


  <div class="profile">
    <h1>Profile</h1>
    <p><strong>Username:</strong> {$user.username}</p>
    <p><strong>Email:</strong> {$user.email}</p>
    <p><strong>Role:</strong> {$user.role}</p>
  </div>
