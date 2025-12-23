<script>
  import { Router, Link, Route } from "svelte-routing";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { fetchGet } from "../util/fetchUtil.js";

  import "toastr/build/toastr.min.css";
  import Login from "./pages/login.svelte";
  import Profile from "./pages/profile.svelte";
  import Adminlayout from "./componets/layouts/adminlayout.svelte";
  import NotLoggedinLayout from "./componets/layouts/notLoggedinLayout.svelte";
  import UserLayout from "./componets/layouts/userLayout.svelte";
  import Frontpage from "./pages/frontpage.svelte";
  import AdminPage from "./pages/adminPage.svelte";
  import SkillsList from "./componets/lists/skillsList.svelte";
  import UsersList from "./componets/lists/usersList.svelte";
  import CharectersheetsList from "./componets/lists/charectersheetsList.svelte";
  import ApptitudesList from "./componets/lists/ApptitudesList.svelte";
  import BaseModal from "./componets/modal/BaseModal.svelte";
  import WeaponsList from "./componets/lists/weaponLists/weaponsList.svelte";
  import AvailabilityList from "./componets/lists/ItemsList/availabilityList.svelte";
  import CategoryList from "./componets/lists/ItemsList/categoryList.svelte";
  import WeaponTraitList from "./componets/lists/weaponLists/weaponTraitList.svelte";
  import ItemsList from "./componets/lists/ItemsList/itemsList.svelte";
  import ArmorList from "./componets/lists/armorLists/armorList.svelte";
  import CraftmanshipList from "./componets/lists/ItemsList/craftmanshipList.svelte";
  import LineageList from "./componets/lists/characterLists/lineageList.svelte";
    import StatlinesList from "./componets/lists/characterLists/StatlinesList.svelte";
    import RaceList from "./componets/lists/characterLists/RaceList.svelte";
    import SizeList from "./componets/lists/characterLists/sizeList.svelte";
    import TalentList from "./componets/lists/characterLists/TalentList.svelte";

  let user = null;
  let loading = true;

  onMount(async () => {
    const response = await fetchGet("/api/users/id");

    if (response.status === 200) {
      user = response.data;
      console.log("user", user);
    } else {
      user = null;
    }

    loading = false;
    console.log("user", user);
  });
</script>

<BaseModal></BaseModal>

<Router>
  {#if !loading}
    {#if user?.role === "ADMIN" || user?.role === "OWNER"}
      <Adminlayout>
        <!-- General pages -->
        <Route path="/"><Frontpage /></Route>
        <Route path="/profile"><Profile /></Route>

        <!-- Admin pages -->
        <Route path="/admin_page"><AdminPage /></Route>
        <Route path="/users"><UsersList /></Route>
        <Route path="/charactersheets"><CharectersheetsList /></Route>
        <Route path="/skills"><SkillsList /></Route>
        <Route path="/aptitudes"><ApptitudesList /></Route>
      </Adminlayout>
    {:else if user?.role === "USER"}
      <UserLayout>
        <Route path="/"><Frontpage /></Route>
        <Route path="/profile"><Profile /></Route>
        <Route path="/skills"><SkillsList /></Route>
        <Route path="/aptitudes"><ApptitudesList /></Route>
      </UserLayout>
    {:else}
      <NotLoggedinLayout>
        <Route path="/"><Frontpage /></Route>
        <Route path="/login"><Login /></Route>

        <!-- Admin pages -->
        <Route path="/admin_page"><AdminPage /></Route>

        <Route path="/users"><UsersList /></Route>
        <Route path="/charactersheets"><CharectersheetsList /></Route>
        <Route path="/skills"><SkillsList /></Route>
        <Route path="/aptitudes"><ApptitudesList /></Route>
        <Route path="/lineage"><LineageList /></Route>

        <!-- races -->
        <Route path="/races"><RaceList /></Route>
        <Route path="/statlines"><StatlinesList /></Route>
        <Route path="/sizes"><SizeList /></Route>


        <Route path="/weapons"><WeaponsList /></Route>
        <Route path="/weapons/traits"><WeaponTraitList /></Route> <!-- fix so crud -->
        <Route path="/weapons/class"><WeaponTraitList /></Route> <!-- fix so crud -->

        <Route path="/items"><ItemsList /></Route>
        <Route path="/category"><CategoryList /></Route>
        <Route path="/availability"><AvailabilityList /></Route>
        <Route path="/craftsmanship"><CraftmanshipList /></Route>

        <Route path="/talents"><TalentList /></Route>


        <Route path="/armor"><ArmorList /></Route>
      </NotLoggedinLayout>
    {/if}
  {/if}
</Router>
