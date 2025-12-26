/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {

  await knex('class_weapon_class').del();


  const guardsman = await knex('class').where({ name: 'Guardsman' }).first();
  const tacticalMarine = await knex('class').where({ name: 'Tactical Marine' }).first();
  const assaultMarine = await knex('class').where({ name: 'Assault Marine' }).first();
  const techPriest = await knex('class').where({ name: 'Tech-Priest Enginseer' }).first();
  const inquisitor = await knex('class').where({ name: 'Interrogator' }).first();


  const pistol = await knex('weapon_class').where({ name: 'Pistol' }).first();
  const carbine = await knex('weapon_class').where({ name: 'Carbine' }).first();
  const longRifle = await knex('weapon_class').where({ name: 'Long Rifle:' }).first();
  const heavy = await knex('weapon_class').where({ name: 'Heavy' }).first();
  const superHeavy = await knex('weapon_class').where({ name: 'Super Heavy' }).first();


  await knex('class_weapon_class').insert([
    // Guardsman
    { class_id: guardsman.id, weapon_class_id: pistol.id },
    { class_id: guardsman.id, weapon_class_id: carbine.id },
    { class_id: guardsman.id, weapon_class_id: longRifle.id },
    { class_id: guardsman.id, weapon_class_id: heavy.id },

    // Tactical Marine
    { class_id: tacticalMarine.id, weapon_class_id: pistol.id },
    { class_id: tacticalMarine.id, weapon_class_id: carbine.id },
    { class_id: tacticalMarine.id, weapon_class_id: longRifle.id },
    { class_id: tacticalMarine.id, weapon_class_id: heavy.id },
    { class_id: tacticalMarine.id, weapon_class_id: superHeavy.id },

    // Assault Marine
    { class_id: assaultMarine.id, weapon_class_id: pistol.id },
    { class_id: assaultMarine.id, weapon_class_id: carbine.id },
    { class_id: assaultMarine.id, weapon_class_id: heavy.id },

    // Tech-Priest Enginseer
    { class_id: techPriest.id, weapon_class_id: pistol.id },
    { class_id: techPriest.id, weapon_class_id: carbine.id },
    { class_id: techPriest.id, weapon_class_id: heavy.id },

    // Interrogator
    { class_id: inquisitor.id, weapon_class_id: pistol.id },
    { class_id: inquisitor.id, weapon_class_id: carbine.id },
    { class_id: inquisitor.id, weapon_class_id: longRifle.id }
  ]);
}
