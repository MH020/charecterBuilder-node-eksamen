<script>
  import { Link } from "svelte-routing";

</script>

<div class="sidebar">
  <div class="title">Navigation</div>
  <nav>
    <Link to='/admin_page'>Home</Link>
    <Link to='/users'>Users</Link>
    <Link to='/skills'>Skills</Link>
    <Link to='/charactersheets'>Charactersheets</Link>
    <Link to='/aptitudes'>Aptitudes</Link>
  </nav>
</div>
<style>

	.sidebar {
  position: fixed;     
  top: 0;
  left: 0;
  height: 100vh;       
  width: 220px;        
  background-color: #1e1e2f;
  color: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 2px 0 5px rgba(0,0,0,0.2);
  z-index: 100;
}

.sidebar .title {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: center;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
}

.icon-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.icon-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.icon-button img {
  width: 24px;
  height: 24px;
}

</style>
