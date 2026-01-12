<script>
  import { Link } from "svelte-routing";
</script>

<div class="sidebar">
  <div class="title">Navigation</div>
  <nav>
    <!-- Core admin pages -->
    <Link to='/admin'>Home</Link>
    <Link to='/admin/users'>Users</Link>
    <Link to='/admin/charactersheets'>Charactersheets</Link>
    <Link to='/admin/skills'>Skills</Link>
    <Link to='/admin/aptitudes'>Aptitudes</Link>
    
    <!-- Additional lists -->
    <Link to='/admin/lineage'>Lineage</Link>
    <Link to='/admin/races'>Races</Link>
    <Link to='/admin/statlines'>Statlines</Link>
    <Link to='/admin/sizes'>Sizes</Link>
    
    <!-- Weapons -->
    <Link to='/admin/weapons'>Weapons</Link>
    <Link to='/admin/weapons/traits'>Weapon Traits</Link>
    <Link to='/admin/weapons/class'>Weapon Classes</Link>
    
    <!-- Items -->
    <Link to='/admin/items'>Items</Link>
    <Link to='/admin/category'>Item Categories</Link>
    <Link to='/admin/availability'>Availability</Link>
    <Link to='/admin/craftsmanship'>Craftsmanship</Link>
    
    <!-- Talents & Traits -->
    <Link to='/admin/talents'>Talents</Link>
    <Link to='/admin/traits'>Traits</Link>
    
    <!-- Armor -->
    <Link to='/admin/armor'>Armor</Link>
    
    <!-- Classes -->
    <Link to='/admin/classes'>Classes</Link>
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
    font-weight: bold;
  }

  .sidebar nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-grow: 1;
  }

  .sidebar nav a {
    color: #fff;
    text-decoration: none;
    padding: 0.4rem 0.6rem;
    border-radius: 4px;
    transition: background 0.2s;
  }

  .sidebar nav a:hover {
    background-color: #34344a;
  }
</style>
