/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Clear join table
  await knex("weapon_weapon_class").del();


  const [melee] = await knex("weapon_class").where({ name: "Melee" });
  const [ranged] = await knex("weapon_class").where({ name: "Ranged" });
  const [explosive] = await knex("weapon_class").where({ name: "Explosive" });
  const [energy] = await knex("weapon_class").where({ name: "Energy" });


  const [longsword] = await knex("weapon").where({ name: "Longsword" });
  const [handgun] = await knex("weapon").where({ name: "9mm Handgun" });
  const [assaultRifle] = await knex("weapon").where({ name: "Assault Rifle" });
  const [battleAxe] = await knex("weapon").where({ name: "Battle Axe" });
  const [fragGrenade] = await knex("weapon").where({ name: "Fragmentation Grenade" });


  await knex("weapon_weapon_class").insert([

    { weapon_id: longsword.id, weapon_class_id: melee.id },
    { weapon_id: battleAxe.id, weapon_class_id: melee.id },


    { weapon_id: handgun.id, weapon_class_id: ranged.id },
    { weapon_id: assaultRifle.id, weapon_class_id: ranged.id },


    { weapon_id: fragGrenade.id, weapon_class_id: explosive.id }
  ]);
}
