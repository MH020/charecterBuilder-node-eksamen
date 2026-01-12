<script>
  import { onMount } from 'svelte';
  import { user, refresh } from '../store/userStore';


  onMount(async () => {
    refresh()
  });

</script>


  <div class="profile">
    <h1>Profile</h1>
    <p><strong>Username:</strong> {$user.username}</p>
    <p><strong>Email:</strong> {$user.email}</p>
    <p><strong>Role:</strong> {$user.role}</p>
  </div>
