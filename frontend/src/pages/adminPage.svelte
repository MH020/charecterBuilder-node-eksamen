<script>
// @ts-nocheck

    import { Router, Route } from "svelte-routing";
    import AdminNav from "../componets/nav/AdminNav.svelte";

    import UsersList from "../componets/lists/usersList.svelte";
    import SkillsList from "../componets/lists/skillsList.svelte";
    import WeaponsList from "../componets/lists/weaponLists/weaponsList.svelte";
    import CharectersheetsList from "../componets/lists/charectersheetsList.svelte";
    import ApptitudesList from "../componets/lists/ApptitudesList.svelte";
    import LineageList from "../componets/lists/characterLists/lineageList.svelte";
    import RaceList from "../componets/lists/characterLists/RaceList.svelte";
    import StatlinesList from "../componets/lists/characterLists/StatlinesList.svelte";
    import SizeList from "../componets/lists/characterLists/sizeList.svelte";
    import WeaponTraitList from "../componets/lists/weaponLists/weaponTraitList.svelte";
    import ClassList from "../componets/lists/classes/ClassList.svelte";
    import ArmorList from "../componets/lists/armorLists/armorList.svelte";
    import TraitsList from "../componets/lists/characterLists/TraitsList.svelte";
    import TalentList from "../componets/lists/characterLists/TalentList.svelte";
    import CraftmanshipList from "../componets/lists/ItemsList/craftmanshipList.svelte";
    import AvailabilityList from "../componets/lists/ItemsList/availabilityList.svelte";
    import CategoryList from "../componets/lists/ItemsList/categoryList.svelte";
    import ItemsList from "../componets/lists/ItemsList/itemsList.svelte";
    import WeaponClassList from "../componets/lists/weaponLists/weaponClassList.svelte";
</script>

<div class="admin-layout">
    <AdminNav />

    <Router basepath="/admin">
        <section class="admin-content">


            <Route path="users"><UsersList /></Route>
            <Route path="charactersheets"><CharectersheetsList /></Route>
            <Route path="skills"><SkillsList /></Route>
            <Route path="aptitudes"><ApptitudesList /></Route>
            <Route path="lineage"><LineageList /></Route>

            <Route path="races"><RaceList /></Route>
            <Route path="statlines"><StatlinesList /></Route>
            <Route path="sizes"><SizeList /></Route>

            <Route path="weapons"><WeaponsList /></Route>
            <Route path="weapons/traits"><WeaponTraitList /></Route>
            <Route path="weapons/class"><WeaponClassList /></Route>

            <Route path="items"><ItemsList /></Route>
            <Route path="category"><CategoryList /></Route>
            <Route path="availability"><AvailabilityList /></Route>
            <Route path="craftsmanship"><CraftmanshipList /></Route>


            <Route path="talents"><TalentList /></Route>
            <Route path="traits"><TraitsList /></Route>

            <Route path="armor"><ArmorList /></Route>

            <Route path="classes"><ClassList /></Route>
        </section>
    </Router>
</div>

